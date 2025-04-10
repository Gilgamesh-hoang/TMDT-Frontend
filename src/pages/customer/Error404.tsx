import {Header} from "@/components/customer/Header.tsx";
import {Footer} from "@/components/customer/Footer.tsx";

const Error404 = () => {
    return (
        <div className="w-full container mx-auto  px-40 flex flex-col space-y-4">
            <Header/>
            <div className="flex flex-col items-center justify-center h-100 bg-gray-100">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="mt-4 text-lg text-gray-700">Page Not Found</p>
                <a href="/" className="mt-6 text-blue-500 hover:underline">
                    Go to Home
                </a>
            </div>
            <Footer/>
        </div>
    )
};

export default Error404;
