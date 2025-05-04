import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {store} from "./redux/store";
import {Provider} from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID || '405463566463-0hgbglc79i6eltd3hch4ftaf1at8ir1a.apps.googleusercontent.com';
ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
            <App/>
        </Provider>
        </GoogleOAuthProvider>
    // </React.StrictMode>,
);
