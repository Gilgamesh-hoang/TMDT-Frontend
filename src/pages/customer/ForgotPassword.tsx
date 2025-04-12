import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"; // Import từ file form.tsx của bạn
import {useState} from "react";
import {useForm} from "react-hook-form";
import {EmailValidation} from "@/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Loader from "@/components/ui/Loader.tsx";
import OTP from "@/components/customer/OTP.tsx";
import {useForgotPasswordOtpMutation} from "@/api/customerApi/user.ts";
import {toastError} from "@/lib/utils.ts";

const ForgotPassword: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [forgotPasswordOtp] = useForgotPasswordOtpMutation();

    const form = useForm<z.infer<typeof EmailValidation>>({
        resolver: zodResolver(EmailValidation),
        defaultValues: {
            email: "",
        },
    });

    const handleSubmit = async ({email}: z.infer<typeof EmailValidation>) => {
        setIsLoading(true);
        try {
            await forgotPasswordOtp({email}).unwrap();
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error:", error);
            toastError('Email không tồn tại trong hệ thống', 2000)
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="mt-20 md:h-[70vh]">
                <div className="mx-auto max-w-md p-6 border-0">
                    <div className="mb-10 text-center">
                        <h1 className="text-5xl font-medium">Quên mật khẩu</h1>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                            <Button
                                type="submit"
                                className="h-10 w-full"
                                style={{backgroundColor: "#291D4C"}}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader/> : "Gửi"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            {isModalOpen && <OTP setIsModalOpen={setIsModalOpen}/>}
        </>
    );
};

export default ForgotPassword;