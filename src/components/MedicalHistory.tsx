import { ArrowLeft, FileText, Calendar, Stethoscope, Pill, TestTube, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface MedicalHistoryProps {
  onNavigate: (page: string) => void;
}

export function MedicalHistory({ onNavigate }: MedicalHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'consultations' | 'medications' | 'lab'>('all');

  const consultations = [
    {
      id: '1',
      date: 'Nov 15, 2024',
      doctor: 'Dr. Sarah Ahmed',
      specialty: 'Dermatology',
      diagnosis: 'Skin condition - treated',
      status: 'Completed'
    },
    {
      id: '2',
      date: 'Oct 20, 2024',
      doctor: 'Dr. Mohammed Al-Rashid',
      specialty: 'Cardiology',
      diagnosis: 'Routine checkup - normal',
      status: 'Completed'
    }
  ];

  const medications = [
    {
      id: '1',
      name: 'Atorvastatin 20mg',
      prescribed: 'Nov 15, 2024',
      doctor: 'Dr. Sarah Ahmed',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Metformin 500mg',
      prescribed: 'Oct 20, 2024',
      doctor: 'Dr. Mohammed Al-Rashid',
      status: 'Active'
    }
  ];

  const labResults = [
    {
      id: '1',
      date: 'Nov 10, 2024',
      test: 'Complete Blood Count (CBC)',
      result: 'Normal',
      status: 'Completed'
    },
    {
      id: '2',
      date: 'Oct 25, 2024',
      test: 'Lipid Profile',
      result: 'Normal',
      status: 'Completed'
    }
  ];

  const filteredData = {
    all: [...consultations, ...medications, ...labResults],
    consultations,
    medications,
    lab: labResults
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => onNavigate('profile')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-semibold">Medical History</h1>
            <p className="text-xs text-gray-500">Your complete health records</p>
          </div>
        </div>

        <div className="flex gap-2">
          {(['all', 'consultations', 'medications', 'lab'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-[#005EB8] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 py-6">
        {filter === 'all' && (
          <>
            <div className="mb-6">
              <h2 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <Stethoscope size={18} />
                Consultations
              </h2>
              <div className="space-y-3">
                {consultations.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 font-semibold mb-1">{item.doctor}</h3>
                        <p className="text-xs text-gray-600">{item.specialty}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{item.diagnosis}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <Pill size={18} />
                Medications
              </h2>
              <div className="space-y-3">
                {medications.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 font-semibold mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-600">Prescribed by {item.doctor}</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar size={12} />
                      <span>Prescribed: {item.prescribed}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <TestTube size={18} />
                Lab Results
              </h2>
              <div className="space-y-3">
                {labResults.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 font-semibold mb-1">{item.test}</h3>
                        <p className="text-xs text-gray-600">Result: {item.result}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {filter !== 'all' && (
          <div className="space-y-3">
            {filteredData[filter].map((item: any) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-1">
                      {item.doctor || item.name || item.test}
                    </h3>
                    {item.specialty && <p className="text-xs text-gray-600">{item.specialty}</p>}
                    {item.diagnosis && <p className="text-sm text-gray-700 mt-1">{item.diagnosis}</p>}
                    {item.result && <p className="text-xs text-gray-600">Result: {item.result}</p>}
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar size={12} />
                  <span>{item.date || item.prescribed}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

