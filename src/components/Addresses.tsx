import { ArrowLeft, Plus, MapPin, Home, Building2, Edit, Trash2, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface AddressesProps {
  onNavigate: (page: string) => void;
}

export function Addresses({ onNavigate }: AddressesProps) {
  const [addresses] = useState([
    {
      id: '1',
      type: 'Home',
      label: 'Primary Address',
      address: 'King Fahd Road, Al Olaya District',
      city: 'Riyadh',
      postalCode: '12213',
      country: 'Saudi Arabia',
      isDefault: true,
      icon: Home
    },
    {
      id: '2',
      type: 'Work',
      label: 'Office Address',
      address: 'Business Park, King Abdullah Financial District',
      city: 'Riyadh',
      postalCode: '13519',
      country: 'Saudi Arabia',
      isDefault: false,
      icon: Building2
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('profile')} className="text-gray-600">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-gray-900 font-semibold">Addresses</h1>
              <p className="text-xs text-gray-500">Manage your addresses</p>
            </div>
          </div>
          <button className="p-2 bg-[#005EB8] text-white rounded-lg">
            <Plus size={20} />
          </button>
        </div>
      </header>

      <div className="px-5 py-6">
        <div className="space-y-4">
          {addresses.map((address) => {
            const Icon = address.icon;
            return (
              <Card key={address.id} className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Icon className="text-[#005EB8]" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 font-semibold mb-1">{address.label}</h3>
                        <Badge variant="outline" className="text-xs">
                          {address.type}
                        </Badge>
                      </div>
                      {address.isDefault && (
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                          <Check size={10} className="mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>{address.address}</p>
                      <p>{address.city}, {address.postalCode}</p>
                      <p>{address.country}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Edit size={16} />
                    Edit
                  </button>
                  {!address.isDefault && (
                    <button className="flex-1 py-2 px-3 bg-[#005EB8] text-white rounded-lg text-sm hover:bg-[#004A94] transition-colors">
                      Set as Default
                    </button>
                  )}
                  {!address.isDefault && (
                    <button className="py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <button className="w-full mt-6 py-4 px-4 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#005EB8] hover:text-[#005EB8] transition-colors flex items-center justify-center gap-2">
          <Plus size={20} />
          <span className="font-medium">Add New Address</span>
        </button>
      </div>
    </div>
  );
}

