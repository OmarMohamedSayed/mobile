import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Heart, User, Bot, Home } from 'lucide-react';

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getActiveColor = (path: string) => {
    return isActive(path) ? 'text-[#005EB8]' : 'text-gray-400';
  };

  if (location.pathname === '/ai-assistant') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3 safe-area-inset-bottom z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button 
          onClick={() => navigate('/home')}
          className={`flex flex-col items-center gap-1 ${getActiveColor('/home')} relative`}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
          {isActive('/home') && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005EB8] rounded-b-full"></div>
          )}
        </button>
        <button 
          onClick={() => navigate('/appointments')}
          className={`flex flex-col items-center gap-1 ${getActiveColor('/appointments')} relative`}
        >
          <Calendar size={24} />
          <span className="text-xs">Appointments</span>
          {isActive('/appointments') && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005EB8] rounded-b-full"></div>
          )}
        </button>
        <button 
          onClick={() => navigate('/ai-assistant')}
          className={`flex flex-col items-center gap-1 ${getActiveColor('/ai-assistant')} relative`}
        >
          <div className={`w-12 h-12 -mt-6 rounded-full flex items-center justify-center shadow-lg ${
            isActive('/ai-assistant') ? 'bg-[#005EB8]' : 'bg-[#005EB8]'
          }`}>
            <Bot className="text-white" size={24} />
          </div>
          <span className="text-xs mt-1">AI</span>
        </button>
        <button 
          onClick={() => navigate('/benefits')}
          className={`flex flex-col items-center gap-1 ${getActiveColor('/benefits')} relative`}
        >
          <Heart size={24} />
          <span className="text-xs">Benefits</span>
          {isActive('/benefits') && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005EB8] rounded-b-full"></div>
          )}
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center gap-1 ${getActiveColor('/profile')} relative`}
        >
          <User size={24} />
          <span className="text-xs">Profile</span>
          {isActive('/profile') && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#005EB8] rounded-b-full"></div>
          )}
        </button>
      </div>
    </nav>
  );
}

