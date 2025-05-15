import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {Mutex} from 'async-mutex';
import {ACCESS_TOKEN_LOCALSTORAGE, CLIENT_URL, ROUTES, SERVER_URL} from "@/types/constant.ts";
import {ApiResponse, AuthResponse, JwtResponse} from "@/types/response";
import {User} from "@/types/models";

// Define the interface for items in the queue
// Each item has a resolve function to handle a successful token refresh and a reject function for errors
interface QueueItem {
    resolve: (token: string) => void; // Called when refresh token succeeds, passing the new token
    reject: (error: FetchBaseQueryError | Error) => void; // Called when refresh token fails, passing the error
}

// Create a mutex to manage synchronization
// Ensures only one refresh token process runs at a time
const mutex = new Mutex();

// Variables to track the refresh token state and queue
// isRefreshing indicates if a refresh operation is in progress
// failedQueue stores requests that are waiting for the refresh to complete
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// Process the queue after a refresh token operation
// If there's an error, reject all queued promises; otherwise, resolve them with the new token
const processQueue = (error: FetchBaseQueryError | Error | null, token: string | null = null): void => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error); // Reject the promise if refresh failed
        } else if (token) {
            prom.resolve(token); // Resolve the promise with the new token if refresh succeeded
        }
    });
    failedQueue = []; // Clear the queue after processing
};

// This sets up the base configuration for API requests
export const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
    credentials: "include", // Include credentials (e.g., cookies) in requests
});

// Function to call the refresh token API
const refreshAccessToken = async (
    api: Parameters<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>>[1], // API context
    extraOptions: Parameters<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>>[2] // Extra options for the query
): Promise<string> => {

    // Call the refresh token endpoint
    const refreshResult = await baseQuery(
        {url: '/auth/refresh-token', method: 'POST'},
        api,
        extraOptions
    );

    if (refreshResult.data) {
        // Cast the response to the expected ApiResponse<JwtResponse> structure
        const response = refreshResult.data as ApiResponse<JwtResponse>;
        const accessToken = response.data.token;
        if (!accessToken) {
            throw new Error('No access token received from refresh endpoint');
        }
        return accessToken;
    } else {
        throw refreshResult.error || new Error('Failed to refresh token');
    }
};

// Create a custom baseQuery with refresh token logic
export const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Wait if another refresh operation is in progress
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    // Handle 401 Unauthorized errors
    if (result.error && result.error.status === 401) {
        // Extract the URL from the args (args can be a string or FetchArgs object)
        const url = typeof args === 'string' ? args : args.url;
        if (url === '/auth/login') {
            // If the request is to /auth/login, return the 401 error immediately without refreshing
            return result;
        }

        // If no other refresh operation is in progress, acquire the mutex
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                if (!isRefreshing) {
                    isRefreshing = true; // Mark the refresh operation as started

                    try {
                        const accessToken = await refreshAccessToken(api, extraOptions);
                        localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, accessToken);

                        // Process the queue with the new token
                        processQueue(null, accessToken);
                        // Retry the original request with the new token
                        result = await baseQuery(args, api, extraOptions);
                    } catch (error) {
                        // If refresh fails, process the queue with the error and redirect to login
                        processQueue(error as FetchBaseQueryError | Error);
                        localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE);
                        window.location.href = `${CLIENT_URL}${ROUTES.LOGIN}`;
                        console.error('Error refreshing token:', error);
                    }
                }
            } finally {
                // Always reset the refresh state and release the mutex
                isRefreshing = false;
                release();
            }
        } else {
            // If a refresh operation is already in progress, queue the request
            return new Promise<string>((resolve, reject) => {
                failedQueue.push({resolve, reject});
            })
                .then((token) => {
                    // Update the request arguments with the new token
                    const updatedArgs: FetchArgs = typeof args === 'string' ? {url: args} : {...args};
                    updatedArgs.headers = {
                        ...updatedArgs.headers,
                        Authorization: `Bearer ${token}`,
                    };
                    // Retry the request with the updated headers
                    return baseQuery(updatedArgs, api, extraOptions);
                })
                .catch((err: FetchBaseQueryError | Error) => Promise.reject(err));
        }
    }

    return result; // Return the final result (success or error)
};

export const transformToApiResponse = (
    response: ApiResponse<AuthResponse>
): ApiResponse<User> => {
    if (response.data?.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, response.data.accessToken);
    }
    return {
        status: response.status,
        message: response.message,
        data: response.data.user,
    };
};

export const extractData = <T>(response: ApiResponse<T>): T => response.data;
