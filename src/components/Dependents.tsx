import { ArrowLeft, Plus, User, Calendar, Shield, Phone, Mail } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface DependentsProps {
  onNavigate: (page: string) => void;
}

export function Dependents({ onNavigate }: DependentsProps) {
  const dependents = [
    {
      id: '1',
      name: 'Sara Ahmed',
      relationship: 'Spouse',
      memberId: '20000002',
      dateOfBirth: 'Jan 15, 1990',
      status: 'Active',
      plan: 'Premium',
      phone: '+966 50 123 4568',
      email: 'sara.ahmed@example.com'
    },
    {
      id: '2',
      name: 'Omar Ahmed',
      relationship: 'Son',
      memberId: '20000003',
      dateOfBirth: 'Mar 22, 2015',
      status: 'Active',
      plan: 'Premium',
      phone: '+966 50 123 4569',
      email: 'omar.ahmed@example.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('profile')} className="text-gray-600">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-gray-900 font-semibold">Dependents</h1>
              <p className="text-xs text-gray-500">Manage family members</p>
            </div>
          </div>
          <button className="p-2 bg-[#005EB8] text-white rounded-lg">
            <Plus size={20} />
          </button>
        </div>
      </header>

      <div className="px-5 py-6">
        <div className="mb-6">
          <Card className="bg-gradient-to-br from-[#005EB8] to-[#004A94] p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/80 text-xs mb-1">Total Dependents</div>
                <div className="text-white text-3xl font-bold">{dependents.length}</div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {dependents.map((dependent) => (
            <Card key={dependent.id} className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-2xl">
                  {dependent.relationship === 'Spouse' ? '👩' : '👦'}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 font-semibold text-lg mb-1">{dependent.name}</h3>
                      <Badge className="bg-[#005EB8] text-white mb-2">
                        {dependent.relationship}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {dependent.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Shield size={14} />
                      <span>Member ID: {dependent.memberId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} />
                      <span>DOB: {dependent.dateOfBirth}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Shield size={14} />
                      <span>Plan: {dependent.plan}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} />
                  <span>{dependent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} />
                  <span>{dependent.email}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  Edit
                </button>
                <button className="flex-1 py-2 px-3 bg-[#005EB8] text-white rounded-lg text-sm hover:bg-[#004A94] transition-colors">
                  View Details
                </button>
              </div>
            </Card>
          ))}
        </div>

        <button className="w-full mt-6 py-4 px-4 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#005EB8] hover:text-[#005EB8] transition-colors flex items-center justify-center gap-2">
          <Plus size={20} />
          <span className="font-medium">Add New Dependent</span>
        </button>
      </div>
    </div>
  );
}

