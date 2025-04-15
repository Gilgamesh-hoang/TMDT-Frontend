import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "@/components/ui/Loader.tsx";
import { useVerifyEmailMutation } from "@/api/auth.ts";
import { toastError, toastSuccess } from "@/lib/utils.ts";
import { ROUTES } from "@/types/constant.ts";
import { Mail } from "lucide-react";

export const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const location = useLocation();
  const navigate = useNavigate();
  const [verifyEmail] = useVerifyEmailMutation();
  
  const email = location.state?.email || "your email";
  
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
  
  const handleVerify = async () => {
    if (!otp) {
      toastError("Vui lòng nhập mã OTP");
      return;
    }
    
    setIsLoading(true);
    try {
      await verifyEmail(otp).unwrap();
      toastSuccess("Xác thực email thành công!");
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toastError("Mã OTP không hợp lệ hoặc đã hết hạn");
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-3xl font-medium">Xác thực email</h1>
          <p className="mt-2 text-gray-600">
            Chúng tôi đã gửi mã OTP đến email {email}. Vui lòng kiểm tra và nhập mã để hoàn tất đăng ký.
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
              maxLength={5}
            />
          </div>

          {timeLeft > 0 && (
            <div className="text-center text-sm text-gray-500">
              Mã OTP sẽ hết hạn sau: <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          )}
          
          {timeLeft <= 0 && (
            <div className="text-center text-sm text-red-500">
              Mã OTP đã hết hạn. Vui lòng đăng ký lại để nhận mã mới.
            </div>
          )}

          <Button
            type="button"
            className="h-10 w-full"
            style={{ backgroundColor: "#291D4C" }}
            disabled={isLoading || timeLeft <= 0}
            onClick={handleVerify}
          >
            {isLoading ? <Loader /> : "Xác thực"}
          </Button>
          
          <div className="text-center">
            <Button
              variant="link"
              className="text-[#291D4C]"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Quay lại đăng ký
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};