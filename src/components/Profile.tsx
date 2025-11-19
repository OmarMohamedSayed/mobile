import { ArrowLeft, User, CreditCard, Users, FileText, MapPin, Settings, LogOut, ChevronRight, Phone, Mail } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ProfileProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Profile({ onNavigate, onLogout }: ProfileProps) {
  const userInfo = {
    name: 'Ahmed Mohammed',
    memberId: '20000001',
    iqama: '100001010',
    email: 'ahmed.mohammed@example.com',
    phone: '+966 50 123 4567',
    plan: 'Premium Plan',
    renewalDate: 'Dec 31, 2025'
  };

  const dependents = [
    { name: 'Sara Ahmed', relationship: 'Spouse', memberId: '20000002' },
    { name: 'Omar Ahmed', relationship: 'Son', memberId: '20000003' }
  ];

  const menuItems = [
    { icon: CreditCard, label: 'Insurance Card', action: 'insurance-card', color: '#005EB8' },
    { icon: Users, label: 'Dependents', count: dependents.length, action: 'dependents', color: '#00A3E0' },
    { icon: FileText, label: 'Medical History', action: 'medical-history', color: '#0091EA' },
    { icon: MapPin, label: 'Addresses', action: 'addresses', color: '#4ECDC4' },
    { icon: Settings, label: 'Settings', action: 'settings', color: '#95E1D3' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#005EB8] to-[#0077D4] px-5 pt-12 pb-20">
        <button onClick={() => onNavigate('home')} className="text-white mb-8">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h1 className="text-white text-2xl mb-1">{userInfo.name}</h1>
            <p className="text-white/80 text-sm">Member ID: {userInfo.memberId}</p>
          </div>
        </div>
      </header>

      {/* User Info Card */}
      <div className="px-5 -mt-12 mb-6">
        <Card className="p-5 shadow-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Plan Type</div>
              <div className="text-sm text-gray-900">{userInfo.plan}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Renewal Date</div>
              <div className="text-sm text-gray-900">{userInfo.renewalDate}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">IQAMA Number</div>
              <div className="text-sm text-gray-900">{userInfo.iqama}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Status</div>
              <div className="text-sm text-green-600">● Active</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="px-5 mb-6">
        <h2 className="text-gray-900 mb-3">Contact Information</h2>
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="text-[#005EB8]" size={20} />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Email</div>
                <div className="text-sm text-gray-900">{userInfo.email}</div>
              </div>
            </div>
            <div className="border-t pt-3 flex items-center gap-3">
              <Phone className="text-[#005EB8]" size={20} />
              <div className="flex-1">
                <div className="text-xs text-gray-500">Phone</div>
                <div className="text-sm text-gray-900">{userInfo.phone}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-5 mb-6">
        <h2 className="text-gray-900 mb-3">Account</h2>
        <Card className="divide-y">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.action}
                onClick={() => onNavigate(item.action)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-gray-900">{item.label}</div>
                </div>
                {item.count !== undefined && (
                  <div className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                    {item.count}
                  </div>
                )}
                <ChevronRight className="text-gray-400" size={20} />
              </button>
            );
          })}
        </Card>
      </div>

      {/* Dependents Preview */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-900">Family Members</h2>
          <button 
            onClick={() => onNavigate('dependents')}
            className="text-[#005EB8] text-sm"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {dependents.map((dependent) => (
            <Card key={dependent.memberId} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                  {dependent.relationship === 'Spouse' ? '👩' : '👦'}
                </div>
                <div className="flex-1">
                  <div className="text-gray-900">{dependent.name}</div>
                  <div className="text-sm text-gray-600">{dependent.relationship}</div>
                </div>
                <div className="text-xs text-gray-500">
                  ID: {dependent.memberId}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-5 mb-6">
        <Button 
          onClick={onLogout}
          className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-6"
        >
          <LogOut className="mr-2" size={20} />
          Logout
        </Button>
      </div>

      {/* App Version */}
      <div className="text-center text-xs text-gray-400 pb-4">
        Bupa Arabia App v1.0.0
      </div>
    </div>
  );
}
