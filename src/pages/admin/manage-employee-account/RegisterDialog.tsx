import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmployeeRegisterSchema, EmployeeResgisterRequest } from "./formSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRegisterEmployeeMutation } from "@/api/adminApi/account";
import { toastSuccess } from "@/lib/utils";

interface RegisterDialogProps {
  callback: () => void;
}
export const RegisterDialog: FC<RegisterDialogProps> = ({ callback }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<EmployeeResgisterRequest>({
    resolver: zodResolver(EmployeeRegisterSchema),
    defaultValues: {
      email: "",
      confirmPassword: "",
      fullName: "",
      password: "",
      phone: "",
    },
  });
  const [registerEmployee, { isLoading }] = useRegisterEmployeeMutation();
  const handleRegisterEmployee = async (request: EmployeeResgisterRequest) => {
    try {
      await registerEmployee(request).unwrap();
      toastSuccess("Tạo tài khoản nhân viên thành công");
      callback();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogContent>
      <DialogTitle>
        <DialogHeader>Tạo tài khoản nhân viên </DialogHeader>
      </DialogTitle>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegisterEmployee)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Nhập email của bạn" {...field} />
                    </div>
                  </FormControl>
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
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <Eye className="size-4" />
                        ) : (
                          <EyeOff className="size-4" />
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
            <Button
              type="submit"
              className="h-10 w-full"
              style={{ backgroundColor: "#291D4C" }}
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : "Đăng Ký"}
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
