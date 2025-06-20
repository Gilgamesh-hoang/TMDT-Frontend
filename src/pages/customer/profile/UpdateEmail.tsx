import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "@/components/ui/Loader.tsx";
import { useVerifyEmailUpdateMutation } from "@/api/customerApi/user";
import { toastError, toastSuccess } from "@/lib/utils.ts";
import { ROUTES } from "@/types/constant.ts";
import { Mail } from "lucide-react";

export const UpdateEmail: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const location = useLocation();
  const navigate = useNavigate();
  const [verifyEmailUpdate] = useVerifyEmailUpdateMutation();
  
  const newEmail = location.state?.newEmail || "email mới của bạn";
  
  // Timer for OTP expiration
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleVerifyUpdate = async () => {
    if (!otp) {
      toastError("Vui lòng nhập mã OTP");
      return;
    }
    
    setIsLoading(true);
    try {
      await verifyEmailUpdate({ otp }).unwrap();
      toastSuccess("Cập nhật email thành công!");
      // Navigate to profile or dashboard after successful update
      navigate(ROUTES.PROFILE );
    } catch (error) {
      toastError("Mã OTP không hợp lệ hoặc đã hết hạn");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    // Go back to profile/settings page
    navigate(ROUTES.PROFILE , { replace: true });
  };

  return (
    <div className="mt-20 md:h-[70vh]">
      <div className="mx-auto max-w-md p-6 border-0">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#291D4C] p-3 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-medium">Cập nhật email</h1>
          <p className="mt-2 text-gray-600">
            Chúng tôi đã gửi mã OTP đến email {newEmail}. Vui lòng kiểm tra và nhập mã để xác nhận cập nhật email.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Mã xác thực (OTP)
            </label>
            <Input
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Nhập mã OTP"
              className="h-12 text-center text-lg font-medium"
              maxLength={6}
            />
          </div>

          {timeLeft > 0 && (
            <div className="text-center text-sm text-gray-500">
              Mã OTP sẽ hết hạn sau: <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          )}
          
          {timeLeft <= 0 && (
            <div className="text-center text-sm text-red-500">
              Mã OTP đã hết hạn. Vui lòng thử cập nhật email lại để nhận mã mới.
            </div>
          )}

          <Button
            type="button"
            className="h-10 w-full"
            style={{ backgroundColor: "#291D4C" }}
            disabled={isLoading || timeLeft <= 0}
            onClick={handleVerifyUpdate}
          >
            {isLoading ? <Loader /> : "Xác nhận cập nhật"}
          </Button>
          
          <div className="text-center">
            <Button
              variant="link"
              className="text-[#291D4C]"
              onClick={handleGoBack}
            >
              Quay lại trang cá nhân
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};