import { Bell, Video, Calendar, FileText, Pill, TestTube, Syringe, Sparkles, Shield, Clock, ArrowRight, ChevronRight, MapPin, Building2, Stethoscope, Crown, Upload } from 'lucide-react';
import { Card } from './ui/card';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const mainFeatures = [
    { 
      id: 'consultation', 
      icon: Video, 
      label: 'Digital Consultation',
      subtitle: 'Video consultations',
      color: '#005EB8'
    },
    { 
      id: 'appointments', 
      icon: Calendar, 
      label: 'Appointments',
      subtitle: 'Manage bookings',
      color: '#00A3E0'
    },
    { 
      id: 'claims', 
      icon: FileText, 
      label: 'Claims',
      subtitle: 'Track & submit',
      color: '#0091EA'
    },
    { 
      id: 'medication', 
      icon: Pill, 
      label: 'Medication',
      subtitle: 'Order prescriptions',
      color: '#FF6B6B'
    },
    { 
      id: 'lab', 
      icon: TestTube, 
      label: 'Home Lab',
      subtitle: 'Lab tests at home',
      color: '#4ECDC4'
    },
    { 
      id: 'vaccination', 
      icon: Syringe, 
      label: 'Vaccination',
      subtitle: 'Schedule vaccines',
      color: '#95E1D3'
    },
    { 
      id: 'hospital-network', 
      icon: Building2, 
      label: 'Hospital Network',
      subtitle: 'Find hospitals',
      color: '#8B5CF6'
    },
    { 
      id: 'doctor-profiles', 
      icon: Stethoscope, 
      label: 'Doctor Profiles',
      subtitle: 'Find specialists',
      color: '#F59E0B'
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Clean Header */}
      <header className="bg-white px-5 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#005EB8] rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h4l3 9 4-18 3 9h4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">{getGreeting()}</div>
              <div className="text-gray-900 font-semibold text-base">Ahmed</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('claims')}
              className="text-gray-600 relative"
              title="View claims"
            >
              <FileText size={22} />
            </button>
            <button 
              onClick={() => onNavigate('upgrade-plans')}
              className="text-gray-600"
              title="Upgrade your plan"
            >
              <Crown size={22} />
            </button>
            <button 
              onClick={() => onNavigate('nearest-hospital')}
              className="text-gray-600"
              title="Find nearest hospitals"
            >
              <MapPin size={22} />
            </button>
            <button 
              onClick={() => onNavigate('notifications')}
              className="text-gray-600 relative"
            >
              <Bell size={22} />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Insurance Card - Clean Design */}
      <div className="px-5 pt-6 pb-5">
        <Card className="bg-gradient-to-br from-[#005EB8] to-[#004A94] p-5 border-0 shadow-lg">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-white/80 text-xs mb-1">Membership Number</div>
              <div className="text-white text-xl font-bold">20000001</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg">
              <Shield size={16} className="text-white" />
              <span className="text-white text-sm font-medium">Premium</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div>
              <div className="text-white/80 text-xs mb-1">Renewal Date</div>
              <div className="text-white font-semibold">Dec 31, 2025</div>
            </div>
            <button 
              onClick={() => onNavigate('benefits')}
              className="text-white text-sm font-medium flex items-center gap-1"
            >
              View Details
              <ChevronRight size={16} />
            </button>
          </div>
        </Card>
      </div>

      {/* Quick Stats - Modern Design */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                <Shield size={18} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
            <div className="text-xs font-medium text-gray-600">Active Benefits</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                <Clock size={18} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-xs font-medium text-gray-600">Pending Claims</div>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-sm">
                <Calendar size={18} className="text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-xs font-medium text-gray-600">Upcoming</div>
          </Card>
        </div>
      </div>

      {/* AI Insight - Subtle */}
      <div className="px-5 mb-6">
        <Card className="bg-gradient-to-r from-[#005EB8]/5 to-blue-50/50 p-4 border-l-4 border-[#005EB8]">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-[#005EB8] rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 mb-2">
                You have <span className="font-semibold text-[#005EB8]">6 physiotherapy sessions</span> remaining this month.
              </p>
              <button 
                onClick={() => onNavigate('benefits')}
                className="text-[#005EB8] text-xs font-semibold flex items-center gap-1"
              >
                View Benefits
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Services Grid - Modern Design */}
      <main className="px-5">
        <h2 className="text-gray-900 font-semibold text-base mb-4">Services</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {mainFeatures.map((feature) => {
            const Icon = feature.icon;
            const getGradientClass = (color: string) => {
              if (color === '#005EB8') return 'from-blue-50 to-blue-100/50';
              if (color === '#00A3E0') return 'from-cyan-50 to-cyan-100/50';
              if (color === '#0091EA') return 'from-sky-50 to-sky-100/50';
              if (color === '#FF6B6B') return 'from-red-50 to-red-100/50';
              if (color === '#4ECDC4') return 'from-teal-50 to-teal-100/50';
              if (color === '#95E1D3') return 'from-emerald-50 to-emerald-100/50';
              if (color === '#8B5CF6') return 'from-purple-50 to-purple-100/50';
              if (color === '#F59E0B') return 'from-amber-50 to-amber-100/50';
              return 'from-gray-50 to-gray-100/50';
            };
            return (
              <Card
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className={`bg-gradient-to-br ${getGradientClass(feature.color)} p-4 border-0 shadow-sm hover:shadow-md transition-all cursor-pointer`}
              >
                <div className="flex flex-col">
                  <div className="mb-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: feature.color }}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-1">{feature.label}</h3>
                  <p className="text-xs text-gray-600 font-medium">{feature.subtitle}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
