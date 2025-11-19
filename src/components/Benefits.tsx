import { ArrowLeft, ChevronDown, Search, X, Building2, Stethoscope, Ambulance, Baby, Smile, Eye, Brain, Activity, Pill, TestTube, UserCheck, Dumbbell, Dna, Sparkles, Plane, ShieldAlert, Users, User, Heart, Accessibility, Apple, Ribbon, Wind, Check, Info, Gift } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface BenefitsProps {
  onNavigate: (page: string) => void;
}

interface BenefitItem {
  icon: LucideIcon;
  title: string;
  minimum: string;
  maximum: string;
  description: string;
  utilized: number; // percentage utilized (0-100)
}

const benefitsData: BenefitItem[] = [
  {
    icon: Building2,
    title: 'Inpatient Hospitalization',
    minimum: 'Room, board, surgery, medications',
    maximum: 'Up to SAR 600,000 per year',
    description: 'Guaranteed hospital care under CCHI — surgeries, stays, and medicines are covered. Annual cap protects against catastrophic costs.',
    utilized: 15
  },
  {
    icon: Stethoscope,
    title: 'Outpatient Services',
    minimum: 'Doctor visits, diagnostics, prescriptions',
    maximum: 'Included within annual limit',
    description: 'Everyday checkups, tests, and prescriptions are mandated. Clinics must provide care without hidden exclusions.',
    utilized: 45
  },
  {
    icon: Ambulance,
    title: 'Emergency Services',
    minimum: 'Urgent cases & ambulance',
    maximum: 'Included within annual limit',
    description: 'Immediate emergency care and ambulance services are legally required, no prior approval needed.',
    utilized: 0
  },
  {
    icon: Baby,
    title: 'Maternity & Newborn Care',
    minimum: 'Prenatal, delivery, postnatal, newborn care',
    maximum: 'Up to SAR 15,000 per pregnancy',
    description: 'Safe pregnancy and newborn care are guaranteed. Employers must provide this benefit.',
    utilized: 0
  },
  {
    icon: Smile,
    title: 'Dental Care',
    minimum: 'Preventive & treatment coverage',
    maximum: 'Up to SAR 2,000 per year',
    description: 'Routine dental checkups and treatments are included. Preventive care is mandatory, advanced care capped.',
    utilized: 65
  },
  {
    icon: Eye,
    title: 'Optical / Vision Care',
    minimum: 'Eye exams, corrective lenses',
    maximum: 'Up to SAR 400 per year',
    description: 'Vision care is supported with exams and glasses. CCHI ensures basic optical needs are met.',
    utilized: 100
  },
  {
    icon: Brain,
    title: 'Mental Health',
    minimum: 'Psychiatric consultations & therapy',
    maximum: 'Up to SAR 15,000 per year',
    description: 'Mental health is recognized as essential. Therapy and consultations are covered.',
    utilized: 20
  },
  {
    icon: Activity,
    title: 'Preventive & Chronic Disease',
    minimum: 'Vaccinations, screenings, chronic disease management',
    maximum: 'Included within annual limit',
    description: 'Preventive care and chronic disease management are mandatory. Vaccinations and screenings reduce risks.',
    utilized: 30
  },
  {
    icon: Pill,
    title: 'Prescription Drugs',
    minimum: 'Medications prescribed by licensed doctors',
    maximum: 'Included within annual limit',
    description: 'All prescribed medicines are covered. Pharmacies must honor insurance approvals.',
    utilized: 55
  },
  {
    icon: TestTube,
    title: 'Laboratory Tests',
    minimum: 'Blood tests, imaging, diagnostics',
    maximum: 'Included within annual limit',
    description: 'Lab work and imaging are covered, ensuring accurate diagnosis without extra cost.',
    utilized: 25
  },
  {
    icon: UserCheck,
    title: 'Specialist Consultations',
    minimum: 'Mandatory access to specialists',
    maximum: 'Included within annual limit',
    description: 'You can see specialists when referred — insurers cannot block access.',
    utilized: 35
  },
  {
    icon: Dumbbell,
    title: 'Physiotherapy & Rehab',
    minimum: 'Rehabilitation sessions',
    maximum: 'Up to SAR 10,000 per year',
    description: 'Rehab and physiotherapy are covered, helping recovery after illness or injury.',
    utilized: 10
  },
  {
    icon: Dna,
    title: 'Genetic & Rare Disease Care',
    minimum: 'Screening and treatment support',
    maximum: 'Included within annual limit',
    description: 'Coverage for rare conditions is mandated, ensuring fairness for all patients.',
    utilized: 0
  },
  {
    icon: Sparkles,
    title: 'Dermatology & Skin Care',
    minimum: 'Medical skin treatments',
    maximum: 'Up to SAR 5,000 per year',
    description: 'Skin conditions requiring medical care are covered, not just cosmetic.',
    utilized: 40
  },
  {
    icon: Plane,
    title: 'Travel & Evacuation (Medical)',
    minimum: 'Emergency medical evacuation',
    maximum: 'Case-by-case, within annual limit',
    description: "If treatment isn't available locally, insurers must cover evacuation costs.",
    utilized: 0
  },
  {
    icon: ShieldAlert,
    title: 'Infectious Disease Care',
    minimum: 'Mandatory testing & treatment',
    maximum: 'Included within annual limit',
    description: 'Coverage for COVID-19, flu, and other infectious diseases is guaranteed under CCHI.',
    utilized: 5
  },
  {
    icon: Baby,
    title: 'Pediatric Care',
    minimum: 'Child consultations & vaccinations',
    maximum: 'Included within annual limit',
    description: "Children's health is protected with mandatory pediatric visits and vaccines.",
    utilized: 50
  },
  {
    icon: Users,
    title: 'Geriatric Care',
    minimum: 'Elderly health services',
    maximum: 'Included within annual limit',
    description: 'Seniors receive specialized care, ensuring dignity and support in later years.',
    utilized: 0
  },
  {
    icon: User,
    title: "Women's Health",
    minimum: 'Gynecology, screenings, preventive care',
    maximum: 'Included within annual limit',
    description: "Women's health services are guaranteed, including screenings and preventive care.",
    utilized: 30
  },
  {
    icon: Accessibility,
    title: 'Disability Support',
    minimum: 'Assistive devices & therapy',
    maximum: 'Case-by-case, capped',
    description: 'Coverage for wheelchairs, prosthetics, and therapy ensures inclusion and support.',
    utilized: 0
  },
  {
    icon: Apple,
    title: 'Nutrition & Diet Counseling',
    minimum: 'Mandatory for chronic conditions',
    maximum: 'Included within annual limit',
    description: 'Diet counseling is covered to support diabetes, obesity, and other conditions.',
    utilized: 15
  },
  {
    icon: Ribbon,
    title: 'Cancer Care',
    minimum: 'Chemotherapy, radiology, surgery',
    maximum: 'Included within annual limit',
    description: 'Cancer treatment is fully covered under CCHI, ensuring access to lifesaving care.',
    utilized: 0
  },
  {
    icon: Brain,
    title: 'Neurology Care',
    minimum: 'Epilepsy, stroke, neurological disorders',
    maximum: 'Included within annual limit',
    description: 'Neurological conditions are covered, ensuring specialized care access.',
    utilized: 8
  },
  {
    icon: Heart,
    title: 'Cardiology Care',
    minimum: 'Heart disease treatment & monitoring',
    maximum: 'Included within annual limit',
    description: 'Heart health is protected with mandatory coverage for cardiology services.',
    utilized: 22
  },
  {
    icon: Wind,
    title: 'Respiratory Care',
    minimum: 'Asthma, COPD, lung disease treatment',
    maximum: 'Included within annual limit',
    description: 'Respiratory conditions are covered, ensuring access to inhalers, oxygen, and care.',
    utilized: 18
  }
];

interface ProgressBarProps {
  percentage: number;
}

function ProgressBar({ percentage }: ProgressBarProps) {
  const getColor = () => {
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getBackgroundColor = () => {
    if (percentage >= 80) return 'bg-red-100';
    if (percentage >= 50) return 'bg-orange-100';
    return 'bg-green-100';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">Utilized</span>
        <span className="text-xs text-gray-900">{percentage}%</span>
      </div>
      <div className={`w-full h-2 ${getBackgroundColor()} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${getColor()} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function Benefits({ onNavigate }: BenefitsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredBenefits = benefitsData.filter(benefit =>
    benefit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    benefit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    benefit.minimum.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#005EB8] to-[#004A94] px-5 py-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors -ml-2"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Gift className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-white">My Benefits</h1>
              <p className="text-white/80 text-xs mt-0.5">View your coverage details</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-5 py-4 bg-white sticky top-0 z-10 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search benefits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:border-transparent"
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
        {searchQuery && (
          <p className="text-sm text-gray-600 mt-2">
            Found {filteredBenefits.length} benefit{filteredBenefits.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Benefits List */}
      <main className="px-5 py-6">
        {/* Hospital Network Link */}
        <Card 
          onClick={() => onNavigate('hospital-network')}
          className="p-4 mb-4 bg-gradient-to-br from-[#005EB8]/10 to-blue-50 border-2 border-[#005EB8]/20 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#005EB8] rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">Hospital Network Coverage</h3>
              <p className="text-sm text-gray-600">View partner hospitals & visit limits</p>
            </div>
            <ChevronDown className="text-[#005EB8] -rotate-90" size={20} />
          </div>
        </Card>

        <h2 className="text-gray-900 mb-4">Coverage Details</h2>
        
        <div className="space-y-3">
          {filteredBenefits.length === 0 ? (
            <div className="text-center py-12">
              <Search className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-600">No benefits found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#005EB8] hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredBenefits.map((benefit, index) => (
            <Card key={index} className="bg-white overflow-hidden shadow-sm">
              <button
                onClick={() => toggleExpand(index)}
                className="w-full p-4 text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#005EB8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="text-[#005EB8]" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-gray-900 text-sm">{benefit.title}</h3>
                        <ChevronDown 
                          className={`text-gray-400 flex-shrink-0 transition-transform ${
                            expandedIndex === index ? 'rotate-180' : ''
                          }`}
                          size={20}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {benefit.maximum}
                      </div>
                    </div>
                  </div>
                  <ProgressBar percentage={benefit.utilized} />
                </div>
              </button>
              
              {expandedIndex === index && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                  <div className="space-y-3">
                    {/* Minimum Coverage */}
                    <div className="bg-gradient-to-r from-[#005EB8]/5 to-[#005EB8]/10 rounded-lg p-4 border-l-4 border-[#005EB8]">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#005EB8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="text-white" size={14} />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-[#005EB8] mb-1">Minimum Coverage Includes</div>
                          <div className="text-sm text-gray-900">{benefit.minimum}</div>
                        </div>
                      </div>
                    </div>

                    {/* What This Means */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Info className="text-[#005EB8]" size={14} />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-[#005EB8] mb-1">What This Means</div>
                          <div className="text-sm text-gray-700 leading-relaxed">{benefit.description}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))
          )}
        </div>
      </main>
    </div>
  );
}
