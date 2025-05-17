import {useSelector} from "react-redux";
import "./App.css";
import {useFetchCurrentUserQuery} from "@/api/customerApi/user.ts";
import {ToastContainer} from "react-toastify";
import {ACCESS_TOKEN_LOCALSTORAGE} from "@/types/constant.ts";
import {AppRoutes} from "@/routes/AppRoutes.tsx";
import {RootState} from "@/redux/store.ts";

function App() {
    const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
    useFetchCurrentUserQuery(undefined, {
        skip: !token,
    });
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const me = useSelector((state: RootState) => state.auth.me);

    const isUserChecked = !token || (!isLoading && me !== null);

    if (!isUserChecked) {
        return;
    }


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
