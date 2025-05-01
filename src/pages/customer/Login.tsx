import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"; // Import từ file form.tsx của bạn
import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {SigninValidation} from "@/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Loader from "@/components/ui/Loader.tsx";
import {useLoginMutation} from "@/api/auth.ts";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "@/redux/slices/authSlice.ts";
import {toastError, toastSuccess} from "@/lib/utils.ts";
import OAuth2Google from "@/components/ui/OAuth2Google.tsx";
import {ROUTES} from "@/types/constant.ts";

export const Login: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLogin, setIsGoogleLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [login] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
        setIsLoading(true);
        try {
            const response = await login({
                email: user.email,
                password: user.password,
            }).unwrap();

            // Cập nhật user vào Redux
            dispatch(setCurrentUser(response.data));
            toastSuccess("Đăng nhập thành công");
            navigate(ROUTES.HOME);
        } catch (error) {
            toastError("Đăng nhập thất bại", 2000)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mt-20 md:h-[70vh]">
            <div className="mx-auto max-w-md p-6 border-0">
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-medium">Đăng nhập</h1>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            className="h-10"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Mật khẩu"
                                                className="h-10"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <Eye className="h-4 w-4"/>
                                                ) : (
                                                    <EyeOff className="h-4 w-4"/>
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between items-center">
                            <Link
                                to={ROUTES.FORGOT_PASSWORD}
                                className="text-sm text-[#291D4C] hover:underline"
                            >
                                Quên mật khẩu
                            </Link>

                            <Link
                                to={""}
                                className="text-sm text-[#291D4C] hover:underline"
                            >
                                Đăng kí ngay
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="h-10 w-full"
                            style={{backgroundColor: "#291D4C"}}
                            disabled={isLoading || isGoogleLogin}
                        >
                            {isLoading ? <Loader/> : "Đăng Nhập"}
                        </Button>
                    </form>
                    <div className='w-full mt-4'>
                    <OAuth2Google setIsGoogleLogin={setIsGoogleLogin} isDisabled={isLoading} />
                    </div>
                </Form>
            </div>
        </div>
    );
};