import { z } from "zod";

export const EmployeeRegisterSchema = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z
      .string()
      .min(8, "Xác nhận mật khẩu phải có ít nhất 8 ký tự"),
    fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    phone: z.string().regex(/^(0|\+84)[0-9]{9}$/, "Số điện thoại không hợp lệ"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });
export type EmployeeResgisterRequest = z.infer<typeof EmployeeRegisterSchema>;
