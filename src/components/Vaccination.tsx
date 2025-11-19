import { useState } from 'react';
import { ArrowLeft, Syringe, MapPin, Calendar, Check, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface VaccinationProps {
  onNavigate: (page: string) => void;
}

export function Vaccination({ onNavigate }: VaccinationProps) {
  const [selectedVaccine, setSelectedVaccine] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<'home' | 'clinic'>('clinic');

  const availableVaccines = [
    {
      id: '1',
      name: 'Influenza (Flu) Vaccine',
      description: 'Annual flu shot for seasonal protection',
      eligibility: 'All ages',
      price: 'SR 100.00',
      covered: true,
      recommended: true,
      icon: '💉'
    },
    {
      id: '2',
      name: 'COVID-19 Vaccine',
      description: 'mRNA vaccine booster dose',
      eligibility: 'Ages 12+',
      price: 'SR 0.00',
      covered: true,
      recommended: true,
      icon: '🦠'
    },
    {
      id: '3',
      name: 'Hepatitis B',
      description: 'Three-dose series',
      eligibility: 'All ages',
      price: 'SR 150.00',
      covered: true,
      recommended: false,
      icon: '💉'
    },
    {
      id: '4',
      name: 'Pneumococcal',
      description: 'Prevents pneumonia and meningitis',
      eligibility: 'Ages 65+ or high risk',
      price: 'SR 200.00',
      covered: true,
      recommended: false,
      icon: '💉'
    },
    {
      id: '5',
      name: 'Tetanus/Diphtheria',
      description: 'Booster shot every 10 years',
      eligibility: 'All ages',
      price: 'SR 80.00',
      covered: true,
      recommended: false,
      icon: '💉'
    }
  ];

  const vaccinationHistory = [
    {
      id: 'hist1',
      vaccine: 'COVID-19 Booster',
      date: 'Sep 15, 2025',
      location: 'Bupa Clinic - Riyadh',
      nextDue: null
    },
    {
      id: 'hist2',
      vaccine: 'Influenza Vaccine',
      date: 'Oct 1, 2024',
      location: 'Home Visit',
      nextDue: 'Oct 2025'
    }
  ];

  const handleBookVaccine = () => {
    if (selectedVaccine) {
      alert(`Vaccination ${selectedLocation === 'home' ? 'home visit' : 'clinic appointment'} booked successfully!`);
      setSelectedVaccine(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-gray-900">Vaccination Services</h1>
            <p className="text-xs text-gray-500">Stay protected and healthy</p>
          </div>
        </div>
      </header>

      <div className="px-5 py-6">
        {/* Recommended Vaccines Banner */}
        <Card className="p-4 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-green-900 mb-1">Recommended for You</h3>
              <p className="text-sm text-green-800">Based on your age and medical history, we recommend getting your annual flu shot.</p>
            </div>
          </div>
        </Card>

        {/* Available Vaccines */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3">Available Vaccines</h2>
          <div className="space-y-3">
            {availableVaccines.map((vaccine) => {
              const isSelected = selectedVaccine === vaccine.id;
              return (
                <Card
                  key={vaccine.id}
                  onClick={() => setSelectedVaccine(vaccine.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-2 border-[#005EB8] bg-blue-50' : ''
                  } ${vaccine.recommended ? 'border-l-4 border-l-green-500' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{vaccine.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-gray-900">{vaccine.name}</h3>
                            {vaccine.recommended && (
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{vaccine.description}</p>
                          <p className="text-xs text-gray-500">Eligibility: {vaccine.eligibility}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          {vaccine.covered ? (
                            <Badge className="bg-blue-100 text-[#005EB8]">
                              <Check size={12} className="mr-1" />
                              Fully Covered
                            </Badge>
                          ) : (
                            <span className="text-sm text-gray-700">Price: {vaccine.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Location Selection */}
        {selectedVaccine && (
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Choose Location</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card
                onClick={() => setSelectedLocation('clinic')}
                className={`p-4 cursor-pointer transition-all ${
                  selectedLocation === 'clinic' ? 'border-2 border-[#005EB8] bg-blue-50' : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🏥</div>
                  <h4 className="text-sm text-gray-900 mb-1">Clinic Visit</h4>
                  <p className="text-xs text-gray-600">Visit nearest Bupa clinic</p>
                </div>
              </Card>
              <Card
                onClick={() => setSelectedLocation('home')}
                className={`p-4 cursor-pointer transition-all ${
                  selectedLocation === 'home' ? 'border-2 border-[#005EB8] bg-blue-50' : ''
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🏠</div>
                  <h4 className="text-sm text-gray-900 mb-1">Home Visit</h4>
                  <p className="text-xs text-gray-600">Nurse comes to your home</p>
                  <p className="text-xs text-green-600 mt-1">+SR 50</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Address for Home Visit */}
        {selectedVaccine && selectedLocation === 'home' && (
          <div className="mb-6">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#005EB8] flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">Home</p>
                  <p className="text-sm text-gray-600">
                    King Fahd Road, Al Olaya District<br />
                    Riyadh 12213, Saudi Arabia
                  </p>
                </div>
                <button className="text-[#005EB8] text-sm">Change</button>
              </div>
            </Card>
          </div>
        )}

        {/* Available Slots for Clinic */}
        {selectedVaccine && selectedLocation === 'clinic' && (
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Select Time Slot</h3>
            <div className="space-y-4">
              {[
                { day: 'Tomorrow', date: 'Nov 19', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
                { day: 'Thu', date: 'Nov 20', slots: ['10:00 AM', '12:00 PM', '3:00 PM'] }
              ].map((daySlots, idx) => (
                <div key={idx}>
                  <div className="text-sm text-gray-600 mb-2">{daySlots.day}, {daySlots.date}</div>
                  <div className="grid grid-cols-3 gap-2">
                    {daySlots.slots.map((slot) => (
                      <button
                        key={slot}
                        className="py-3 px-4 border-2 border-gray-200 rounded-lg text-sm hover:border-[#005EB8] hover:bg-[#005EB8]/5 transition-all"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Book Button */}
        {selectedVaccine && (
          <Button 
            onClick={handleBookVaccine}
            className="w-full bg-[#005EB8] hover:bg-[#004A94] text-white py-6 mb-6"
          >
            <Calendar className="mr-2" size={20} />
            Book {selectedLocation === 'home' ? 'Home Visit' : 'Clinic Appointment'}
          </Button>
        )}

        {/* Vaccination History */}
        <div>
          <h2 className="text-gray-900 mb-3">Vaccination History</h2>
          <div className="space-y-3">
            {vaccinationHistory.map((record) => (
              <Card key={record.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{record.vaccine}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Calendar size={14} />
                      <span>{record.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin size={14} />
                      <span>{record.location}</span>
                    </div>
                    {record.nextDue && (
                      <Badge variant="outline" className="text-xs">
                        Next due: {record.nextDue}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
