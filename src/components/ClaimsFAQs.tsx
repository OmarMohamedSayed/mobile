import { ArrowLeft, HelpCircle, ChevronDown, Search, X, ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { Input } from './ui/input';

interface ClaimsFAQsProps {
  onNavigate: (page: string) => void;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'General',
    question: 'How long does it take to process a claim?',
    answer: 'Most claims are processed within 5-7 business days. Inpatient claims may take 7-10 business days due to medical review requirements. You can track your claim status in real-time through the Claims Timeline.'
  },
  {
    id: '2',
    category: 'General',
    question: 'What documents do I need to submit with my claim?',
    answer: 'Required documents vary by claim type:\n• Inpatient: Discharge summary, medical reports, invoices\n• Outpatient: Consultation notes, prescriptions, receipts\n• Emergency: Emergency report, treatment summary\n• Dental/Optical: Treatment notes, invoices\n• Pharmacy: Prescription and pharmacy receipt'
  },
  {
    id: '3',
    category: 'Submission',
    question: 'How do I submit a new claim?',
    answer: 'You can submit claims in three ways:\n1. Click "New Claim" button on the Claims page\n2. Use the AI Assistant for guided submission\n3. Upload documents directly through the mobile app\n\nAll methods allow you to upload supporting documents and track your claim status.'
  },
  {
    id: '4',
    category: 'Submission',
    question: 'What file formats are accepted for document upload?',
    answer: 'We accept the following file formats:\n• PDF files (recommended)\n• Image files: JPG, JPEG, PNG\n• Maximum file size: 10MB per file\n• You can upload multiple documents per claim'
  },
  {
    id: '5',
    category: 'Payment',
    question: 'How will I receive my reimbursement?',
    answer: 'Reimbursements are processed through:\n• Bank transfer to your registered account (3-5 business days)\n• Direct deposit (if applicable)\n• You will receive an SMS notification once payment is processed\n\nMake sure your bank details are up to date in your profile.'
  },
  {
    id: '6',
    category: 'Payment',
    question: 'Why was my claim partially approved?',
    answer: 'Partial approvals occur when:\n• Some services are not covered under your plan\n• Deductibles or copayments apply\n• Services exceed annual limits\n• Non-covered items (e.g., cosmetic procedures)\n\nYou can view detailed breakdown in your claim details page.'
  },
  {
    id: '7',
    category: 'Status',
    question: 'What does "Medical Review" status mean?',
    answer: 'Medical Review means your claim is being assessed by our medical team to ensure:\n• Treatment was medically necessary\n• Services align with your coverage\n• Documentation is complete\n\nThis is a standard step for inpatient and major procedures. You\'ll be notified once review is complete.'
  },
  {
    id: '8',
    category: 'Status',
    question: 'My claim was rejected. What should I do?',
    answer: 'If your claim is rejected:\n1. Review the rejection reason in claim details\n2. Check if additional documents are needed\n3. Submit an appeal through the app\n4. Contact support for assistance\n5. You can resubmit with missing information\n\nMost rejections can be resolved by providing additional documentation.'
  },
  {
    id: '9',
    category: 'Coverage',
    question: 'What is covered under my Premium plan?',
    answer: 'Your Premium plan covers:\n• Inpatient: Up to SAR 400,000/year\n• Outpatient: Up to SAR 150,000/year\n• Dental: Up to SAR 25,000/year\n• Optical: Up to SAR 15,000/year\n• Maternity: Up to SAR 30,000\n• Emergency: Unlimited\n• Digital consultations: Unlimited\n• Home lab services included'
  },
  {
    id: '10',
    category: 'Coverage',
    question: 'Do I need pre-authorization for treatments?',
    answer: 'Pre-authorization is required for:\n• Inpatient hospitalizations\n• Major surgeries\n• Expensive procedures (over SAR 10,000)\n• Cosmetic procedures\n\nEmergency treatments do not require pre-authorization. Contact us before non-emergency procedures to ensure coverage.'
  },
  {
    id: '11',
    category: 'Appeals',
    question: 'How do I appeal a rejected claim?',
    answer: 'To appeal a rejected claim:\n1. Go to your claim details\n2. Click "Appeal Decision"\n3. Provide additional documentation\n4. Submit your appeal with explanation\n\nAppeals are reviewed within 10-14 business days. You\'ll receive updates via SMS and in-app notifications.'
  },
  {
    id: '12',
    category: 'General',
    question: 'Can I track multiple claims at once?',
    answer: 'Yes! The Claims Timeline shows all your claims in one place. You can:\n• Filter by date range\n• View claim status at a glance\n• See estimated processing times\n• Access detailed information for each claim\n\nAll claims are organized chronologically with clear status indicators.'
  }
];

const categories = ['All', 'General', 'Submission', 'Payment', 'Status', 'Coverage', 'Appeals'];

export function ClaimsFAQs({ onNavigate }: ClaimsFAQsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' ||
      faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => onNavigate('claims')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-semibold">Claims FAQs</h1>
            <p className="text-xs text-gray-500">Frequently asked questions</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search FAQs..."
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

        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[#005EB8] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <main className="px-5 py-6">
        {filteredFAQs.length > 0 ? (
          <div className="space-y-3">
            {filteredFAQs.map((faq) => (
              <Card
                key={faq.id}
                className="overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-4 text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 font-semibold text-sm pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`text-gray-400 flex-shrink-0 transition-transform ${
                        expandedFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </div>
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <HelpCircle className="mx-auto text-gray-300 mb-3" size={48} />
            <p className="text-gray-500 font-medium mb-1">No FAQs found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        <Card className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-start gap-3">
            <HelpCircle className="text-[#005EB8] flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Still need help?</h4>
              <p className="text-xs text-gray-600 mb-3">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="text-[#005EB8] text-xs font-semibold flex items-center gap-1"
              >
                Chat with Support
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

