import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {transformToCamelCase} from "@/lib/utils.ts";
import {District, Province, Ward} from "@/types/address.ts";

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.vnappmob.com/api/v2/province'}),
    endpoints: (builder) => ({
        // Lấy danh sách tỉnh
        getProvinces: builder.query<{ results: Province[] }, void>({
            query: () => ({
                url: '/',
                method: 'GET',
                headers: {Accept: 'application/json'},
            }),
            transformResponse: (response: { results: any[] }) => {
                return {
                    results: response.results.map((item) => transformToCamelCase<Province>(item)),
                };
            },
        }),

        // Lấy danh sách quận/huyện theo province_id
        getDistricts: builder.query<{ results: District[] }, string>({
            query: (provinceId) => ({
                url: `/district/${provinceId}`,
                method: 'GET',
                headers: {Accept: 'application/json'},
            }),
            transformResponse: (response: { results: any[] }) => {
                return {
                    results: response.results.map((item) => transformToCamelCase<District>(item)),
                };
            },
        }),

        // Lấy danh sách phường/xã theo district_id
        getWards: builder.query<{ results: Ward[] }, string>({
            query: (districtId) => ({
                url: `/ward/${districtId}`,
                method: 'GET',
                headers: {Accept: 'application/json'},
            }),
            transformResponse: (response: { results: any[] }) => {
                return {
                    results: response.results.map((item) => {
                        const transformed = transformToCamelCase<Ward>(item);
                        // Đảm bảo ward_id được ánh xạ thành wardId
                        return {
                            ...transformed,
                            wardId: transformed.wardId, // Đã được ánh xạ từ ward_id
                            wardName: transformed.wardName, // Đã được ánh xạ từ ward_name
                        };
                    }),
                };
            },
        }),
    }),
});

// Xuất các hook để sử dụng trong component
export const {useGetProvincesQuery, useGetDistrictsQuery, useGetWardsQuery} = addressApi;