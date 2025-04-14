import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/ui/Loader.tsx";
import { useRegisterMutation, useCheckEmailExistsQuery } from "@/api/auth.ts";
import { toastError, toastSuccess } from "@/lib/utils.ts";

import OAuth2Google from "@/components/ui/OAuth2Google.tsx";
import { ROUTES } from "@/types/constant.ts";

// Validation schema for registration
const RegistrationValidation = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: z.string().min(8, "Xác nhận mật khẩu phải có ít nhất 8 ký tự"),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^(0|\+84)[0-9]{9}$/, "Số điện thoại không hợp lệ"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu nhập lại không khớp",
  path: ["confirmPassword"],
});

export const Register: React.FC = () => {
  const clientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID || '';
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof RegistrationValidation>>({
    resolver: zodResolver(RegistrationValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: "",
    },
  });

  // Sử dụng RTK Query hook cho việc kiểm tra email
  const email = form.watch("email");
  const shouldCheckEmail = email && z.string().email().safeParse(email).success;
  
  const { data: emailCheckResponse, isFetching: isCheckingEmail } = useCheckEmailExistsQuery(
    email,
    {
      skip: !shouldCheckEmail,
      refetchOnMountOrArgChange: true,
    }
  );
  
  // Xác định xem email có tồn tại hay không từ kết quả trả về
  const emailExists = emailCheckResponse?.data;

  const handleRegister = async (user: z.infer<typeof RegistrationValidation>) => {
    if (emailExists) {
      toastError("Email đã tồn tại trong hệ thống");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await register({
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        phone: user.phone,
      }).unwrap();

      toastSuccess("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản");
      // Navigate to verification page or login page
      navigate(ROUTES.VERIFY_EMAIL, { state: { email: user.email } });
    } catch (error:any) {
      toastError("Đăng ký thất bại. Vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-10 md:pb-10">
      <div className="mx-auto max-w-md p-6 border-0">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-medium">Đăng ký</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Nhập email của bạn"
                        className={`h-10 ${emailExists !== undefined ? (emailExists ? 'border-red-500' : 'border-green-500') : ''}`}
                        {...field}
                      />
                      {isCheckingEmail && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <Loader />
                        </div>
                      )}
                      {!isCheckingEmail && emailExists !== undefined && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          {emailExists ? (
                            <X className="h-4 w-4 text-red-500" />
                          ) : (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  {emailExists && (
                    <p className="text-sm text-red-500 mt-1">Email đã tồn tại trong hệ thống</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        className="h-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        className="h-10"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập họ và tên"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập số điện thoại"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end items-center pt-2">
              <Link
                to={ROUTES.LOGIN}
                className="text-sm text-[#291D4C] hover:underline"
              >
                Đã có tài khoản? Đăng nhập ngay
              </Link>
            </div>

            <Button
              type="submit"
              className="h-10 w-full"
              style={{ backgroundColor: "#291D4C" }}
              disabled={isLoading || isGoogleLogin || !!emailExists}
            >
              {isLoading ? <Loader /> : "Đăng Ký"}
            </Button>
          </form>
          <div className="w-full mt-4">
            <OAuth2Google setIsGoogleLogin={setIsGoogleLogin} isDisabled={isLoading} />
          </div>
        </Form>
      </div>
    </div>
  );
};