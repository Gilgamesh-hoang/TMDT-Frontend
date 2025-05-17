import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {FcGoogle} from "react-icons/fc";
import {useLoginGoogleMutation} from "@/api/auth.ts";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "@/redux/slices/authSlice.ts";
import {hasRole, toastError, toastSuccess} from "@/lib/utils.ts";
import {ADMIN_ROUTES, ROUTES} from "@/types/constant.ts";
import Loader from "@/components/ui/Loader.tsx";
import {FC} from "react";
import {UserRole} from "@/types/models.ts";

interface OAuth2GoogleProps {
    setIsGoogleLogin?: React.Dispatch<React.SetStateAction<boolean>>;
    isDisabled?: boolean;
}

const OAuth2Google: FC<OAuth2GoogleProps> = ({setIsGoogleLogin, isDisabled=false}) => {
    const navigate = useNavigate();
    const [loginGoogle, {isLoading}] = useLoginGoogleMutation();
    const dispatch = useDispatch();


    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await loginGoogle({token: tokenResponse.access_token}).unwrap();
                // Thành công
                if (response.status === 200) {
                    // Cập nhật user vào Redux
                    dispatch(setCurrentUser(response.data));
                    toastSuccess("Đăng nhập thành công");

                    if (hasRole([UserRole.ROLE_ADMIN, UserRole.ROLE_EMPLOYEE], response.data.roles)) {
                        navigate(ADMIN_ROUTES.DASHBOARD);
                    }else {
                        navigate(ROUTES.HOME);
                    }
                }
            } catch (error) {
                toastError("Đăng nhập thất bại", 2000)
                console.error(error);
            } finally {
                if (setIsGoogleLogin) {
                    setIsGoogleLogin(false);
                }
            }
        },
        onError: (error) => {
            toastError("Đăng nhập thất bại", 2000)
            console.error(error);
            if (setIsGoogleLogin) {
                setIsGoogleLogin(false);
            }
        },

    });
    const handleGoogleLogin = () => {
        if (setIsGoogleLogin) {
            setIsGoogleLogin(true); // Set true ngay khi nhấn nút
        }
        login();
    };

    return (

        <Button type="button"
                className="bg-white text-dark-2 hover:opacity-80 w-full border-2 border-dark-2"
                onClick={handleGoogleLogin}
                disabled={isLoading || isDisabled}

        >
            <>
                {isLoading ? (
                    <Loader color={'#291D4C'}/>
                ) : (
                    <>
                        <FcGoogle className='mr-2.5' size={20}/>
                        <span className=''>Đăng nhập với Google</span>
                    </>
                )}
            </>
        </Button>
    );
}
export default OAuth2Google;