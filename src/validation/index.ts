import * as z from "zod";

export const SigninValidation = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(8, { message: "Mật khẩu cần dài ít nhất 8 ký tự." }),
});
export const EmailValidation = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
});

const paymentMethodEnum = z.enum(["VNPAY", "MOMO"]);
export const CheckoutValidation = z.object({
  fullName: z.string().min(1, { message: "Tên không được để trống." }),
  // email: z.string().email({message: 'Email không hợp lệ'}),
  phoneNumber: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 số." })
    .max(12, { message: "Số điện thoại không được dài quá 12 số." })
    .regex(/^\d+$/, { message: "Số điện thoại chỉ được chứa số." }),
  street: z.string().min(1, { message: "Địa chỉ không được để trống." }),
  province: z
    .string()
    .min(1, { message: "Tỉnh/Thành phố không được để trống." }),
  district: z.string().min(1, { message: "Quận/Huyện không được để trống." }),
  commune: z.string().min(1, { message: "Xã/Phường không được để trống." }),
  note: z.string().optional(),
  paymentMethod: paymentMethodEnum.refine((val) => val !== undefined, {
    message: "Phương thức thanh toán là bắt buộc",
  }),
});
