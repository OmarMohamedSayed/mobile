import { useState } from 'react';
import { ArrowLeft, Video, Phone, Star, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface DigitalConsultationProps {
  onNavigate: (page: string) => void;
}

export function DigitalConsultation({ onNavigate }: DigitalConsultationProps) {
  const [step, setStep] = useState<'specialty' | 'doctor' | 'slot' | 'confirm'>('specialty');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  const specialties = [
    { id: 'general', name: 'General Practitioner', icon: '🏥', available: 12 },
    { id: 'pediatrics', name: 'Pediatrics', icon: '👶', available: 8 },
    { id: 'dermatology', name: 'Dermatology', icon: '✨', available: 5 },
    { id: 'cardiology', name: 'Cardiology', icon: '❤️', available: 6 },
    { id: 'dental', name: 'Dental', icon: '🦷', available: 10 },
    { id: 'ophthalmology', name: 'Ophthalmology', icon: '👁️', available: 4 },
    { id: 'psychiatry', name: 'Psychiatry', icon: '🧠', available: 7 },
    { id: 'nutrition', name: 'Nutrition', icon: '🥗', available: 9 }
  ];

  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Ahmed',
      specialty: 'Dermatology',
      rating: 4.8,
      reviews: 234,
      hospital: 'Bupa Clinic - Riyadh',
      experience: '12 years',
      languages: ['Arabic', 'English'],
      nextAvailable: 'Today, 2:00 PM',
      avatar: '👩‍⚕️'
    },
    {
      id: '2',
      name: 'Dr. Mohammed Al-Rashid',
      specialty: 'Dermatology',
      rating: 4.9,
      reviews: 456,
      hospital: 'Bupa Medical Center - Jeddah',
      experience: '15 years',
      languages: ['Arabic', 'English', 'French'],
      nextAvailable: 'Tomorrow, 10:00 AM',
      avatar: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Dr. Fatima Hassan',
      specialty: 'Dermatology',
      rating: 4.7,
      reviews: 189,
      hospital: 'Bupa Wellness Center',
      experience: '8 years',
      languages: ['Arabic', 'English'],
      nextAvailable: 'Today, 4:30 PM',
      avatar: '👩‍⚕️'
    }
  ];

  const timeSlots = [
    { day: 'Today', date: 'Nov 18', slots: ['2:00 PM', '2:30 PM', '4:30 PM', '5:00 PM'] },
    { day: 'Tomorrow', date: 'Nov 19', slots: ['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM'] },
    { day: 'Thu', date: 'Nov 20', slots: ['9:30 AM', '11:00 AM', '1:00 PM', '4:00 PM'] }
  ];

  const handleSpecialtySelect = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
    setStep('doctor');
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setStep('slot');
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setStep('confirm');
  };

  const handleConfirm = () => {
    // Navigate to video call or show success
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => step === 'specialty' ? onNavigate('home') : setStep(step === 'doctor' ? 'specialty' : step === 'slot' ? 'doctor' : 'slot')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-gray-900">Digital Consultation</h1>
            <p className="text-xs text-gray-500">
              {step === 'specialty' && 'Choose Specialty'}
              {step === 'doctor' && 'Select Doctor'}
              {step === 'slot' && 'Pick Time Slot'}
              {step === 'confirm' && 'Confirm Booking'}
            </p>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white px-5 py-3 flex gap-2">
        <div className={`h-1 flex-1 rounded-full ${step === 'specialty' || step === 'doctor' || step === 'slot' || step === 'confirm' ? 'bg-[#005EB8]' : 'bg-gray-200'}`}></div>
        <div className={`h-1 flex-1 rounded-full ${step === 'doctor' || step === 'slot' || step === 'confirm' ? 'bg-[#005EB8]' : 'bg-gray-200'}`}></div>
        <div className={`h-1 flex-1 rounded-full ${step === 'slot' || step === 'confirm' ? 'bg-[#005EB8]' : 'bg-gray-200'}`}></div>
        <div className={`h-1 flex-1 rounded-full ${step === 'confirm' ? 'bg-[#005EB8]' : 'bg-gray-200'}`}></div>
      </div>

      {/* Step 1: Choose Specialty */}
      {step === 'specialty' && (
        <div className="px-5 py-6">
          <h2 className="text-gray-900 mb-4">What do you need help with?</h2>
          <div className="grid grid-cols-2 gap-3">
            {specialties.map((specialty) => (
              <Card
                key={specialty.id}
                onClick={() => handleSpecialtySelect(specialty.id)}
                className="p-4 cursor-pointer hover:shadow-md transition-all active:scale-95"
              >
                <div className="text-3xl mb-2">{specialty.icon}</div>
                <h3 className="text-gray-900 text-sm mb-1">{specialty.name}</h3>
                <p className="text-xs text-gray-500">{specialty.available} doctors available</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Choose Doctor */}
      {step === 'doctor' && (
        <div className="px-5 py-6">
          <h2 className="text-gray-900 mb-4">Available Doctors</h2>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                onClick={() => handleDoctorSelect(doctor)}
                className="p-4 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex gap-4">
                  <div className="text-5xl">{doctor.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{doctor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        {doctor.hospital}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span>💼 {doctor.experience}</span>
                      <span>•</span>
                      <span>🗣️ {doctor.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <Clock size={14} />
                        <span>{doctor.nextAvailable}</span>
                      </div>
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Select Time Slot */}
      {step === 'slot' && (
        <div className="px-5 py-6">
          <h2 className="text-gray-900 mb-4">Choose appointment time</h2>
          <div className="space-y-4">
            {timeSlots.map((daySlots, idx) => (
              <div key={idx}>
                <div className="text-sm text-gray-600 mb-2">{daySlots.day}, {daySlots.date}</div>
                <div className="grid grid-cols-3 gap-2">
                  {daySlots.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(slot)}
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

      {/* Step 4: Confirm */}
      {step === 'confirm' && selectedDoctor && (
        <div className="px-5 py-6">
          <h2 className="text-gray-900 mb-4">Confirm your appointment</h2>
          
          <Card className="p-5 mb-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <div className="text-4xl">{selectedDoctor.avatar}</div>
              <div className="flex-1">
                <h3 className="text-gray-900">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="text-[#005EB8]" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Date & Time</div>
                  <div className="text-gray-900">Today, {selectedSlot}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-[#005EB8]" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="text-gray-900">{selectedDoctor.hospital}</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm text-[#005EB8] mb-2">Choose consultation type:</h3>
            <div className="flex gap-3">
              <button className="flex-1 py-3 px-4 bg-white border-2 border-[#005EB8] rounded-lg flex items-center justify-center gap-2 text-[#005EB8]">
                <Video size={20} />
                Video Call
              </button>
              <button className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center gap-2 text-gray-600">
                <Phone size={20} />
                Audio Call
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setStep('slot')}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Change Time
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-[#005EB8] hover:bg-[#004A94] text-white"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
