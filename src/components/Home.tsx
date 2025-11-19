import { useNavigate } from 'react-router-dom';
import { Search, MessageSquare, Bell, ArrowRight, FileText, Clock, Gift, Sparkles, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#005EB8] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h4l3 9 4-18 3 9h4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-sm text-gray-600">Hi,</div>
              <div className="text-[#005EB8]">Ahmed</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-[#005EB8] transition-colors">
              <Search size={24} />
            </button>
            <button className="text-gray-600 hover:text-[#005EB8] transition-colors">
              <MessageSquare size={24} />
            </button>
            <button className="text-gray-600 hover:text-[#005EB8] transition-colors">
              <Bell size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6">
        {/* Insurance Card */}
        <Card className="bg-white p-5 mb-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Membership No: 20000001</div>
              <div className="text-xs text-gray-500 mb-1">Contribution Amount:</div>
              <div className="text-xs text-gray-500 mb-1">Network:</div>
              <div className="text-xs text-gray-500 mb-1">IQAMA:</div>
              <div className="text-xs text-gray-500">Clinic Limit:</div>
            </div>
            <div>
              <div className="text-xs mb-1">&nbsp;</div>
              <div className="text-xs text-gray-900 mb-1">SR 0.00</div>
              <div className="text-xs text-gray-900 mb-1">Internal Network</div>
              <div className="text-xs text-gray-900 mb-1">100001010</div>
              <div className="text-xs text-gray-900">20% up to SR 75.00</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-1">Special Hospital Policy Holder:</div>
            <div className="text-xs text-gray-900">Sample Card - Dummy</div>
          </div>
          <button className="text-[#005EB8] text-sm flex items-center gap-1 mx-auto">
            View More Details
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </Card>

        {/* AI Suggestions Section */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-[#005EB8]" size={20} />
            <h2 className="text-gray-900">Benefits for You</h2>
          </div>
          
          <div className="space-y-3">
            {/* AI Suggestion 1 */}
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

            {/* AI Suggestion 2 */}
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

            {/* AI Suggestion 3 */}
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

        {/* Approvals and Claims Section */}
        <section>
          <h2 className="text-gray-900 mb-3">Approvals and Claims</h2>
          
          <div className="grid gap-4 mb-4">
            {/* Claim Timeline */}
            <Card 
              className="bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate('claims')}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#005EB8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="text-[#005EB8]" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">Claim Timeline</div>
                  <div className="text-sm text-gray-600">View past claims and track status</div>
                </div>
              </div>
            </Card>

            {/* Submit Claim */}
            <Card 
              className="bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/ai-assistant?claim=true')}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#005EB8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="text-[#005EB8]" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-gray-900 mb-1">Submit a Reimbursement Claim Request</div>
                  <div className="text-sm text-gray-600">Easily request reimbursement for medical expenses</div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
