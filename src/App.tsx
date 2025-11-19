import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { SplashScreen } from './components/SplashScreen';
import { Login } from './components/Login';
import { OTPVerification } from './components/OTPVerification';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { Benefits } from './components/Benefits';
import { ClaimsTimeline } from './components/ClaimsTimeline';
import { AIAssistant } from './components/AIAssistant';
import { DigitalConsultation } from './components/DigitalConsultation';
import { Appointments } from './components/Appointments';
import { Medication } from './components/Medication';
import { HomeLab } from './components/HomeLab';
import { Vaccination } from './components/Vaccination';
import { Profile } from './components/Profile';
import { HospitalNetwork } from './components/HospitalNetwork';
import { NearestHospital } from './components/NearestHospital';
import { DoctorProfiles } from './components/DoctorProfiles';
import { UpgradePlans } from './components/UpgradePlans';
import { InsuranceCard } from './components/InsuranceCard';
import { Dependents } from './components/Dependents';
import { MedicalHistory } from './components/MedicalHistory';
import { Addresses } from './components/Addresses';
import { Settings } from './components/Settings';
import { ClaimsFAQs } from './components/ClaimsFAQs';
import { Notifications } from './components/Notifications';
import { BottomNavigation } from './components/BottomNavigation';

type AppFlow = 'splash' | 'login' | 'otp' | 'onboarding' | 'app';

const APP_ROUTES = [
  '/home',
  '/benefits',
  '/claims',
  '/ai-assistant',
  '/consultation',
  '/appointments',
  '/medication',
  '/lab',
  '/vaccination',
  '/profile',
  '/hospital-network',
  '/nearest-hospital',
  '/doctor-profiles',
  '/upgrade-plans',
  '/insurance-card',
  '/dependents',
  '/medical-history',
  '/addresses',
  '/settings',
  '/claims-faqs',
  '/notifications'
];

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appFlow, setAppFlow] = useState<AppFlow>(() => {
    const currentPath = window.location.pathname;
    const savedFlow = localStorage.getItem('appFlow') as AppFlow | null;
    const isAppRoute = APP_ROUTES.includes(currentPath);
    
    if (isAppRoute && savedFlow === 'app') {
      return 'app';
    }
    if (isAppRoute && savedFlow !== 'app') {
      return 'login';
    }
    if (savedFlow && savedFlow === 'app') {
      return 'app';
    }
    return 'splash';
  });

  useEffect(() => {
    const currentPath = location.pathname;
    const isAppRoute = APP_ROUTES.includes(currentPath);
    const savedFlow = localStorage.getItem('appFlow') as AppFlow | null;

    if (isAppRoute) {
      if (savedFlow === 'app') {
        setAppFlow('app');
      } else {
        setAppFlow('login');
      }
    } else if (currentPath === '/login') {
      if (savedFlow !== 'app') {
        setAppFlow('login');
      } else {
        navigate('/home');
      }
    } else if (currentPath === '/') {
      if (savedFlow === 'app') {
        navigate('/home');
      } else {
        setAppFlow('splash');
      }
    }
  }, [location.pathname, navigate]);

  const handleSplashComplete = () => {
    setAppFlow('login');
    localStorage.setItem('appFlow', 'login');
  };

  const handleLogin = () => {
    setAppFlow('otp');
    localStorage.setItem('appFlow', 'otp');
  };

  const handleOTPVerify = () => {
    setAppFlow('onboarding');
    localStorage.setItem('appFlow', 'onboarding');
  };

  const handleOnboardingComplete = () => {
    setAppFlow('app');
    localStorage.setItem('appFlow', 'app');
    navigate('/home');
  };

  const handleLogout = () => {
    setAppFlow('login');
    localStorage.removeItem('appFlow');
  };

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };

  if (appFlow === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (appFlow === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (appFlow === 'otp') {
    return <OTPVerification onVerify={handleOTPVerify} onBack={() => {
      setAppFlow('login');
      localStorage.setItem('appFlow', 'login');
    }} />;
  }

  if (appFlow === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (appFlow === 'app') {
    return (
      <>
        <Routes>
          <Route path="/home" element={<Dashboard onNavigate={handleNavigate} />} />
          <Route path="/benefits" element={<Benefits onNavigate={handleNavigate} />} />
          <Route path="/claims" element={<ClaimsTimeline onNavigate={handleNavigate} />} />
          <Route path="/ai-assistant" element={<AIAssistant onNavigate={handleNavigate} />} />
          <Route path="/consultation" element={<DigitalConsultation onNavigate={handleNavigate} />} />
          <Route path="/appointments" element={<Appointments onNavigate={handleNavigate} />} />
          <Route path="/medication" element={<Medication onNavigate={handleNavigate} />} />
          <Route path="/lab" element={<HomeLab onNavigate={handleNavigate} />} />
          <Route path="/vaccination" element={<Vaccination onNavigate={handleNavigate} />} />
          <Route path="/profile" element={<Profile onNavigate={handleNavigate} onLogout={handleLogout} />} />
          <Route path="/hospital-network" element={<HospitalNetwork onNavigate={handleNavigate} />} />
          <Route path="/nearest-hospital" element={<NearestHospital onNavigate={handleNavigate} />} />
          <Route path="/doctor-profiles" element={<DoctorProfiles onNavigate={handleNavigate} />} />
          <Route path="/upgrade-plans" element={<UpgradePlans onNavigate={handleNavigate} />} />
          <Route path="/insurance-card" element={<InsuranceCard onNavigate={handleNavigate} />} />
          <Route path="/dependents" element={<Dependents onNavigate={handleNavigate} />} />
          <Route path="/medical-history" element={<MedicalHistory onNavigate={handleNavigate} />} />
          <Route path="/addresses" element={<Addresses onNavigate={handleNavigate} />} />
          <Route path="/settings" element={<Settings onNavigate={handleNavigate} />} />
          <Route path="/claims-faqs" element={<ClaimsFAQs onNavigate={handleNavigate} />} />
          <Route path="/notifications" element={<Notifications onNavigate={handleNavigate} />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
        <BottomNavigation />
      </>
    );
  }

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
      <Toaster />
    </BrowserRouter>
  );
}
