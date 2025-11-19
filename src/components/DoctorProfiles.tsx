import { useState } from 'react';
import { ArrowLeft, Search, Star, MapPin, Phone, Calendar, X, Filter, GraduationCap, Award, User } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface DoctorProfilesProps {
  onNavigate: (page: string) => void;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  city: string;
  rating: number;
  reviews: number;
  experience: string;
  languages: string[];
  phone: string;
  available: boolean;
  nextAvailable?: string;
  avatar: string;
  bio?: string;
  education?: string[];
  certifications?: string[];
}

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Al-Mansouri',
    specialization: 'Cardiology',
    hospital: 'King Faisal Specialist Hospital',
    city: 'Riyadh',
    rating: 4.9,
    reviews: 127,
    experience: '15 years',
    languages: ['Arabic', 'English'],
    phone: '+966 11 464 7272',
    available: true,
    nextAvailable: 'Today, 2:00 PM',
    avatar: '👨‍⚕️',
    bio: 'Board-certified cardiologist with extensive experience in treating cardiovascular diseases. Specializes in interventional cardiology and preventive care.',
    education: ['MD, King Saud University', 'Fellowship in Cardiology, Mayo Clinic'],
    certifications: ['Board Certified in Cardiology', 'Advanced Cardiac Life Support']
  },
  {
    id: '2',
    name: 'Dr. Sarah Al-Zahrani',
    specialization: 'Pediatrics',
    hospital: 'Dr. Soliman Fakeeh Hospital',
    city: 'Jeddah',
    rating: 4.8,
    reviews: 89,
    experience: '12 years',
    languages: ['Arabic', 'English', 'French'],
    phone: '+966 12 665 5000',
    available: true,
    nextAvailable: 'Tomorrow, 10:00 AM',
    avatar: '👩‍⚕️',
    bio: 'Dedicated pediatrician with a passion for children\'s health. Expert in developmental pediatrics and childhood vaccinations.',
    education: ['MD, King Abdulaziz University', 'Residency in Pediatrics, Boston Children\'s Hospital'],
    certifications: ['Board Certified in Pediatrics', 'Pediatric Advanced Life Support']
  },
  {
    id: '3',
    name: 'Dr. Mohammed Al-Otaibi',
    specialization: 'Orthopedics',
    hospital: 'Saudi German Hospital',
    city: 'Riyadh',
    rating: 4.7,
    reviews: 203,
    experience: '18 years',
    languages: ['Arabic', 'English'],
    phone: '+966 11 218 9999',
    available: false,
    nextAvailable: 'Nov 25, 9:00 AM',
    avatar: '👨‍⚕️',
    bio: 'Expert orthopedic surgeon specializing in joint replacement and sports medicine. Over 18 years of experience treating complex musculoskeletal conditions.',
    education: ['MD, King Saud University', 'Fellowship in Orthopedic Surgery, Johns Hopkins'],
    certifications: ['Board Certified in Orthopedic Surgery', 'Sports Medicine Certification']
  },
  {
    id: '4',
    name: 'Dr. Fatima Al-Rashid',
    specialization: 'Dermatology',
    hospital: 'Al Hammadi Hospital',
    city: 'Riyadh',
    rating: 4.9,
    reviews: 156,
    experience: '10 years',
    languages: ['Arabic', 'English'],
    phone: '+966 11 276 3333',
    available: true,
    nextAvailable: 'Today, 4:00 PM',
    avatar: '👩‍⚕️',
    bio: 'Board-certified dermatologist specializing in cosmetic and medical dermatology. Expert in treating skin conditions and providing aesthetic treatments.',
    education: ['MD, King Saud University', 'Residency in Dermatology, Cleveland Clinic'],
    certifications: ['Board Certified in Dermatology', 'Cosmetic Dermatology Certification']
  },
  {
    id: '5',
    name: 'Dr. Khalid Al-Shehri',
    specialization: 'Neurology',
    hospital: 'King Faisal Specialist Hospital',
    city: 'Riyadh',
    rating: 4.8,
    reviews: 94,
    experience: '14 years',
    languages: ['Arabic', 'English'],
    phone: '+966 11 464 7272',
    available: true,
    nextAvailable: 'Today, 3:30 PM',
    avatar: '👨‍⚕️',
    bio: 'Neurologist with expertise in treating neurological disorders, epilepsy, and movement disorders. Committed to providing comprehensive neurological care.',
    education: ['MD, King Saud University', 'Fellowship in Neurology, Harvard Medical School'],
    certifications: ['Board Certified in Neurology', 'Epilepsy Specialist Certification']
  },
  {
    id: '6',
    name: 'Dr. Noura Al-Mutairi',
    specialization: 'Obstetrics & Gynecology',
    hospital: 'Mouwasat Hospital',
    city: 'Dammam',
    rating: 4.9,
    reviews: 178,
    experience: '16 years',
    languages: ['Arabic', 'English'],
    phone: '+966 13 844 2222',
    available: true,
    nextAvailable: 'Tomorrow, 11:00 AM',
    avatar: '👩‍⚕️',
    bio: 'Experienced OB/GYN specializing in high-risk pregnancies and minimally invasive gynecological surgery. Dedicated to women\'s health and wellness.',
    education: ['MD, King Faisal University', 'Residency in OB/GYN, Mayo Clinic'],
    certifications: ['Board Certified in OB/GYN', 'Maternal-Fetal Medicine Certification']
  },
  {
    id: '7',
    name: 'Dr. Faisal Al-Ghamdi',
    specialization: 'General Surgery',
    hospital: 'Saudi German Hospital',
    city: 'Riyadh',
    rating: 4.6,
    reviews: 112,
    experience: '20 years',
    languages: ['Arabic', 'English'],
    phone: '+966 11 218 9999',
    available: false,
    nextAvailable: 'Nov 26, 2:00 PM',
    avatar: '👨‍⚕️',
    bio: 'Veteran general surgeon with extensive experience in laparoscopic and minimally invasive surgery. Specializes in gastrointestinal and abdominal surgery.',
    education: ['MD, King Saud University', 'Fellowship in General Surgery, University of Toronto'],
    certifications: ['Board Certified in General Surgery', 'Advanced Laparoscopic Surgery']
  },
  {
    id: '8',
    name: 'Dr. Lina Al-Harbi',
    specialization: 'Psychiatry',
    hospital: 'King Faisal Specialist Hospital',
    city: 'Riyadh',
    rating: 4.7,
    reviews: 67,
    experience: '11 years',
    languages: ['Arabic', 'English'],
    phone: '+966 11 464 7272',
    available: true,
    nextAvailable: 'Today, 5:00 PM',
    avatar: '👩‍⚕️',
    bio: 'Compassionate psychiatrist specializing in mood disorders, anxiety, and adult psychiatry. Provides evidence-based treatment with a focus on patient well-being.',
    education: ['MD, King Saud University', 'Residency in Psychiatry, Stanford University'],
    certifications: ['Board Certified in Psychiatry', 'Cognitive Behavioral Therapy Certification']
  },
  {
    id: '9',
    name: 'Dr. Youssef Al-Mazrou',
    specialization: 'Oncology',
    hospital: 'King Faisal Specialist Hospital',
    city: 'Riyadh',
    rating: 4.9,
    reviews: 145,
    experience: '19 years',
    languages: ['Arabic', 'English', 'French'],
    phone: '+966 11 464 7272',
    available: true,
    nextAvailable: 'Tomorrow, 9:30 AM',
    avatar: '👨‍⚕️',
    bio: 'Leading oncologist specializing in medical oncology and cancer treatment. Expert in chemotherapy, immunotherapy, and personalized cancer care.',
    education: ['MD, King Saud University', 'Fellowship in Oncology, MD Anderson Cancer Center'],
    certifications: ['Board Certified in Medical Oncology', 'Hematology-Oncology Certification']
  },
  {
    id: '10',
    name: 'Dr. Amal Al-Qahtani',
    specialization: 'Endocrinology',
    hospital: 'Al Hammadi Hospital',
    city: 'Riyadh',
    rating: 4.8,
    reviews: 98,
    experience: '13 years',
    languages: ['Arabic', 'English'],
    phone: '+966 11 276 3333',
    available: true,
    nextAvailable: 'Today, 1:00 PM',
    avatar: '👩‍⚕️',
    bio: 'Endocrinologist specializing in diabetes management, thyroid disorders, and hormonal imbalances. Focuses on comprehensive endocrine care.',
    education: ['MD, King Saud University', 'Fellowship in Endocrinology, Mayo Clinic'],
    certifications: ['Board Certified in Endocrinology', 'Diabetes Management Certification']
  }
];

const specializations = [
  'All Specializations',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Neurology',
  'Obstetrics & Gynecology',
  'General Surgery',
  'Psychiatry',
  'Oncology',
  'Endocrinology'
];

export function DoctorProfiles({ onNavigate }: DoctorProfilesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = 
      selectedSpecialization === 'All Specializations' ||
      doctor.specialization === selectedSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  const availableDoctors = filteredDoctors.filter(d => d.available);
  const unavailableDoctors = filteredDoctors.filter(d => !d.available);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => onNavigate('home')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-semibold">Doctor Profiles</h1>
            <p className="text-xs text-gray-500">Find and book with specialists</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters || selectedSpecialization !== 'All Specializations'
                ? 'bg-[#005EB8] text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            title="Filter by specialization"
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search by name, specialization, or hospital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => {
                    setSelectedSpecialization(spec);
                    setShowFilters(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedSpecialization === spec
                      ? 'bg-[#005EB8] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {searchQuery || selectedSpecialization !== 'All Specializations' ? (
        <div className="px-5 py-3 bg-blue-50 border-b border-blue-100">
          <p className="text-sm text-gray-700">
            Found <span className="font-semibold text-[#005EB8]">{filteredDoctors.length}</span> doctor{filteredDoctors.length !== 1 ? 's' : ''}
            {selectedSpecialization !== 'All Specializations' && (
              <span> in {selectedSpecialization}</span>
            )}
          </p>
        </div>
      ) : null}

      <main className="px-5 py-6">
        {availableDoctors.length > 0 && (
          <div className="mb-6">
            <h2 className="text-gray-900 font-semibold text-base mb-4">Available Now</h2>
            <div className="space-y-4">
              {availableDoctors.map((doctor) => (
                <Card 
                  key={doctor.id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{doctor.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900 font-semibold mb-1">{doctor.name}</h3>
                          <Badge className="bg-[#005EB8] text-white mb-2">
                            {doctor.specialization}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                          <span className="text-xs text-gray-500">({doctor.reviews})</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={14} />
                          <span>{doctor.hospital}, {doctor.city}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{doctor.experience} experience</span>
                          <span>•</span>
                          <span>{doctor.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            Available {doctor.nextAvailable}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('appointments');
                          }}
                          className="flex-1 py-2 px-3 bg-[#005EB8] text-white rounded-lg text-sm hover:bg-[#004A94] transition-colors flex items-center justify-center gap-2"
                        >
                          <Calendar size={16} />
                          Book Appointment
                        </button>
                        <a
                          href={`tel:${doctor.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                          <Phone size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {unavailableDoctors.length > 0 && (
          <div>
            <h2 className="text-gray-900 font-semibold text-base mb-4">
              {availableDoctors.length > 0 ? 'Other Doctors' : 'All Doctors'}
            </h2>
            <div className="space-y-4">
              {unavailableDoctors.map((doctor) => (
                <Card 
                  key={doctor.id} 
                  className="p-4 opacity-75 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{doctor.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900 font-semibold mb-1">{doctor.name}</h3>
                          <Badge className="bg-gray-500 text-white mb-2">
                            {doctor.specialization}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                          <span className="text-xs text-gray-500">({doctor.reviews})</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={14} />
                          <span>{doctor.hospital}, {doctor.city}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{doctor.experience} experience</span>
                          <span>•</span>
                          <span>{doctor.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                            Next available: {doctor.nextAvailable}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('appointments');
                          }}
                          className="flex-1 py-2 px-3 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                          disabled
                        >
                          <Calendar size={16} />
                          Book Appointment
                        </button>
                        <a
                          href={`tel:${doctor.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center"
                        >
                          <Phone size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium mb-1">No doctors found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>

      {selectedDoctor && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setSelectedDoctor(null)}
        >
          <div 
            className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="text-gray-900 font-semibold text-lg">Doctor Profile</h2>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-5 py-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-6xl flex-shrink-0">{selectedDoctor.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-xl mb-2">{selectedDoctor.name}</h3>
                  <Badge className="bg-[#005EB8] text-white mb-3">
                    {selectedDoctor.specialization}
                  </Badge>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg mb-3">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-base font-semibold">{selectedDoctor.rating}</span>
                    <span className="text-sm text-gray-600">({selectedDoctor.reviews} reviews)</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} />
                      <span>{selectedDoctor.hospital}, {selectedDoctor.city}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <User size={16} />
                      <span>{selectedDoctor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Languages: {selectedDoctor.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          selectedDoctor.available 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}
                      >
                        {selectedDoctor.available 
                          ? `Available ${selectedDoctor.nextAvailable}` 
                          : `Next available: ${selectedDoctor.nextAvailable}`
                        }
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {selectedDoctor.bio && (
                <div className="mb-6">
                  <h4 className="text-gray-900 font-semibold mb-2">About</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedDoctor.bio}</p>
                </div>
              )}

              {selectedDoctor.education && selectedDoctor.education.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap size={18} />
                    Education
                  </h4>
                  <div className="space-y-2">
                    {selectedDoctor.education.map((edu, idx) => (
                      <div key={idx} className="text-sm text-gray-600 pl-6">
                        • {edu}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedDoctor.certifications && selectedDoctor.certifications.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                    <Award size={18} />
                    Certifications
                  </h4>
                  <div className="space-y-2">
                    {selectedDoctor.certifications.map((cert, idx) => (
                      <div key={idx} className="text-sm text-gray-600 pl-6">
                        • {cert}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedDoctor(null);
                    onNavigate('appointments');
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    selectedDoctor.available
                      ? 'bg-[#005EB8] text-white hover:bg-[#004A94]'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                  disabled={!selectedDoctor.available}
                >
                  <Calendar size={18} />
                  Book Appointment
                </button>
                <a
                  href={`tel:${selectedDoctor.phone}`}
                  className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

