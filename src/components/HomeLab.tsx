import { useState } from 'react';
import { ArrowLeft, TestTube, Calendar, Clock, MapPin, FileText, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HomeLabProps {
  onNavigate: (page: string) => void;
}

export function HomeLab({ onNavigate }: HomeLabProps) {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [showBooking, setShowBooking] = useState(false);

  const availableTests = [
    {
      id: '1',
      name: 'Complete Blood Count (CBC)',
      description: 'Measures different components of blood',
      price: 'SR 150.00',
      copay: 'SR 0.00',
      duration: '1-2 days',
      fasting: false
    },
    {
      id: '2',
      name: 'Thyroid Function Test',
      description: 'TSH, T3, T4 levels',
      price: 'SR 200.00',
      copay: 'SR 0.00',
      duration: '2-3 days',
      fasting: true
    },
    {
      id: '3',
      name: 'Blood Glucose',
      description: 'Fasting blood sugar test',
      price: 'SR 80.00',
      copay: 'SR 0.00',
      duration: '1 day',
      fasting: true
    },
    {
      id: '4',
      name: 'Vitamin D',
      description: 'Vitamin D levels check',
      price: 'SR 180.00',
      copay: 'SR 30.00',
      duration: '2-3 days',
      fasting: false
    },
    {
      id: '5',
      name: 'Lipid Profile',
      description: 'Cholesterol and triglycerides',
      price: 'SR 170.00',
      copay: 'SR 0.00',
      duration: '1-2 days',
      fasting: true
    }
  ];

  const pastResults = [
    {
      id: 'res1',
      testName: 'Complete Blood Count',
      date: 'Nov 5, 2025',
      status: 'Normal',
      technician: 'Ahmed Hassan'
    },
    {
      id: 'res2',
      testName: 'Thyroid Function Test',
      date: 'Oct 20, 2025',
      status: 'Normal',
      technician: 'Fatima Ali'
    }
  ];

  const timeSlots = [
    { day: 'Tomorrow', date: 'Nov 19', slots: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM'] },
    { day: 'Thu', date: 'Nov 20', slots: ['8:00 AM', '9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'] },
    { day: 'Fri', date: 'Nov 21', slots: ['8:00 AM', '10:00 AM', '12:00 PM'] }
  ];

  const toggleTestSelection = (id: string) => {
    if (selectedTests.includes(id)) {
      setSelectedTests(selectedTests.filter(testId => testId !== id));
    } else {
      setSelectedTests([...selectedTests, id]);
    }
  };

  const handleBookNow = () => {
    if (selectedTests.length > 0) {
      setShowBooking(true);
    }
  };

  const handleConfirmBooking = () => {
    alert('Home lab visit booked successfully! Our technician will arrive at your scheduled time.');
    setSelectedTests([]);
    setShowBooking(false);
  };

  if (showBooking) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowBooking(false)} className="text-gray-600">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-gray-900">Schedule Home Visit</h1>
              <p className="text-xs text-gray-500">Choose date and time</p>
            </div>
          </div>
        </header>

        <div className="px-5 py-6">
          {/* Selected Tests Summary */}
          <Card className="p-4 mb-6 bg-blue-50 border-2 border-[#005EB8]">
            <h3 className="text-gray-900 mb-3">Selected Tests ({selectedTests.length})</h3>
            <div className="space-y-2">
              {selectedTests.map((testId) => {
                const test = availableTests.find(t => t.id === testId);
                return test ? (
                  <div key={testId} className="flex justify-between text-sm">
                    <span className="text-gray-700">{test.name}</span>
                    <span className="text-[#005EB8]">{test.copay === 'SR 0.00' ? 'Covered' : test.copay}</span>
                  </div>
                ) : null;
              })}
            </div>
          </Card>

          {/* Home Address */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Visit Address</h3>
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

          {/* Time Slots */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Select Time Slot</h3>
            <div className="space-y-4">
              {timeSlots.map((daySlots, idx) => (
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

          {/* Important Notes */}
          <Card className="p-4 bg-yellow-50 border-yellow-200 mb-6">
            <h4 className="text-sm text-yellow-900 mb-2">⚠️ Important Reminders:</h4>
            <ul className="text-sm text-yellow-800 space-y-1 ml-4 list-disc">
              {selectedTests.some(id => availableTests.find(t => t.id === id)?.fasting) && (
                <li>Fasting required (8-12 hours before test)</li>
              )}
              <li>Please be available 15 minutes before scheduled time</li>
              <li>Have your insurance card ready</li>
            </ul>
          </Card>

          {/* Confirm Button */}
          <Button 
            onClick={handleConfirmBooking}
            className="w-full bg-[#005EB8] hover:bg-[#004A94] text-white py-6"
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-gray-900">Home Lab Services</h1>
            <p className="text-xs text-gray-500">Get lab tests done at home</p>
          </div>
        </div>
      </header>

      <div className="px-5 py-6">
        {/* Available Tests */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3">Available Lab Tests</h2>
          <div className="space-y-3">
            {availableTests.map((test) => {
              const isSelected = selectedTests.includes(test.id);
              return (
                <Card
                  key={test.id}
                  onClick={() => toggleTestSelection(test.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-2 border-[#005EB8] bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-[#005EB8]' : 'bg-gray-100'
                    }`}>
                      <TestTube className={isSelected ? 'text-white' : 'text-gray-600'} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900">{test.name}</h3>
                          <p className="text-sm text-gray-600">{test.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock size={12} className="mr-1" />
                          {test.duration}
                        </Badge>
                        {test.fasting && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                            Fasting required
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Price: {test.price}</span>
                        {test.copay === 'SR 0.00' ? (
                          <span className="text-green-600">Fully Covered</span>
                        ) : (
                          <span className="text-[#005EB8]">Co-pay: {test.copay}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Book Button */}
        {selectedTests.length > 0 && (
          <Button 
            onClick={handleBookNow}
            className="w-full bg-[#005EB8] hover:bg-[#004A94] text-white py-6 mb-6"
          >
            Book Home Visit ({selectedTests.length} tests selected)
          </Button>
        )}

        {/* Past Results */}
        <div>
          <h2 className="text-gray-900 mb-3">Recent Results</h2>
          <div className="space-y-3">
            {pastResults.map((result) => (
              <Card key={result.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <FileText className="text-[#005EB8]" size={20} />
                    <div>
                      <h3 className="text-gray-900">{result.testName}</h3>
                      <p className="text-sm text-gray-600">{result.date}</p>
                      <p className="text-xs text-gray-500">Technician: {result.technician}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {result.status}
                  </Badge>
                </div>
                <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200">
                  <Download size={16} className="mr-2" />
                  Download Report (PDF)
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
