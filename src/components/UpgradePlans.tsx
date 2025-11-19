import { useState } from 'react';
import { ArrowLeft, Check, Crown, Shield, Sparkles, Zap, Star, ArrowRight, X, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface UpgradePlansProps {
  onNavigate: (page: string) => void;
}

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  icon: typeof Crown;
  color: string;
  bgGradient: string;
  buttonGradient: string;
  popular?: boolean;
  savings?: string;
  benefits: string[];
  coverage: {
    inpatient: string;
    outpatient: string;
    dental: string;
    optical: string;
    maternity: string;
    emergency: string;
  };
  highlights: string[];
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'Essential protection',
    price: '450',
    period: 'month',
    icon: Shield,
    color: '#6B7280',
    bgGradient: 'from-gray-50 to-gray-100',
    buttonGradient: 'from-gray-600 to-gray-700',
    benefits: [
      'Inpatient & Outpatient',
      'Emergency Services',
      'Basic Dental Care',
      'Network Hospitals',
      '24/7 Support'
    ],
    coverage: {
      inpatient: 'SAR 200K/year',
      outpatient: 'SAR 50K/year',
      dental: 'SAR 10K/year',
      optical: 'Not included',
      maternity: 'SAR 15K',
      emergency: 'Unlimited'
    },
    highlights: [
      'Annual limit: SAR 300K',
      'Digital consultation (limited)',
      'Prescription coverage'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Most popular choice',
    price: '850',
    period: 'month',
    icon: Crown,
    color: '#005EB8',
    bgGradient: 'from-blue-50 to-blue-100',
    buttonGradient: 'from-[#005EB8] to-[#004A94]',
    popular: true,
    savings: 'Save 15%',
    benefits: [
      'Full Medical Coverage',
      'Unlimited Outpatient',
      'Comprehensive Dental',
      'Optical Coverage',
      'Maternity Care',
      'Digital Consultations',
      'Home Lab Services',
      'Wellness Programs'
    ],
    coverage: {
      inpatient: 'SAR 400K/year',
      outpatient: 'SAR 150K/year',
      dental: 'SAR 25K/year',
      optical: 'SAR 15K/year',
      maternity: 'SAR 30K',
      emergency: 'Unlimited'
    },
    highlights: [
      'Annual limit: SAR 600K',
      'No deductibles',
      'Priority support',
      'Travel insurance'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tagline: 'Ultimate coverage',
    price: '1,500',
    period: 'month',
    icon: Sparkles,
    color: '#8B5CF6',
    bgGradient: 'from-purple-50 to-purple-100',
    buttonGradient: 'from-purple-600 to-indigo-700',
    benefits: [
      'Unlimited Coverage',
      'VIP Hospital Access',
      'Premium Dental & Optical',
      'Full Maternity Package',
      'Unlimited Consultations',
      'All Home Services',
      'Wellness Programs',
      'International Coverage',
      'Dedicated Care Manager',
      'Zero Copayments'
    ],
    coverage: {
      inpatient: 'Unlimited',
      outpatient: 'Unlimited',
      dental: 'SAR 50K/year',
      optical: 'SAR 30K/year',
      maternity: 'SAR 50K',
      emergency: 'Unlimited + Intl'
    },
    highlights: [
      'Unlimited annual coverage',
      'Concierge health services',
      'Executive screenings',
      'Family wellness programs'
    ]
  }
];

export function UpgradePlans({ onNavigate }: UpgradePlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const currentPlan = 'premium';

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-semibold text-lg">Upgrade Plans</h1>
            <p className="text-xs text-gray-500">Choose your perfect coverage</p>
          </div>
        </div>
      </header>

      <div className="px-5 pt-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#005EB8] to-[#004A94] text-white px-4 py-2 rounded-full mb-4 shadow-lg">
            <Star size={14} className="fill-white" />
            <span className="text-sm font-semibold">Premium Plan - Most Popular</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Plan</h2>
          <p className="text-gray-600 text-sm">Compare and choose the best coverage</p>
        </div>

        <div className="space-y-4 mb-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            const isPopular = plan.popular;
            const isCurrentPlan = currentPlan === plan.id;

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden border-2 transition-all ${
                  isSelected
                    ? 'border-[#005EB8] shadow-xl ring-4 ring-[#005EB8]/20'
                    : isPopular
                    ? 'border-[#005EB8] shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {isCurrentPlan && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 z-10">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                      <Check size={12} className="fill-white" />
                      <span>YOUR CURRENT PLAN</span>
                    </div>
                  </div>
                )}
                {isPopular && !isCurrentPlan && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#005EB8] to-[#004A94] text-white py-2 z-10">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                      <Star size={12} className="fill-white" />
                      <span>MOST POPULAR</span>
                      {plan.savings && (
                        <>
                          <span>•</span>
                          <span>{plan.savings}</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className={`p-5 bg-gradient-to-br ${plan.bgGradient} ${(isPopular || isCurrentPlan) ? 'pt-12' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: plan.color }}
                      >
                        <Icon className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        <p className="text-xs text-gray-600">{plan.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold" style={{ color: plan.color }}>
                          {plan.price}
                        </span>
                        <span className="text-gray-500 text-sm">SAR</span>
                      </div>
                      <p className="text-xs text-gray-500">per {plan.period}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Coverage Limits
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <span className="text-gray-600">Inpatient</span>
                        <span className="font-semibold text-gray-900">{plan.coverage.inpatient}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <span className="text-gray-600">Outpatient</span>
                        <span className="font-semibold text-gray-900">{plan.coverage.outpatient}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <span className="text-gray-600">Dental</span>
                        <span className="font-semibold text-gray-900">{plan.coverage.dental}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <span className="text-gray-600">Optical</span>
                        <span className="font-semibold text-gray-900">{plan.coverage.optical}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <span className="text-gray-600">Maternity</span>
                        <span className="font-semibold text-gray-900">{plan.coverage.maternity}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white/60 rounded-lg">
                        <span className="text-gray-600">Emergency</span>
                        <span className="font-semibold text-gray-900">{plan.coverage.emergency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 border-t border-white/50 pt-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Key Benefits
                    </h4>
                    <div className="space-y-1.5">
                      {plan.benefits.slice(0, 4).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Check
                            className="flex-shrink-0"
                            size={14}
                            style={{ color: plan.color }}
                          />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                      {plan.benefits.length > 4 && (
                        <div className="text-xs text-gray-600 pl-5">
                          +{plan.benefits.length - 4} more benefits
                        </div>
                      )}
                    </div>
                  </div>

                  {plan.highlights && plan.highlights.length > 0 && (
                    <div className="mb-4 border-t border-white/50 pt-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <TrendingUp size={12} className="text-gray-600" />
                        <span className="text-xs font-semibold text-gray-700">Highlights</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {plan.highlights.map((highlight, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-white/80 border-gray-200 text-gray-700"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => !isCurrentPlan && setSelectedPlan(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                      isCurrentPlan
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#005EB8] text-white ring-2 ring-[#005EB8] ring-offset-2'
                        : ` bg-gradient-to-r ${plan.buttonGradient} hover:shadow-lg active:scale-[0.98]`
                    }`}
                  >
                    {isCurrentPlan ? (
                      <>
                        <Check size={18} />
                        Current Plan
                      </>
                    ) : isSelected ? (
                      <>
                        <Check size={18} />
                        Selected
                      </>
                    ) : (
                      <>
                        Select Plan
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {selectedPlan && (
          <div className="mb-6">
            <Card className="bg-gradient-to-br from-[#005EB8] to-[#004A94] p-5 text-white shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-yellow-300" size={20} />
                    <h3 className="text-lg font-bold">Ready to Upgrade?</h3>
                  </div>
                  <p className="text-white/90 text-sm">
                    You've selected the{' '}
                    <span className="font-semibold">
                      {plans.find((p) => p.id === selectedPlan)?.name} Plan
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-white/80 hover:text-white p-1"
                >
                  <X size={20} />
                </button>
              </div>
              <button
                onClick={() => {
                  setSelectedPlan(null);
                  onNavigate('home');
                }}
                className="w-full py-3 px-4 bg-white text-[#005EB8] rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Complete Upgrade
                <ArrowRight size={18} />
              </button>
            </Card>
          </div>
        )}

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#005EB8] rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Need Help Choosing?</h4>
              <p className="text-xs text-gray-600 mb-3">
                Our experts can help you find the perfect plan for your needs.
              </p>
              <button className="text-[#005EB8] text-xs font-semibold flex items-center gap-1">
                Contact Support
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
