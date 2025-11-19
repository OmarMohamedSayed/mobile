import { ArrowLeft, MapPin, Phone, Navigation, Star, Check, X, AlertCircle, Map } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { useState } from 'react';

interface HospitalNetworkProps {
  onNavigate: (page: string) => void;
}

export function HospitalNetwork({ onNavigate }: HospitalNetworkProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const hospitals = [
    {
      id: '1',
      name: 'King Faisal Specialist Hospital',
      logo: '🏥',
      city: 'Riyadh',
      rating: 4.8,
      coverage: {
        outpatient: { included: true, copay: 20, deductible: 75 },
        inpatient: { included: true, copay: 10, deductible: 500 }
      },
      visits: {
        allowed: 6,
        used: 3,
        remaining: 3
      },
      specialties: ['Cardiology', 'Oncology', 'Neurology'],
      phone: '+966 11 464 7272'
    },
    {
      id: '2',
      name: 'Dr. Soliman Fakeeh Hospital',
      logo: '🏥',
      city: 'Jeddah',
      rating: 4.7,
      coverage: {
        outpatient: { included: true, copay: 20, deductible: 75 },
        inpatient: { included: true, copay: 15, deductible: 500 }
      },
      visits: {
        allowed: 6,
        used: 1,
        remaining: 5
      },
      specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
      phone: '+966 12 665 5000'
    },
    {
      id: '3',
      name: 'Saudi German Hospital',
      logo: '🏥',
      city: 'Riyadh',
      rating: 4.6,
      coverage: {
        outpatient: { included: true, copay: 20, deductible: 75 },
        inpatient: { included: true, copay: 10, deductible: 500 }
      },
      visits: {
        allowed: 6,
        used: 5,
        remaining: 1
      },
      specialties: ['Orthopedics', 'Dermatology', 'ENT'],
      phone: '+966 11 218 9999'
    },
    {
      id: '4',
      name: 'Al Hammadi Hospital',
      logo: '🏥',
      city: 'Riyadh',
      rating: 4.5,
      coverage: {
        outpatient: { included: false, copay: 0, deductible: 0 },
        inpatient: { included: true, copay: 15, deductible: 500 }
      },
      visits: {
        allowed: 6,
        used: 0,
        remaining: 6
      },
      specialties: ['Emergency', 'General Medicine'],
      phone: '+966 11 276 3333'
    },
    {
      id: '5',
      name: 'Mouwasat Hospital',
      logo: '🏥',
      city: 'Dammam',
      rating: 4.7,
      coverage: {
        outpatient: { included: true, copay: 20, deductible: 75 },
        inpatient: { included: true, copay: 10, deductible: 500 }
      },
      visits: {
        allowed: 6,
        used: 2,
        remaining: 4
      },
      specialties: ['Maternity', 'Pediatrics', 'Surgery'],
      phone: '+966 13 844 2222'
    }
  ];

  const getUtilizationPercentage = (used: number, allowed: number) => {
    return (used / allowed) * 100;
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getEligibilityBadge = (outpatient: boolean, inpatient: boolean) => {
    if (outpatient && inpatient) {
      return <Badge className="bg-green-100 text-green-700"><Check size={12} className="mr-1" />Full Coverage</Badge>;
    }
    if (outpatient || inpatient) {
      return <Badge className="bg-yellow-100 text-yellow-700"><AlertCircle size={12} className="mr-1" />Partial</Badge>;
    }
    return <Badge className="bg-red-100 text-red-700"><X size={12} className="mr-1" />Not Covered</Badge>;
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => onNavigate('benefits')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900">Hospital Network</h1>
            <p className="text-xs text-gray-500">Your coverage at partner hospitals</p>
          </div>
          <button
            onClick={() => onNavigate('nearest-hospital')}
            className="p-2 bg-[#005EB8] text-white rounded-lg hover:bg-[#004A94] transition-colors"
            title="Find nearest hospitals"
          >
            <Map size={20} />
          </button>
        </div>
        
        {/* Search */}
        <Input
          type="text"
          placeholder="Search hospitals or specialties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </header>

      {/* Legend */}
      <div className="px-5 py-4 bg-blue-50 border-b border-blue-100">
        <h3 className="text-sm text-gray-900 mb-2">Visit Limit Status:</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">0-49% (Good)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700">50-79% (Fair)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">80-100% (High)</span>
          </div>
        </div>
      </div>

      {/* Hospitals List */}
      <div className="px-5 py-6 space-y-4">
        {filteredHospitals.map((hospital) => {
          const utilizationPercentage = getUtilizationPercentage(hospital.visits.used, hospital.visits.allowed);
          const progressColor = getUtilizationColor(utilizationPercentage);
          
          return (
            <Card key={hospital.id} className="p-4">
              {/* Hospital Header */}
              <div className="flex items-start gap-3 mb-4 pb-4 border-b">
                <div className="text-4xl">{hospital.logo}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 mb-1">{hospital.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{hospital.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{hospital.rating}</span>
                    </div>
                  </div>
                  {getEligibilityBadge(hospital.coverage.outpatient.included, hospital.coverage.inpatient.included)}
                </div>
              </div>

              {/* Coverage Details */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-700 mb-2">Coverage Type:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${hospital.coverage.outpatient.included ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700">Outpatient</span>
                      {hospital.coverage.outpatient.included ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-red-600" />
                      )}
                    </div>
                    {hospital.coverage.outpatient.included && (
                      <div className="text-xs text-gray-600">
                        Co-pay: {hospital.coverage.outpatient.copay}%<br />
                        Deductible: SR {hospital.coverage.outpatient.deductible}
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${hospital.coverage.inpatient.included ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700">Inpatient</span>
                      {hospital.coverage.inpatient.included ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <X size={14} className="text-red-600" />
                      )}
                    </div>
                    {hospital.coverage.inpatient.included && (
                      <div className="text-xs text-gray-600">
                        Co-pay: {hospital.coverage.inpatient.copay}%<br />
                        Deductible: SR {hospital.coverage.inpatient.deductible}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Visit Tracking */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm text-gray-700">Visits Remaining</h4>
                  <span className="text-sm text-gray-900">
                    {hospital.visits.remaining} / {hospital.visits.allowed} visits
                  </span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${progressColor} transition-all`}
                    style={{ width: `${utilizationPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {utilizationPercentage.toFixed(0)}% utilized
                </p>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-700 mb-2">Available Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-2 px-3 bg-[#005EB8] text-white rounded-lg text-sm hover:bg-[#004A94] transition-colors flex items-center justify-center gap-2">
                  <Phone size={16} />
                  Call
                </button>
                <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Navigation size={16} />
                  Navigate
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500">No hospitals found matching your search</p>
        </div>
      )}
    </div>
  );
}
