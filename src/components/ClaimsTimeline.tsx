import { ArrowLeft, Clock, CheckCircle, Circle, AlertCircle, Upload, MessageSquare, Phone, HelpCircle, ChevronDown, FileText, Calendar, User, DollarSign, Building2, Activity, ArrowRight, Filter, X, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { useState, useRef } from 'react';

interface ClaimsTimelineProps {
  onNavigate: (page: string) => void;
}

interface ClaimStep {
  title: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  description?: string;
}

interface Claim {
  id: string;
  type: string;
  provider: string;
  serviceDate: string;
  claimedAmount: string;
  status: string;
  estimatedDays: string;
  expectedDate: string;
  memberName: string;
  memberId: string;
  policyNumber: string;
  admissionDate: string;
  dischargeDate: string;
  physician: string;
  diagnosis: string;
  invoiceNumber: string;
  totalClaimed: string;
  eligibleAmount: string;
  approvedAmount: string;
  copay: string;
  deductible: string;
  nonCovered: string;
  nonCoveredReason: string;
  steps: ClaimStep[];
  updates: { date: string; message: string }[];
  actionRequired?: string;
}

const dummyClaims: Claim[] = [
  {
    id: 'CLM-2024-00125',
    type: 'Inpatient',
    provider: 'King Faisal Specialist Hospital',
    serviceDate: '10 Nov 2024',
    claimedAmount: 'SAR 45,000',
    status: 'Medical Review',
    estimatedDays: '5-7 business days',
    expectedDate: '25 Nov 2024',
    memberName: 'Ahmed Mohammed Al-Rashid',
    memberId: 'BPA-123456',
    policyNumber: 'POL-2024-7890',
    admissionDate: '08 Nov 2024',
    dischargeDate: '12 Nov 2024',
    physician: 'Dr. Sarah Al-Mansoori',
    diagnosis: 'Acute Appendicitis',
    invoiceNumber: 'INV-KF-98765',
    totalClaimed: 'SAR 45,000',
    eligibleAmount: 'SAR 42,000',
    approvedAmount: 'SAR 40,500',
    copay: 'SAR 1,500',
    deductible: 'SAR 0',
    nonCovered: 'SAR 3,000',
    nonCoveredReason: 'Private room upgrade (non-covered benefit)',
    steps: [
      { title: 'Claim Submitted', status: 'completed', date: '14 Nov 2024', description: 'Claim received and logged' },
      { title: 'Eligibility Check', status: 'completed', date: '15 Nov 2024', description: 'Member eligibility verified' },
      { title: 'Medical Review', status: 'current', description: 'Under clinical assessment' },
      { title: 'Provider Validation', status: 'pending' },
      { title: 'Financial Review', status: 'pending' },
      { title: 'Final Decision', status: 'pending' },
      { title: 'Payout / Settlement', status: 'pending' }
    ],
    updates: [
      { date: '15 Nov 2024, 2:30 PM', message: 'Eligibility Check Completed – Member is active and covered' },
      { date: '14 Nov 2024, 10:15 AM', message: 'Claim Submitted Successfully' }
    ],
    actionRequired: 'Please upload the final discharge summary to expedite processing.'
  },
  {
    id: 'CLM-2024-00089',
    type: 'Outpatient',
    provider: 'Al-Noor Specialist Hospital',
    serviceDate: '05 Nov 2024',
    claimedAmount: 'SAR 3,200',
    status: 'Approved',
    estimatedDays: 'Completed',
    expectedDate: 'Completed',
    memberName: 'Ahmed Mohammed Al-Rashid',
    memberId: 'BPA-123456',
    policyNumber: 'POL-2024-7890',
    admissionDate: '05 Nov 2024',
    dischargeDate: '05 Nov 2024',
    physician: 'Dr. Mohammed Al-Qahtani',
    diagnosis: 'Diabetes Follow-up',
    invoiceNumber: 'INV-AN-54321',
    totalClaimed: 'SAR 3,200',
    eligibleAmount: 'SAR 3,200',
    approvedAmount: 'SAR 3,000',
    copay: 'SAR 200',
    deductible: 'SAR 0',
    nonCovered: 'SAR 0',
    nonCoveredReason: 'N/A',
    steps: [
      { title: 'Claim Submitted', status: 'completed', date: '06 Nov 2024' },
      { title: 'Eligibility Check', status: 'completed', date: '07 Nov 2024' },
      { title: 'Medical Review', status: 'completed', date: '08 Nov 2024' },
      { title: 'Provider Validation', status: 'completed', date: '09 Nov 2024' },
      { title: 'Financial Review', status: 'completed', date: '10 Nov 2024' },
      { title: 'Final Decision', status: 'completed', date: '11 Nov 2024' },
      { title: 'Payout / Settlement', status: 'completed', date: '12 Nov 2024' }
    ],
    updates: [
      { date: '12 Nov 2024, 11:45 AM', message: 'Payment processed – SAR 3,000 transferred to provider' },
      { date: '11 Nov 2024, 3:20 PM', message: 'Claim Approved' },
      { date: '06 Nov 2024, 9:00 AM', message: 'Claim Submitted Successfully' }
    ]
  },
  {
    id: 'CLM-2024-00156',
    type: 'Emergency',
    provider: 'Saudi German Hospital',
    serviceDate: '01 Nov 2024',
    claimedAmount: 'SAR 8,500',
    status: 'Rejected',
    estimatedDays: 'Completed',
    expectedDate: 'Completed',
    memberName: 'Ahmed Mohammed Al-Rashid',
    memberId: 'BPA-123456',
    policyNumber: 'POL-2024-7890',
    admissionDate: '01 Nov 2024',
    dischargeDate: '01 Nov 2024',
    physician: 'Dr. Fatima Al-Zahrani',
    diagnosis: 'Minor Sports Injury',
    invoiceNumber: 'INV-SG-77889',
    totalClaimed: 'SAR 8,500',
    eligibleAmount: 'SAR 0',
    approvedAmount: 'SAR 0',
    copay: 'SAR 0',
    deductible: 'SAR 0',
    nonCovered: 'SAR 8,500',
    nonCoveredReason: 'Treatment not covered under policy - sports-related injuries excluded',
    steps: [
      { title: 'Claim Submitted', status: 'completed', date: '02 Nov 2024', description: 'Claim received and logged' },
      { title: 'Eligibility Check', status: 'completed', date: '03 Nov 2024', description: 'Member eligibility verified' },
      { title: 'Medical Review', status: 'completed', date: '04 Nov 2024', description: 'Clinical assessment completed' },
      { title: 'Provider Validation', status: 'completed', date: '04 Nov 2024' },
      { title: 'Financial Review', status: 'completed', date: '05 Nov 2024' },
      { title: 'Final Decision', status: 'completed', date: '05 Nov 2024', description: 'Claim rejected - not covered' },
      { title: 'Payout / Settlement', status: 'completed', date: '05 Nov 2024', description: 'No payment - claim denied' }
    ],
    updates: [
      { date: '05 Nov 2024, 4:15 PM', message: 'Claim Rejected – Sports injuries are excluded from coverage' },
      { date: '04 Nov 2024, 10:30 AM', message: 'Medical Review completed – exclusion identified' },
      { date: '02 Nov 2024, 2:20 PM', message: 'Claim Submitted Successfully' }
    ]
  },
  {
    id: 'CLM-2024-00178',
    type: 'Dental',
    provider: 'Riyadh Dental Center',
    serviceDate: '28 Oct 2024',
    claimedAmount: 'SAR 2,400',
    status: 'Pending Documents',
    estimatedDays: '3-5 business days',
    expectedDate: '22 Nov 2024',
    memberName: 'Ahmed Mohammed Al-Rashid',
    memberId: 'BPA-123456',
    policyNumber: 'POL-2024-7890',
    admissionDate: '28 Oct 2024',
    dischargeDate: '28 Oct 2024',
    physician: 'Dr. Omar Al-Sayed',
    diagnosis: 'Root Canal Treatment',
    invoiceNumber: 'INV-RD-44556',
    totalClaimed: 'SAR 2,400',
    eligibleAmount: 'SAR 2,400',
    approvedAmount: 'SAR 0',
    copay: 'SAR 240',
    deductible: 'SAR 0',
    nonCovered: 'SAR 0',
    nonCoveredReason: 'N/A',
    steps: [
      { title: 'Claim Submitted', status: 'completed', date: '29 Oct 2024', description: 'Claim received and logged' },
      { title: 'Eligibility Check', status: 'completed', date: '30 Oct 2024', description: 'Member eligibility verified' },
      { title: 'Medical Review', status: 'current', description: 'Waiting for dental X-rays' },
      { title: 'Provider Validation', status: 'pending' },
      { title: 'Financial Review', status: 'pending' },
      { title: 'Final Decision', status: 'pending' },
      { title: 'Payout / Settlement', status: 'pending' }
    ],
    updates: [
      { date: '01 Nov 2024, 9:15 AM', message: 'Documents Required – Please upload pre-treatment X-rays' },
      { date: '30 Oct 2024, 11:00 AM', message: 'Eligibility Check Completed' },
      { date: '29 Oct 2024, 3:45 PM', message: 'Claim Submitted Successfully' }
    ],
    actionRequired: 'Please upload pre-treatment X-rays and treatment plan from your dentist.'
  },
  {
    id: 'CLM-2024-00201',
    type: 'Pharmacy',
    provider: 'Nahdi Pharmacy',
    serviceDate: '25 Oct 2024',
    claimedAmount: 'SAR 850',
    status: 'Processing',
    estimatedDays: '2-3 business days',
    expectedDate: '20 Nov 2024',
    memberName: 'Ahmed Mohammed Al-Rashid',
    memberId: 'BPA-123456',
    policyNumber: 'POL-2024-7890',
    admissionDate: '25 Oct 2024',
    dischargeDate: '25 Oct 2024',
    physician: 'Dr. Khalid Al-Ahmed',
    diagnosis: 'Chronic Medication Refill',
    invoiceNumber: 'INV-NH-99234',
    totalClaimed: 'SAR 850',
    eligibleAmount: 'SAR 850',
    approvedAmount: 'SAR 0',
    copay: 'SAR 85',
    deductible: 'SAR 0',
    nonCovered: 'SAR 0',
    nonCoveredReason: 'N/A',
    steps: [
      { title: 'Claim Submitted', status: 'completed', date: '26 Oct 2024', description: 'Claim received and logged' },
      { title: 'Eligibility Check', status: 'completed', date: '27 Oct 2024', description: 'Member eligibility verified' },
      { title: 'Medical Review', status: 'completed', date: '28 Oct 2024', description: 'Prescription verified' },
      { title: 'Provider Validation', status: 'current', description: 'Validating pharmacy credentials' },
      { title: 'Financial Review', status: 'pending' },
      { title: 'Final Decision', status: 'pending' },
      { title: 'Payout / Settlement', status: 'pending' }
    ],
    updates: [
      { date: '28 Oct 2024, 1:30 PM', message: 'Medical Review Completed – Prescription approved' },
      { date: '27 Oct 2024, 10:00 AM', message: 'Eligibility Check Completed' },
      { date: '26 Oct 2024, 4:00 PM', message: 'Claim Submitted Successfully' }
    ]
  },
  {
    id: 'CLM-2024-00243',
    type: 'Maternity',
    provider: 'Dr. Sulaiman Al-Habib Hospital',
    serviceDate: '15 Oct 2024',
    claimedAmount: 'SAR 18,500',
    status: 'Partially Approved',
    estimatedDays: 'Completed',
    expectedDate: 'Completed',
    memberName: 'Fatima Al-Rashid',
    memberId: 'BPA-123457',
    policyNumber: 'POL-2024-7890',
    admissionDate: '14 Oct 2024',
    dischargeDate: '17 Oct 2024',
    physician: 'Dr. Laila Al-Mutairi',
    diagnosis: 'Normal Delivery',
    invoiceNumber: 'INV-SH-66778',
    totalClaimed: 'SAR 18,500',
    eligibleAmount: 'SAR 15,000',
    approvedAmount: 'SAR 13,500',
    copay: 'SAR 1,500',
    deductible: 'SAR 0',
    nonCovered: 'SAR 3,500',
    nonCoveredReason: 'Private suite upgrade and additional amenities not covered',
    steps: [
      { title: 'Claim Submitted', status: 'completed', date: '18 Oct 2024', description: 'Claim received and logged' },
      { title: 'Eligibility Check', status: 'completed', date: '19 Oct 2024', description: 'Member eligibility verified' },
      { title: 'Medical Review', status: 'completed', date: '20 Oct 2024', description: 'Clinical records reviewed' },
      { title: 'Provider Validation', status: 'completed', date: '21 Oct 2024' },
      { title: 'Financial Review', status: 'completed', date: '22 Oct 2024' },
      { title: 'Final Decision', status: 'completed', date: '23 Oct 2024', description: 'Partially approved' },
      { title: 'Payout / Settlement', status: 'completed', date: '24 Oct 2024' }
    ],
    updates: [
      { date: '24 Oct 2024, 2:00 PM', message: 'Payment processed – SAR 13,500 transferred to provider' },
      { date: '23 Oct 2024, 11:30 AM', message: 'Claim Partially Approved – Some items excluded' },
      { date: '18 Oct 2024, 8:45 AM', message: 'Claim Submitted Successfully' }
    ]
  },
  {
    id: 'CLM-2024-00267',
    type: 'Laboratory',
    provider: 'BioLab Diagnostics',
    serviceDate: '12 Oct 2024',
    claimedAmount: 'SAR 450',
    status: 'Approved',
    estimatedDays: 'Completed',
    expectedDate: 'Completed',
    memberName: 'Ahmed Mohammed Al-Rashid',
    memberId: 'BPA-123456',
    policyNumber: 'POL-2024-7890',
    admissionDate: '12 Oct 2024',
    dischargeDate: '12 Oct 2024',
    physician: 'Dr. Nasser Al-Ghamdi',
    diagnosis: 'Annual Health Screening',
    invoiceNumber: 'INV-BL-33445',
    totalClaimed: 'SAR 450',
    eligibleAmount: 'SAR 450',
    approvedAmount: 'SAR 450',
    copay: 'SAR 0',
    deductible: 'SAR 0',
    nonCovered: 'SAR 0',
    nonCoveredReason: 'N/A',
    steps: [
      { title: 'Claim Submitted', status: 'completed', date: '13 Oct 2024' },
      { title: 'Eligibility Check', status: 'completed', date: '14 Oct 2024' },
      { title: 'Medical Review', status: 'completed', date: '14 Oct 2024' },
      { title: 'Provider Validation', status: 'completed', date: '15 Oct 2024' },
      { title: 'Financial Review', status: 'completed', date: '15 Oct 2024' },
      { title: 'Final Decision', status: 'completed', date: '16 Oct 2024' },
      { title: 'Payout / Settlement', status: 'completed', date: '17 Oct 2024' }
    ],
    updates: [
      { date: '17 Oct 2024, 9:30 AM', message: 'Payment processed – SAR 450 transferred to provider' },
      { date: '16 Oct 2024, 2:15 PM', message: 'Claim Approved – Full amount covered' },
      { date: '13 Oct 2024, 11:00 AM', message: 'Claim Submitted Successfully' }
    ]
  },
  {
    id: 'CLM-2024-00289',
    type: 'Optical',
    provider: 'Vision Care Center',
    serviceDate: '08 Oct 2024',
    claimedAmount: 'SAR 1,200',
    status: 'Under Investigation',
    estimatedDays: '7-10 business days',
    expectedDate: '26 Nov 2024',
    memberName: 'Ahmed Mohammed Al-Rashid',
    memberId: 'BPA-123456',
    policyNumber: 'POL-2024-7890',
    admissionDate: '08 Oct 2024',
    dischargeDate: '08 Oct 2024',
    physician: 'Dr. Ibrahim Al-Shehri',
    diagnosis: 'Vision Correction - Eyeglasses',
    invoiceNumber: 'INV-VC-88990',
    totalClaimed: 'SAR 1,200',
    eligibleAmount: 'SAR 800',
    approvedAmount: 'SAR 0',
    copay: 'SAR 0',
    deductible: 'SAR 0',
    nonCovered: 'SAR 400',
    nonCoveredReason: 'Designer frames exceed policy limit',
    steps: [
      { title: 'Claim Submitted', status: 'completed', date: '09 Oct 2024', description: 'Claim received and logged' },
      { title: 'Eligibility Check', status: 'completed', date: '10 Oct 2024', description: 'Member eligibility verified' },
      { title: 'Medical Review', status: 'completed', date: '11 Oct 2024', description: 'Prescription validated' },
      { title: 'Provider Validation', status: 'completed', date: '12 Oct 2024' },
      { title: 'Financial Review', status: 'current', description: 'Reviewing price breakdown' },
      { title: 'Final Decision', status: 'pending' },
      { title: 'Payout / Settlement', status: 'pending' }
    ],
    updates: [
      { date: '12 Oct 2024, 3:45 PM', message: 'Under Investigation – Verifying frame costs vs. policy limits' },
      { date: '11 Oct 2024, 10:20 AM', message: 'Medical Review Completed – Prescription valid' },
      { date: '09 Oct 2024, 1:30 PM', message: 'Claim Submitted Successfully' }
    ]
  }
];

export function ClaimsTimeline({ onNavigate }: ClaimsTimelineProps) {
  const [selectedClaimIndex, setSelectedClaimIndex] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    amount: true,
    updates: true,
    support: false
  });
  const [showFilter, setShowFilter] = useState(false);
  const [filterDates, setFilterDates] = useState({
    startDate: '',
    endDate: ''
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const claim = selectedClaimIndex !== null ? dummyClaims[selectedClaimIndex] : null;

  // Parse date from string format "DD MMM YYYY" to Date object for comparison
  const parseClaimDate = (dateStr: string): Date => {
    const months: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const parts = dateStr.split(' ');
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  };

  // Filter claims based on date range
  const filteredClaims = dummyClaims.filter(claim => {
    if (!filterDates.startDate && !filterDates.endDate) return true;
    
    const claimDate = parseClaimDate(claim.serviceDate);
    const startDate = filterDates.startDate ? new Date(filterDates.startDate) : null;
    const endDate = filterDates.endDate ? new Date(filterDates.endDate) : null;

    if (startDate && endDate) {
      return claimDate >= startDate && claimDate <= endDate;
    } else if (startDate) {
      return claimDate >= startDate;
    } else if (endDate) {
      return claimDate <= endDate;
    }
    return true;
  });

  const clearFilters = () => {
    setFilterDates({ startDate: '', endDate: '' });
  };

  const hasActiveFilters = filterDates.startDate || filterDates.endDate;

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getStatusColor = (status: ClaimStep['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'current': return 'text-[#005EB8] bg-blue-50 border-[#005EB8]';
      case 'pending': return 'text-gray-400 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: ClaimStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle size={20} className="text-green-600" />;
      case 'current': return <Circle size={20} className="text-[#005EB8] fill-[#005EB8]" />;
      case 'pending': return <Circle size={20} className="text-gray-300" />;
    }
  };

  // Get status styling for claim cards
  const getClaimStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Partially Approved':
        return {
          iconBg: 'bg-green-500',
          icon: <CheckCircle className="text-white" size={20} />,
          borderColor: '#10b981',
          badgeClasses: 'bg-green-100 text-green-700'
        };
      case 'Rejected':
        return {
          iconBg: 'bg-red-500',
          icon: <X className="text-white" size={20} />,
          borderColor: '#ef4444',
          badgeClasses: 'bg-red-100 text-red-700'
        };
      case 'Pending Documents':
        return {
          iconBg: 'bg-orange-500',
          icon: <AlertCircle className="text-white" size={20} />,
          borderColor: '#f97316',
          badgeClasses: 'bg-orange-100 text-orange-700'
        };
      case 'Under Investigation':
        return {
          iconBg: 'bg-purple-500',
          icon: <HelpCircle className="text-white" size={20} />,
          borderColor: '#a855f7',
          badgeClasses: 'bg-purple-100 text-purple-700'
        };
      case 'Medical Review':
      case 'Processing':
      default:
        return {
          iconBg: 'bg-blue-500',
          icon: <Clock className="text-white" size={20} />,
          borderColor: '#005EB8',
          badgeClasses: 'bg-blue-100 text-[#005EB8]'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#005EB8] to-[#004A94] px-5 py-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (selectedClaimIndex !== null) {
                setSelectedClaimIndex(null);
              } else {
                onNavigate('home');
              }
            }}
            className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors -ml-2"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Clock className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-white">
                {selectedClaimIndex !== null ? claim?.id : 'Claims Timeline'}
              </h1>
              <p className="text-white/80 text-xs mt-0.5">
                {selectedClaimIndex !== null ? 'Claim details and status' : 'Track your claim status'}
              </p>
            </div>
          </div>
          {selectedClaimIndex === null && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-white text-[#005EB8] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus size={18} />
              New Claim
            </button>
          )}
        </div>
      </header>

      <main className="px-5 py-6 space-y-4">
        {/* Claims Timeline View */}
        {selectedClaimIndex === null ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900">Your Claims Timeline</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className={`p-2 rounded-lg transition-colors ${
                    showFilter || hasActiveFilters
                      ? 'bg-[#005EB8] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {/* Filter Section */}
            {showFilter && (
              <Card className="bg-white p-4 shadow-sm mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-[#005EB8]" size={18} />
                    <h3 className="text-gray-900 text-sm">Filter by Date Range</h3>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <X size={14} />
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">Start Date</label>
                    <input
                      type="date"
                      value={filterDates.startDate}
                      onChange={(e) => setFilterDates(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005EB8] text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">End Date</label>
                    <input
                      type="date"
                      value={filterDates.endDate}
                      onChange={(e) => setFilterDates(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005EB8] text-sm"
                    />
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-600">
                      Showing {filteredClaims.length} of {dummyClaims.length} claims
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* No Results Message */}
            {filteredClaims.length === 0 ? (
              <Card className="bg-white p-8 shadow-sm text-center">
                <Calendar className="text-gray-300 mx-auto mb-3" size={48} />
                <h3 className="text-gray-900 mb-2">No Claims Found</h3>
                <p className="text-sm text-gray-600 mb-4">
                  No claims match your selected date range.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-[#005EB8] text-sm hover:underline"
                >
                  Clear filters
                </button>
              </Card>
            ) : (
              <div className="relative">
                {filteredClaims.map((c, index) => {
                const statusStyle = getClaimStatusStyle(c.status);
                const originalIndex = dummyClaims.findIndex(claim => claim.id === c.id);
                
                return (
                  <div key={c.id} className="flex gap-4 relative pb-8 last:pb-0">
                    {/* Timeline Line */}
                    {index < filteredClaims.length - 1 && (
                      <div className="absolute left-[20px] top-[60px] w-0.5 h-[calc(100%-20px)] bg-gray-200" />
                    )}
                    
                    {/* Timeline Icon */}
                    <div className="flex-shrink-0 mt-5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md ${statusStyle.iconBg}`}>
                        {statusStyle.icon}
                      </div>
                    </div>

                    {/* Claim Card */}
                    <Card 
                      className="flex-1 bg-white p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4"
                      style={{ borderLeftColor: statusStyle.borderColor }}
                      onClick={() => setSelectedClaimIndex(originalIndex)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Claim ID</div>
                          <div className="text-gray-900">{c.id}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs ${statusStyle.badgeClasses}`}>
                          {c.status}
                        </div>
                      </div>

                      {/* Claim Info */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-3">
                          <Activity className="text-gray-400 flex-shrink-0 mt-0.5" size={16} />
                          <div className="flex-1">
                            <div className="text-sm text-gray-900">{c.type} Treatment</div>
                            <div className="text-xs text-gray-600">{c.provider}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Calendar className="text-gray-400 flex-shrink-0" size={16} />
                          <div className="text-sm text-gray-600">Service Date: {c.serviceDate}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <DollarSign className="text-gray-400 flex-shrink-0" size={16} />
                          <div className="text-sm text-gray-900">Amount: <span className="text-[#005EB8]">{c.claimedAmount}</span></div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {(c.status === 'Approved' || c.status === 'Partially Approved') ? (
                            <>
                              <CheckCircle className="text-green-600" size={14} />
                              <span className="text-xs text-green-700">Completed on {c.expectedDate}</span>
                            </>
                          ) : c.status === 'Rejected' ? (
                            <>
                              <X className="text-red-600" size={14} />
                              <span className="text-xs text-red-700">Rejected on {c.expectedDate}</span>
                            </>
                          ) : (
                            <>
                              <Clock className="text-[#005EB8]" size={14} />
                              <span className="text-xs text-gray-600">Expected: {c.expectedDate}</span>
                            </>
                          )}
                        </div>
                        <ArrowRight className="text-gray-400" size={16} />
                      </div>
                    </Card>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        ) : (
          <>
        {/* Overview Summary Card */}
        <Card className="bg-white p-5 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-600 mb-1">Claim ID</div>
                <div className="text-gray-900">{claim.id}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${getClaimStatusStyle(claim.status).badgeClasses}`}>
                {claim.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-600 mb-1">Claim Type</div>
                <div className="text-sm text-gray-900">{claim.type}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Service Date</div>
                <div className="text-sm text-gray-900">{claim.serviceDate}</div>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-600 mb-1">Provider</div>
              <div className="text-sm text-gray-900">{claim.provider}</div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-600">Claimed Amount</div>
                <div className="text-gray-900">{claim.claimedAmount}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">Expected Completion</div>
                <div className="text-sm text-[#005EB8]">{claim.expectedDate}</div>
              </div>
            </div>

            {claim.estimatedDays !== 'Completed' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Clock className="text-[#005EB8] flex-shrink-0 mt-0.5" size={16} />
                  <div className="text-xs text-gray-700">
                    <span className="text-[#005EB8]">Estimated processing time:</span> {claim.estimatedDays}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Action Required */}
        {claim.actionRequired && (
          <Card className="bg-orange-50 border-l-4 border-orange-500 p-4 shadow-sm">
            <div className="flex gap-3">
              <AlertCircle className="text-orange-600 flex-shrink-0" size={20} />
              <div className="flex-1">
                <div className="text-sm text-orange-900 mb-2">{claim.actionRequired}</div>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
                  <Upload size={16} />
                  Upload Document
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Status Progress Timeline */}
        <Card className="bg-gradient-to-br from-white to-gray-50 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('updates')}
            className="w-full p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#005EB8] to-[#004a94]">
                <Activity className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-gray-900">Claim Progress</h2>
                <div className="text-xs text-gray-600 mt-0.5">
                  {claim.steps.filter(s => s.status === 'completed').length} of {claim.steps.length} steps completed
                </div>
              </div>
            </div>
            <ChevronDown 
              className={`text-gray-400 transition-transform ${expandedSections.updates ? 'rotate-180' : ''}`}
              size={20}
            />
          </button>
          
          {expandedSections.updates && (
            <div className="px-5 pb-5 border-t border-gray-200 pt-4 bg-white">
              {(() => {
                // Find the rejection step if claim is rejected
                const isClaimRejected = claim.status === 'Rejected';
                const rejectionStepIndex = isClaimRejected 
                  ? claim.steps.findIndex(s => 
                      s.title.toLowerCase().includes('decision') && 
                      (s.description?.toLowerCase().includes('reject') || s.title.toLowerCase().includes('reject'))
                    )
                  : -1;
                
                // Filter steps - only show up to rejection step if rejected
                const visibleSteps = rejectionStepIndex >= 0 
                  ? claim.steps.slice(0, rejectionStepIndex + 1)
                  : claim.steps;
                
                const completedCount = visibleSteps.filter(s => s.status === 'completed').length;
                const totalSteps = visibleSteps.length;
                
                return (
                  <>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 rounded-full ${
                            isClaimRejected && rejectionStepIndex >= 0
                              ? 'bg-gradient-to-r from-green-500 via-orange-400 to-red-600'
                              : 'bg-gradient-to-r from-green-500 via-green-400 to-[#005EB8]'
                          }`}
                          style={{ 
                            width: `${(completedCount / totalSteps) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    {/* Timeline Steps - Compact Vertical */}
                    <div className="relative pl-10">
                      {/* Left Timeline Line */}
                      <div className={`absolute left-[15px] top-0 bottom-0 w-0.5 ${
                        isClaimRejected && rejectionStepIndex >= 0
                          ? 'bg-gradient-to-b from-green-200 via-orange-200 to-red-200'
                          : 'bg-gradient-to-b from-green-200 via-[#005EB8]/20 to-gray-100'
                      }`} />
                      
                      {visibleSteps.map((step, index) => {
                        const isCompleted = step.status === 'completed';
                        const isCurrent = step.status === 'current';
                        const isPending = step.status === 'pending';
                        const isRejectionStep = index === rejectionStepIndex;
                        
                        return (
                    <div key={index} className="relative pb-4 last:pb-0">
                      {/* Timeline Node */}
                      <div className="absolute left-[-39px] top-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-3 border-white shadow-md transition-all ${
                          (isCompleted || isCurrent) && isRejectionStep ? 'bg-gradient-to-br from-red-500 to-red-600' :
                          isCompleted ? 'bg-gradient-to-br from-green-500 to-green-600' :
                          isCurrent ? 'bg-gradient-to-br from-[#005EB8] to-[#004a94] animate-pulse' :
                          'bg-gray-200'
                        }`}>
                          {(isCompleted || isCurrent) && isRejectionStep ? (
                            <X className="text-white" size={14} />
                          ) : isCompleted ? (
                            <CheckCircle className="text-white" size={14} />
                          ) : isCurrent ? (
                            <Circle className="text-white fill-white" size={8} />
                          ) : (
                            <Circle className="text-gray-400" size={8} />
                          )}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className={`rounded-lg p-3 transition-all border ${
                        (isCompleted || isCurrent) && isRejectionStep ? 'bg-red-50 border-red-400 shadow-sm' :
                        isCompleted ? 'bg-green-50/50 border-green-200' :
                        isCurrent ? 'bg-blue-50 border-[#005EB8] shadow-sm' :
                        'bg-gray-50/50 border-gray-200'
                      }`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                (isCompleted || isCurrent) && isRejectionStep ? 'bg-red-600 text-white' :
                                isCompleted ? 'bg-green-600 text-white' :
                                isCurrent ? 'bg-[#005EB8] text-white' :
                                'bg-gray-300 text-gray-600'
                              }`}>
                                {index + 1}
                              </span>
                              <div className={`text-sm ${
                                (isCompleted || isCurrent) && isRejectionStep ? 'text-red-900' :
                                isCompleted ? 'text-green-900' :
                                isCurrent ? 'text-[#005EB8]' :
                                'text-gray-500'
                              }`}>
                                {step.title}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 mt-1">
                              {step.date && (
                                <div className={`text-xs flex items-center gap-1 ${
                                  (isCompleted || isCurrent) && isRejectionStep ? 'text-red-600' :
                                  isCompleted ? 'text-green-600' :
                                  isCurrent ? 'text-[#005EB8]' :
                                  'text-gray-400'
                                }`}>
                                  <Clock size={10} />
                                  {step.date}
                                </div>
                              )}
                              
                              {step.description && (
                                <div className={`text-xs truncate ${
                                  (isCompleted || isCurrent) && isRejectionStep ? 'text-red-600' :
                                  isCompleted ? 'text-green-600' :
                                  isCurrent ? 'text-gray-600' :
                                  'text-gray-400'
                                }`}>
                                  {step.description}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Status Icon */}
                          {isCompleted && (
                            <div className="flex-shrink-0">
                              {isRejectionStep ? <X className="text-red-600" size={16} /> : <CheckCircle className="text-green-600" size={16} />}
                            </div>
                          )}
                          {isCurrent && (
                            <div className="flex-shrink-0">
                              <Activity className={isRejectionStep ? 'text-red-600' : 'text-[#005EB8]'} size={16} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </Card>

        {/* Claim Details */}
        <Card className="bg-white shadow-sm">
          <button
            onClick={() => toggleSection('details')}
            className="w-full p-5 flex items-center justify-between"
          >
            <h2 className="text-gray-900">Claim Details</h2>
            <ChevronDown 
              className={`text-gray-400 transition-transform ${expandedSections.details ? 'rotate-180' : ''}`}
              size={20}
            />
          </button>
          {expandedSections.details && (
            <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <User size={12} />
                    Member Name
                  </div>
                  <div className="text-sm text-gray-900">{claim.memberName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Member ID</div>
                  <div className="text-sm text-gray-900">{claim.memberId}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <FileText size={12} />
                  Policy Number
                </div>
                <div className="text-sm text-gray-900">{claim.policyNumber}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Calendar size={12} />
                    Admission
                  </div>
                  <div className="text-sm text-gray-900">{claim.admissionDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Calendar size={12} />
                    Discharge
                  </div>
                  <div className="text-sm text-gray-900">{claim.dischargeDate}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                  <Activity size={12} />
                  Treating Physician
                </div>
                <div className="text-sm text-gray-900">{claim.physician}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Diagnosis</div>
                <div className="text-sm text-gray-900">{claim.diagnosis}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Invoice Number</div>
                  <div className="text-sm text-gray-900">{claim.invoiceNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Building2 size={12} />
                    Provider
                  </div>
                  <div className="text-sm text-gray-900">{claim.provider}</div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Amount Breakdown */}
        <Card className="bg-white shadow-sm">
          <button
            onClick={() => toggleSection('amount')}
            className="w-full p-5 flex items-center justify-between"
          >
            <h2 className="text-gray-900">Amount Breakdown</h2>
            <ChevronDown 
              className={`text-gray-400 transition-transform ${expandedSections.amount ? 'rotate-180' : ''}`}
              size={20}
            />
          </button>
          {expandedSections.amount && (
            <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Total Claimed</div>
                <div className="text-gray-900">{claim.totalClaimed}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Eligible Amount</div>
                <div className="text-gray-900">{claim.eligibleAmount}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Approved Amount</div>
                <div className="text-green-600">{claim.approvedAmount}</div>
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Co-pay / Member Share</div>
                  <div className="text-sm text-orange-600">-{claim.copay}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Deductibles / Excess</div>
                  <div className="text-sm text-gray-900">{claim.deductible}</div>
                </div>
                {claim.nonCovered !== 'SAR 0' && (
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Non-Covered Items</div>
                      <div className="text-sm text-red-600">-{claim.nonCovered}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 italic">{claim.nonCoveredReason}</div>
                  </div>
                )}
              </div>
              
              {/* Visual Bar */}
              <div className="pt-3">
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="bg-green-500 h-full" style={{ width: '90%' }} />
                  <div className="bg-red-500 h-full" style={{ width: '10%' }} />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <span className="text-gray-600">Approved: 90%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                    <span className="text-gray-600">Non-covered: 10%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Updates Log */}
        <Card className="bg-white shadow-sm">
          <button
            onClick={() => toggleSection('updates')}
            className="w-full p-5 flex items-center justify-between"
          >
            <h2 className="text-gray-900">Updates Log</h2>
            <ChevronDown 
              className={`text-gray-400 transition-transform ${expandedSections.updates ? 'rotate-180' : ''}`}
              size={20}
            />
          </button>
          {expandedSections.updates && (
            <div className="px-5 pb-5 border-t border-gray-100 pt-4">
              <div className="space-y-3">
                {claim.updates.map((update, index) => (
                  <div key={index} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{update.message}</div>
                      <div className="text-xs text-gray-500 mt-1">{update.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Support Section */}
        <Card className="bg-white shadow-sm">
          <button
            onClick={() => toggleSection('support')}
            className="w-full p-5 flex items-center justify-between"
          >
            <h2 className="text-gray-900">Need Help?</h2>
            <ChevronDown 
              className={`text-gray-400 transition-transform ${expandedSections.support ? 'rotate-180' : ''}`}
              size={20}
            />
          </button>
          {expandedSections.support && (
            <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
              <button 
                onClick={() => onNavigate('ai-assistant')}
                className="w-full bg-[#005EB8] hover:bg-[#004A94] text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare size={18} />
                Chat Support
              </button>
              <a
                href="tel:920000123"
                className="w-full bg-white border-2 border-[#005EB8] text-[#005EB8] hover:bg-blue-50 p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Phone size={18} />
                Call Support
              </a>
              <button 
                onClick={() => onNavigate('claims-faqs')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <HelpCircle size={18} />
                Claims FAQs
              </button>
            </div>
          )}
        </Card>
          </>
        )}
      </main>

      {showUploadModal && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-5"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000 }}
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ zIndex: 10001 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 font-semibold text-lg">Upload New Claim</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Claim Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EB8] text-sm">
                  <option>Select claim type</option>
                  <option>Inpatient</option>
                  <option>Outpatient</option>
                  <option>Emergency</option>
                  <option>Dental</option>
                  <option>Optical</option>
                  <option>Pharmacy</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Service Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EB8] text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Provider/Hospital
                </label>
                <input
                  type="text"
                  placeholder="Enter provider name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EB8] text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Claim Amount (SAR)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EB8] text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Upload Documents
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const newFiles = Array.from(files).map((file) => ({
                        name: file.name,
                        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
                        type: file.type.includes('pdf') ? 'PDF' : 'Image'
                      }));
                      setUploadedFiles(prev => [...prev, ...newFiles]);
                    }
                  }}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#005EB8] hover:text-[#005EB8] transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={20} />
                  <span className="font-medium">Choose Files</span>
                </button>
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText size={16} className="text-[#005EB8] flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadedFiles([]);
                  }}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadedFiles([]);
                    onNavigate('ai-assistant');
                  }}
                  className="flex-1 py-3 px-4 bg-[#005EB8] text-white rounded-xl font-semibold hover:bg-[#004A94] transition-colors flex items-center justify-center gap-2"
                >
                  <Upload size={18} />
                  Submit Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
