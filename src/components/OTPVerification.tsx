import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface OTPVerificationProps {
  onVerify: () => void;
  onBack: () => void;
}

export function OTPVerification({ onVerify, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    if (newOtp.every(digit => digit !== '') && index === 5) {
      setTimeout(() => onVerify(), 300);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#005EB8] pt-12 pb-24 px-6">
        <button onClick={onBack} className="text-white mb-8 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className="text-white text-2xl mb-2">Verify OTP</h1>
        <p className="text-white/80">Enter the 6-digit code sent to your phone</p>
      </div>

      {/* OTP Form */}
      <div className="flex-1 -mt-16 px-6">
        <Card className="bg-white p-6 shadow-lg mb-6">
          {/* OTP Input */}
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-[#005EB8] focus:outline-none transition-colors"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            {timer > 0 ? (
              <p className="text-sm text-gray-600">
                Resend code in <span className="text-[#005EB8]">{timer}s</span>
              </p>
            ) : (
              <button className="text-sm text-[#005EB8]">
                Resend OTP
              </button>
            )}
          </div>

          {/* Verify Button */}
          <Button 
            onClick={onVerify}
            disabled={otp.some(digit => digit === '')}
            className="w-full bg-[#005EB8] hover:bg-[#004A94] text-white py-6 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Verify
            <ArrowRight className="ml-2" size={20} />
          </Button>

          {/* Auto-detection notice */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-[#005EB8] text-center">
              🔔 We'll auto-detect the OTP from your SMS
            </p>
          </div>
        </Card>

        {/* Help */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button className="text-[#005EB8]">Contact Support</button>
          </p>
        </div>
      </div>
    </div>
  );
}
