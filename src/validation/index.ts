import * as z from "zod";

// ============================================================
// USER
// ============================================================

export const SigninValidation = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
    password: z.string().min(8, {message: "Mật khẩu cần dài ít nhất 8 ký tự."}),
});
export const ForgotPasswordValidation = z.object({
    email: z.string().email({message: 'Email không hợp lệ'}),
});
