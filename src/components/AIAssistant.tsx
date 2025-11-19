import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChatBot, ChatMessage } from './ChatBot';
import { Card } from './ui/card';
import { Upload, FileText, Check, AlertCircle, X } from 'lucide-react';

interface AIAssistantProps {
  onNavigate: (page: string) => void;
}

interface ClaimData {
  claimType?: string;
  serviceDate?: string;
  provider?: string;
  totalAmount?: string;
  diagnosis?: string;
  treatmentDetails?: string;
  bankName?: string;
  iban?: string;
  documents?: { name: string; size: string; type: string }[];
}

export function AIAssistant({ onNavigate }: AIAssistantProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startClaim = searchParams.get('claim') === 'true';

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (startClaim) {
      return [{
        id: '1',
        type: 'assistant',
        content: "👋 Hello Ahmed! I'm your Bupa Arabia Claims Assistant. I'll help you submit your reimbursement claim quickly and easily.\n\nLet's get started! What type of claim would you like to submit?",
        quickActions: [
          { label: 'Inpatient', action: 'Inpatient' },
          { label: 'Outpatient', action: 'Outpatient' },
          { label: 'Emergency', action: 'Emergency' },
          { label: 'Dental', action: 'Dental' },
          { label: 'Optical', action: 'Optical' },
          { label: 'Pharmacy', action: 'Pharmacy' }
        ],
        timestamp: new Date()
      }];
    }
    return [{
      id: '1',
      type: 'assistant',
      content: 'Hello Ahmed! 👋 How can I help you today?',
      quickActions: [
        { label: 'Book Consultation', action: 'consultation' },
        { label: 'Check Coverage', action: 'benefits' },
        { label: 'Submit Claim', action: 'submit' },
        { label: 'My Appointments', action: 'appointments' }
      ],
      timestamp: new Date()
    }];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(startClaim ? 0 : -1);
  const [claimData, setClaimData] = useState<ClaimData>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const invoiceInputRef = useRef<HTMLInputElement>(null);
  const reportInputRef = useRef<HTMLInputElement>(null);
  const additionalInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { field: 'claimType', question: 'What type of claim would you like to submit?', options: ['Inpatient', 'Outpatient', 'Emergency', 'Dental', 'Optical', 'Pharmacy'] },
    { field: 'serviceDate', question: 'When did you receive the medical service?', type: 'date' },
    { field: 'provider', question: 'Which healthcare provider did you visit?', placeholder: 'Enter hospital or clinic name' },
    { field: 'totalAmount', question: 'What was the total amount you paid?', placeholder: 'Enter amount in SAR (e.g., 1500)' },
    { field: 'diagnosis', question: 'What was the diagnosis or reason for treatment?', placeholder: 'Brief description' },
    { field: 'treatmentDetails', question: 'Could you briefly describe the treatment you received?', placeholder: 'Treatment details' },
    { field: 'bankName', question: 'Which bank should we transfer the reimbursement to?', options: ['Al Rajhi Bank', 'National Commercial Bank', 'Riyad Bank', 'SABB', 'Arab National Bank', 'Alinma Bank', 'Bank AlBilad', 'Saudi Investment Bank'] },
    { field: 'iban', question: 'What is your IBAN for the reimbursement?', placeholder: 'SA00 0000 0000 0000 0000 0000' },
    { field: 'documents', question: 'Great! Now I need you to upload the required documents:\n\n📄 Medical Invoice/Receipt (Required)\n📋 Medical Report/Prescription (Required)\n📎 Additional documents (Optional)\n\nPlease upload your documents.', type: 'upload' }
  ];

  const addBotMessage = (text: string, options?: string[], delay = 1000) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: text,
        timestamp: new Date(),
        quickActions: options?.map(opt => ({ label: opt, action: opt }))
      };
      setMessages(prev => [...prev, newMessage]);
      
      if (steps[currentStep]?.type === 'upload') {
        setShowUploadButton(true);
      }
    }, delay);
  };

  const addUserMessage = (text: string, attachments?: { name: string; size: string }[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
      attachments
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files as FileList).map((file: File) => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: docType
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      addUserMessage(
        `Uploaded ${docType}: ${newFiles.map(f => f.name).join(', ')}`,
        newFiles
      );
    }
  };

  const handleContinueAfterUpload = () => {
    const hasInvoice = uploadedFiles.some(f => f.type === 'Invoice');
    const hasReport = uploadedFiles.some(f => f.type === 'Medical Report');
    
    if (hasInvoice && hasReport) {
      setClaimData(prev => ({ ...prev, documents: uploadedFiles }));
      setShowUploadButton(false);
      
      addBotMessage(
        `Perfect! I've received all the information and documents. Let me submit your claim now... ✨`,
        undefined,
        1000
      );
      
      setTimeout(() => {
        addBotMessage(
          `✅ Claim Submitted Successfully!\n\nYour claim reference number is: CLM-2024-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}\n\n📊 Claim Summary:\n• Type: ${claimData.claimType}\n• Provider: ${claimData.provider}\n• Amount: SAR ${claimData.totalAmount}\n• Documents: ${uploadedFiles.length} uploaded\n\n⏱️ Expected processing time: 7-10 business days\n📧 You'll receive updates via SMS and email\n\nIs there anything else I can help you with?`,
          ['View Claim Status', 'Submit Another Claim', 'Back to Home'],
          2500
        );
      }, 2500);
    } else {
      const missingDocs: string[] = [];
      if (!hasInvoice) missingDocs.push('Medical Invoice');
      if (!hasReport) missingDocs.push('Medical Report');
      
      addBotMessage(
        `⚠️ Please upload the following required documents: ${missingDocs.join(' and ')}`,
        undefined,
        500
      );
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUserMessage = (message: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
  };

  const handleSendMessage = async (message: string): Promise<ChatMessage | null> => {
    const messageText = message.trim().toLowerCase();
    
    if (messageText.includes('submit') && messageText.includes('claim')) {
      setCurrentStep(0);
      setClaimData({});
      setUploadedFiles([]);
      setShowUploadButton(false);
      const claimMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "👋 Hello Ahmed! I'm your Bupa Arabia Claims Assistant. I'll help you submit your reimbursement claim quickly and easily.\n\nLet's get started! What type of claim would you like to submit?",
        quickActions: [
          { label: 'Inpatient', action: 'Inpatient' },
          { label: 'Outpatient', action: 'Outpatient' },
          { label: 'Emergency', action: 'Emergency' },
          { label: 'Dental', action: 'Dental' },
          { label: 'Optical', action: 'Optical' },
          { label: 'Pharmacy', action: 'Pharmacy' }
        ],
        timestamp: new Date()
      };
      setMessages([claimMessage]);
      return null;
    }

    if (currentStep >= 0 && currentStep < steps.length) {
      const currentStepData = steps[currentStep];
      
      if (currentStepData) {
        setClaimData(prev => ({ ...prev, [currentStepData.field]: message }));
      }

      if (message === 'View Claim Status') {
        setTimeout(() => onNavigate('claims'), 1000);
        return null;
      }
      if (message === 'Submit Another Claim') {
        setCurrentStep(0);
        setClaimData({});
        setUploadedFiles([]);
        setShowUploadButton(false);
        const claimMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'assistant',
          content: "👋 Great! Let's start a new claim. What type of claim would you like to submit?",
          quickActions: steps[0].options?.map(opt => ({ label: opt, action: opt })),
          timestamp: new Date()
        };
        setMessages([claimMessage]);
        return null;
      }
      if (message === 'Back to Home') {
        setTimeout(() => onNavigate('home'), 500);
        return null;
      }

      const nextStep = currentStep + 1;
      
      if (nextStep < steps.length) {
        setCurrentStep(nextStep);
        const nextStepData = steps[nextStep];
        
        const confirmations = [
          `Got it! ${message}`,
          `Perfect! ${message}`,
          `Thank you! ${message}`,
          `Noted: ${message}`,
          `Great! ${message}`
        ];
        
        if (nextStepData.type !== 'upload') {
          setTimeout(() => {
            addBotMessage(
              confirmations[Math.floor(Math.random() * confirmations.length)],
              undefined,
              800
            );
          }, 100);
        }
        
        setTimeout(() => {
          addBotMessage(
            nextStepData.question,
            nextStepData.options,
            nextStepData.type !== 'upload' ? 1500 : 1200
          );
        }, nextStepData.type !== 'upload' ? 800 : 500);
      }
    }

    return null;
  };

  const handleQuickAction = (action: string) => {
    if (action === 'submit') {
      setCurrentStep(0);
      setClaimData({});
      setUploadedFiles([]);
      setShowUploadButton(false);
      const claimMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "👋 Hello Ahmed! I'm your Bupa Arabia Claims Assistant. I'll help you submit your reimbursement claim quickly and easily.\n\nLet's get started! What type of claim would you like to submit?",
        quickActions: [
          { label: 'Inpatient', action: 'Inpatient' },
          { label: 'Outpatient', action: 'Outpatient' },
          { label: 'Emergency', action: 'Emergency' },
          { label: 'Dental', action: 'Dental' },
          { label: 'Optical', action: 'Optical' },
          { label: 'Pharmacy', action: 'Pharmacy' }
        ],
        timestamp: new Date()
      };
      setMessages([claimMessage]);
      return;
    }

    if (action === 'dashboard') {
      navigate('/home');
    } else if (['Inpatient', 'Outpatient', 'Emergency', 'Dental', 'Optical', 'Pharmacy'].includes(action) || 
               ['Al Rajhi Bank', 'National Commercial Bank', 'Riyad Bank', 'SABB', 'Arab National Bank', 'Alinma Bank', 'Bank AlBilad', 'Saudi Investment Bank'].includes(action)) {
      handleSendMessage(action);
    } else {
      navigate(`/${action}`);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  const uploadContent = showUploadButton ? (
    <Card className="bg-white p-4 shadow-lg max-w-md w-full">
      <div className="space-y-3">
        <input
          ref={invoiceInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(e, 'Invoice')}
          className="hidden"
        />
        <input
          ref={reportInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(e, 'Medical Report')}
          className="hidden"
        />
        <input
          ref={additionalInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(e, 'Additional Document')}
          className="hidden"
        />
        
        {(() => {
          const hasInvoice = uploadedFiles.some(f => f.type === 'Invoice');
          return (
            <button
              onClick={() => invoiceInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-lg p-3 flex items-center gap-3 transition-colors ${
                hasInvoice 
                  ? 'border-green-500 bg-green-50 hover:bg-green-100' 
                  : 'border-[#005EB8] hover:bg-blue-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                hasInvoice ? 'bg-green-100' : 'bg-[#005EB8]/10'
              }`}>
                {hasInvoice ? (
                  <Check className="text-green-600" size={20} />
                ) : (
                  <FileText className="text-[#005EB8]" size={20} />
                )}
              </div>
              <div className="text-left flex-1">
                <div className="text-sm text-gray-900 flex items-center gap-2">
                  Medical Invoice/Receipt
                  {hasInvoice && <span className="text-xs text-green-600">✓ Uploaded</span>}
                </div>
                <div className="text-xs text-gray-500">Required • PDF, JPG or PNG</div>
              </div>
              <Upload className={hasInvoice ? 'text-green-600' : 'text-[#005EB8]'} size={18} />
            </button>
          );
        })()}

        {(() => {
          const hasReport = uploadedFiles.some(f => f.type === 'Medical Report');
          return (
            <button
              onClick={() => reportInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-lg p-3 flex items-center gap-3 transition-colors ${
                hasReport 
                  ? 'border-green-500 bg-green-50 hover:bg-green-100' 
                  : 'border-[#005EB8] hover:bg-blue-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                hasReport ? 'bg-green-100' : 'bg-[#005EB8]/10'
              }`}>
                {hasReport ? (
                  <Check className="text-green-600" size={20} />
                ) : (
                  <FileText className="text-[#005EB8]" size={20} />
                )}
              </div>
              <div className="text-left flex-1">
                <div className="text-sm text-gray-900 flex items-center gap-2">
                  Medical Report/Prescription
                  {hasReport && <span className="text-xs text-green-600">✓ Uploaded</span>}
                </div>
                <div className="text-xs text-gray-500">Required • PDF, JPG or PNG</div>
              </div>
              <Upload className={hasReport ? 'text-green-600' : 'text-[#005EB8]'} size={18} />
            </button>
          );
        })()}

        {(() => {
          const additionalCount = uploadedFiles.filter(f => f.type === 'Additional Document').length;
          return (
            <button
              onClick={() => additionalInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-lg p-3 flex items-center gap-3 transition-colors ${
                additionalCount > 0
                  ? 'border-green-500 bg-green-50 hover:bg-green-100'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                additionalCount > 0 ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {additionalCount > 0 ? (
                  <Check className="text-green-600" size={20} />
                ) : (
                  <FileText className="text-gray-600" size={20} />
                )}
              </div>
              <div className="text-left flex-1">
                <div className="text-sm text-gray-900 flex items-center gap-2">
                  Additional Documents
                  {additionalCount > 0 && <span className="text-xs text-green-600">✓ {additionalCount} uploaded</span>}
                </div>
                <div className="text-xs text-gray-500">Optional • Multiple files allowed</div>
              </div>
              <Upload className={additionalCount > 0 ? 'text-green-600' : 'text-gray-600'} size={18} />
            </button>
          );
        })()}

        {uploadedFiles.length > 0 && (
          <div className="space-y-2 mt-4">
            <div className="text-xs text-gray-600 mb-2">
              Uploaded Files ({uploadedFiles.length})
              {uploadedFiles.filter(f => f.type === 'Invoice').length > 0 && uploadedFiles.filter(f => f.type === 'Medical Report').length > 0 && (
                <span className="ml-2 text-green-600">✓ Required documents uploaded</span>
              )}
            </div>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-green-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-[#005EB8] text-white rounded">{file.type}</span>
                    </div>
                    <div className="text-xs text-gray-900 mt-1">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.size}</div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {(() => {
          const hasInvoice = uploadedFiles.some(f => f.type === 'Invoice');
          const hasReport = uploadedFiles.some(f => f.type === 'Medical Report');
          const canContinue = hasInvoice && hasReport;
          
          return (
            <>
              {uploadedFiles.length > 0 && (
                <button
                  onClick={handleContinueAfterUpload}
                  disabled={!canContinue}
                  className={`w-full py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    canContinue
                      ? 'bg-[#005EB8] text-white hover:bg-[#004A94]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Check size={18} />
                  Continue with {uploadedFiles.length} document{uploadedFiles.length > 1 ? 's' : ''}
                </button>
              )}
              
              {uploadedFiles.length > 0 && !canContinue && (
                <div className="text-xs text-center text-orange-600 flex items-center justify-center gap-1">
                  <AlertCircle size={12} />
                  {!hasInvoice && !hasReport && 'Upload Invoice and Medical Report to continue'}
                  {hasInvoice && !hasReport && 'Upload Medical Report to continue'}
                  {!hasInvoice && hasReport && 'Upload Invoice to continue'}
                </div>
              )}
            </>
          );
        })()}
      </div>
    </Card>
  ) : null;

  return (
    <ChatBot
      messages={messages}
      onSendMessage={handleSendMessage}
      onUserMessage={handleUserMessage}
      onQuickAction={handleQuickAction}
      placeholder={currentStep >= 0 && steps[currentStep] ? (steps[currentStep].placeholder || "Type your message...") : "Ask me anything..."}
      mode={currentStep >= 0 ? "claims" : "general"}
      showVoiceButton={true}
      headerTitle={currentStep >= 0 ? "Claims Assistant" : "Bupa AI Assistant"}
      headerSubtitle="AI-Powered • Always here to help"
      onBack={handleBack}
      customContent={uploadContent}
      showInput={!showUploadButton}
    />
  );
}
