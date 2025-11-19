import { ArrowLeft, Sparkles, ChevronRight, Bell } from 'lucide-react';
import { Card } from './ui/card';

interface NotificationsProps {
  onNavigate: (page: string) => void;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-gradient-to-br from-[#005EB8] to-[#004A94] px-5 py-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors -ml-2"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Bell className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-white">Notifications</h1>
              <p className="text-white/80 text-xs mt-0.5">Stay updated with your benefits</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6">
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-[#005EB8]" size={20} />
            <h2 className="text-gray-900">Benefits for You</h2>
          </div>
          
          <div className="space-y-3">
            <Card className="bg-gradient-to-br from-[#005EB8]/5 to-blue-50 p-4 shadow-sm border-l-4 border-[#005EB8]">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#005EB8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    Since you visited <span className="text-[#005EB8]">cardiology</span> last month, did you know you have access to <span className="text-[#005EB8]">free nutrition counseling sessions</span>?
                  </p>
                  <button 
                    onClick={() => onNavigate('benefits')}
                    className="text-[#005EB8] text-xs flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Benefit Details
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50/50 to-green-50/30 p-4 shadow-sm border-l-4 border-emerald-500">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    Great news! Your <span className="text-emerald-700">preventive care screenings</span> are fully covered this year. Schedule your annual check-up today.
                  </p>
                  <button 
                    onClick={() => onNavigate('benefits')}
                    className="text-emerald-700 text-xs flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn More
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50/50 to-violet-50/30 p-4 shadow-sm border-l-4 border-purple-500">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">
                    You have <span className="text-purple-700">6 physiotherapy sessions</span> remaining. Perfect for managing your wellness goals!
                  </p>
                  <button 
                    onClick={() => onNavigate('benefits')}
                    className="text-purple-700 text-xs flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Check Coverage
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

