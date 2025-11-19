import { useState } from 'react';
import { Mail, Phone, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | 'national-id'>('phone');
  const [value, setValue] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#005EB8] pt-12 pb-24 px-6 text-center">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12h4l3 9 4-18 3 9h4" stroke="#005EB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-white text-2xl mb-2">Welcome Back</h1>
        <p className="text-white/80">Log in to access your health benefits</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 -mt-16 px-6">
        <Card className="bg-white p-6 shadow-lg mb-6">
          <h2 className="text-gray-900 mb-6">Choose login method</h2>

          {/* Login Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                loginMethod === 'phone' 
                  ? 'bg-[#005EB8] text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Phone size={18} />
              <span className="text-sm">Phone</span>
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                loginMethod === 'email' 
                  ? 'bg-[#005EB8] text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Mail size={18} />
              <span className="text-sm">Email</span>
            </button>
            <button
              onClick={() => setLoginMethod('national-id')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                loginMethod === 'national-id' 
                  ? 'bg-[#005EB8] text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <CreditCard size={18} />
              <span className="text-sm">IQAMA</span>
            </button>
          </div>

          {/* Input Field */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">
              {loginMethod === 'phone' && 'Phone Number'}
              {loginMethod === 'email' && 'Email Address'}
              {loginMethod === 'national-id' && 'National ID / IQAMA'}
            </label>
            <Input
              type={loginMethod === 'email' ? 'email' : 'text'}
              placeholder={
                loginMethod === 'phone' ? '+966 5X XXX XXXX' :
                loginMethod === 'email' ? 'your.email@example.com' :
                'XXXXXXXXXX'
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Get OTP Button */}
          <Button 
            onClick={onLogin}
            className="w-full bg-[#005EB8] hover:bg-[#004A94] text-white py-6"
          >
            Get OTP
            <ArrowRight className="ml-2" size={20} />
          </Button>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-500 mt-4">
            We'll send you a one-time password to verify your identity
          </p>
        </Card>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-[#005EB8]">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
