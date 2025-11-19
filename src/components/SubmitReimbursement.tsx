import { ArrowLeft, Send, Bot, User as UserIcon, Upload, FileText, Check, AlertCircle, Sparkles, Paperclip, X } from 'lucide-react';
import { Card } from './ui/card';
import { useState, useRef, useEffect } from 'react';

interface SubmitReimbursementProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  options?: string[];
  isTyping?: boolean;
  attachments?: { name: string; size: string }[];
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

export function SubmitReimbursement({ onNavigate }: SubmitReimbursementProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "👋 Hello Ahmed! I'm your Bupa Arabia Claims Assistant. I'll help you submit your reimbursement claim quickly and easily.\n\nLet's get started! What type of claim would you like to submit?",
      timestamp: new Date(),
      options: ['Inpatient', 'Outpatient', 'Emergency', 'Dental', 'Optical', 'Pharmacy']
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [claimData, setClaimData] = useState<ClaimData>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string, options?: string[], delay = 1000) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        text,
        timestamp: new Date(),
        options
      };
      setMessages(prev => [...prev, newMessage]);
      
      if (steps[currentStep]?.type === 'upload') {
        setShowUploadButton(true);
      }
    }, delay);
  };

  const addUserMessage = (text: string, attachments?: { name: string; size: string }[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
      attachments
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
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
      
      // Submit the claim
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
      const missingDocs = [];
      if (!hasInvoice) missingDocs.push('Medical Invoice');
      if (!hasReport) missingDocs.push('Medical Report');
      
      addBotMessage(
        `⚠️ Please upload the following required documents: ${missingDocs.join(' and ')}`,
        undefined,
        500
      );
    }
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText && !text) return;

    addUserMessage(messageText);
    setInputText('');

    const currentStepData = steps[currentStep];
    
    // Save the data
    if (currentStepData) {
      setClaimData(prev => ({ ...prev, [currentStepData.field]: messageText }));
    }

    // Handle special responses
    if (messageText === 'View Claim Status') {
      setTimeout(() => onNavigate('claims'), 1000);
      return;
    }
    if (messageText === 'Submit Another Claim') {
      window.location.reload();
      return;
    }
    if (messageText === 'Back to Home') {
      setTimeout(() => onNavigate('home'), 500);
      return;
    }

    // Move to next step
    const nextStep = currentStep + 1;
    
    if (nextStep < steps.length) {
      setCurrentStep(nextStep);
      const nextStepData = steps[nextStep];
      
      // Add confirmation message for current answer
      const confirmations = [
        `Got it! ${messageText}`,
        `Perfect! ${messageText}`,
        `Thank you! ${messageText}`,
        `Noted: ${messageText}`,
        `Great! ${messageText}`
      ];
      
      if (nextStepData.type !== 'upload') {
        addBotMessage(
          confirmations[Math.floor(Math.random() * confirmations.length)],
          undefined,
          800
        );
      }
      
      // Ask next question
      setTimeout(() => {
        addBotMessage(
          nextStepData.question,
          nextStepData.options,
          nextStepData.type !== 'upload' ? 1500 : 1200
        );
      }, nextStepData.type !== 'upload' ? 800 : 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#005EB8] to-[#004A94] px-5 py-4 shadow-lg flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors -ml-2"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bot className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-white">Claims Assistant</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-white/90 text-xs">AI-Powered • Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'bot' 
                ? 'bg-gradient-to-br from-[#005EB8] to-[#004A94]' 
                : 'bg-gray-300'
            }`}>
              {message.sender === 'bot' ? (
                <Bot className="text-white" size={18} />
              ) : (
                <UserIcon className="text-gray-600" size={18} />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex flex-col gap-2 max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <Card className={`p-3 shadow-sm ${
                message.sender === 'bot' 
                  ? 'bg-white border border-gray-200' 
                  : 'bg-[#005EB8] border-none'
              }`}>
                <p className={`text-sm whitespace-pre-line ${
                  message.sender === 'bot' ? 'text-gray-800' : 'text-white'
                }`}>
                  {message.text}
                </p>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/10 rounded px-2 py-1">
                        <FileText size={14} className="text-white" />
                        <span className="text-xs text-white">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Options Buttons */}
              {message.options && message.sender === 'bot' && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="px-3 py-1.5 bg-white border-2 border-[#005EB8] text-[#005EB8] rounded-full text-sm hover:bg-[#005EB8] hover:text-white transition-all shadow-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-400 px-1">
                {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#005EB8] to-[#004A94] flex items-center justify-center flex-shrink-0">
              <Bot className="text-white" size={18} />
            </div>
            <Card className="p-3 bg-white border border-gray-200 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </Card>
          </div>
        )}

        {/* Upload Section */}
        {showUploadButton && (
          <div className="flex justify-center">
            <Card className="bg-white p-4 shadow-lg max-w-md w-full">
              <div className="space-y-3">
                {/* Hidden File Inputs */}
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
                
                {/* Invoice Upload Button */}
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

                {/* Medical Report Upload Button */}
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

                {/* Additional Documents Upload Button */}
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

                {/* Uploaded Files */}
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

                {/* Continue Button */}
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
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      {!showUploadButton && (
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-end gap-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={steps[currentStep]?.placeholder || "Type your message..."}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EB8] text-sm"
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className={`p-3 rounded-xl transition-all ${
                inputText.trim()
                  ? 'bg-[#005EB8] hover:bg-[#004A94] text-white shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            Powered by Bupa AI • Your data is secure and encrypted
          </p>
        </div>
      )}
    </div>
  );
}
