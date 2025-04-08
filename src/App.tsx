import {useDispatch} from "react-redux";
import "./App.css";
import {AppRoutes} from "./routes/AppRoutes";
import {useEffect} from "react";
import {setCurrentUser} from "@/redux/slices/authSlice.ts";
import {ACCESS_TOKEN_LOCALSTORAGE} from "@/types/constant.ts";
import {useFetchCurrentUserQuery} from "@/api/customerApi/user.ts";
import {ToastContainer} from "react-toastify";

function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
    const {data, error} = useFetchCurrentUserQuery(undefined, {
        skip: !token, // Chỉ gọi query nếu token tồn tại
    });

    useEffect(() => {
        if (data && data.data) {
            dispatch(setCurrentUser(data.data));
        }
        if (error) {
            console.error("Failed to fetch current user:", error);
        }
    }, [data, error, dispatch]);

    return (
        <div>
            <AppRoutes/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
