import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Video, Navigation, X, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AppointmentsProps {
  onNavigate: (page: string) => void;
}

export function Appointments({ onNavigate }: AppointmentsProps) {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Ahmed',
      specialty: 'Dermatology',
      type: 'video',
      date: 'Today',
      time: '2:00 PM',
      hospital: 'Bupa Clinic - Riyadh',
      status: 'confirmed',
      avatar: '👩‍⚕️'
    },
    {
      id: '2',
      doctor: 'Dr. Mohammed Al-Rashid',
      specialty: 'Cardiology',
      type: 'in-person',
      date: 'Tomorrow',
      time: '10:00 AM',
      hospital: 'Bupa Medical Center - Jeddah',
      status: 'confirmed',
      avatar: '👨‍⚕️'
    },
    {
      id: '3',
      doctor: 'Dr. Fatima Hassan',
      specialty: 'General Practice',
      type: 'phone',
      date: 'Nov 20',
      time: '3:30 PM',
      hospital: 'Bupa Wellness Center',
      status: 'pending',
      avatar: '👩‍⚕️'
    }
  ];

  const pastAppointments = [
    {
      id: '4',
      doctor: 'Dr. Ahmed Ibrahim',
      specialty: 'Ophthalmology',
      type: 'in-person',
      date: 'Nov 10',
      time: '11:00 AM',
      hospital: 'Bupa Eye Center',
      status: 'completed',
      avatar: '👨‍⚕️',
      summary: 'Routine eye examination completed. Prescription updated.'
    },
    {
      id: '5',
      doctor: 'Dr. Layla Mohammed',
      specialty: 'Dental',
      type: 'in-person',
      date: 'Nov 5',
      time: '2:00 PM',
      hospital: 'Bupa Dental Clinic',
      status: 'completed',
      avatar: '👩‍⚕️',
      summary: 'Dental cleaning and check-up. No issues found.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('home')} className="text-gray-600">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-gray-900">My Appointments</h1>
          </div>
          <button 
            onClick={() => onNavigate('consultation')}
            className="p-2 bg-[#005EB8] text-white rounded-full"
          >
            <Plus size={20} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-5 py-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Upcoming Appointments */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="p-4">
                  <div className="flex gap-3 mb-4">
                    <div className="text-4xl">{appointment.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={14} />
                          <span>{appointment.date} at {appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {appointment.type === 'video' && <Video size={14} />}
                          {appointment.type === 'phone' && <Phone size={14} />}
                          {appointment.type === 'in-person' && <MapPin size={14} />}
                          <span>
                            {appointment.type === 'video' && 'Video Consultation'}
                            {appointment.type === 'phone' && 'Phone Call'}
                            {appointment.type === 'in-person' && appointment.hospital}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {appointment.type === 'video' && appointment.date === 'Today' && (
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <Video size={16} className="mr-2" />
                        Join Call
                      </Button>
                    )}
                    {appointment.type === 'in-person' && (
                      <Button className="flex-1 bg-[#005EB8] hover:bg-[#004A94] text-white">
                        <Navigation size={16} className="mr-2" />
                        Navigate
                      </Button>
                    )}
                    <Button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Reschedule
                    </Button>
                    <Button className="bg-red-50 text-red-600 hover:bg-red-100 px-4">
                      <X size={16} />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="text-gray-500 mb-4">No upcoming appointments</p>
                <Button 
                  onClick={() => onNavigate('consultation')}
                  className="bg-[#005EB8] hover:bg-[#004A94] text-white"
                >
                  Book Appointment
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Past Appointments */}
          <TabsContent value="history" className="space-y-4">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex gap-3 mb-3">
                  <div className="text-4xl">{appointment.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>
                      <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Completed
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>{appointment.date} at {appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{appointment.hospital}</span>
                      </div>
                    </div>

                    {appointment.summary && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
                        <p className="text-sm text-gray-700">{appointment.summary}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
                    View Summary
                  </Button>
                  <Button className="flex-1 bg-[#005EB8] hover:bg-[#004A94] text-white">
                    Book Again
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
