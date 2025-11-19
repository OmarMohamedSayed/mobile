import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowLeft, Bot, User as UserIcon, FileText } from 'lucide-react';
import { Card } from './ui/card';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  quickActions?: QuickAction[];
  timestamp: Date;
  attachments?: { name: string; size: string }[];
}

export interface QuickAction {
  label: string;
  action: string;
}

export interface ChatBotProps {
  initialMessages?: ChatMessage[];
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => Promise<ChatMessage | null>;
  onUserMessage?: (message: string) => void;
  onQuickAction?: (action: string) => void;
  placeholder?: string;
  mode?: 'general' | 'claims' | 'custom';
  showVoiceButton?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  onBack?: () => void;
  customContent?: React.ReactNode;
  showHeader?: boolean;
  showInput?: boolean;
}

export function ChatBot({
  initialMessages = [],
  messages: controlledMessages,
  onSendMessage,
  onUserMessage,
  onQuickAction,
  placeholder = "Ask me anything...",
  mode = 'general',
  showVoiceButton = true,
  headerTitle = "Bupa AI Assistant",
  headerSubtitle = "● Online",
  onBack,
  customContent,
  showHeader = true,
  showInput = true
}: ChatBotProps) {

  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>(initialMessages);
  const messages = controlledMessages !== undefined ? controlledMessages : internalMessages;
  const setMessages = controlledMessages !== undefined ? () => {} : setInternalMessages;
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inputBarRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (messagesContainerRef.current && inputBarRef.current) {
        const headerHeight = showHeader && headerRef.current ? headerRef.current.offsetHeight : 0;
        const inputBarHeight = inputBarRef.current.offsetHeight;
        const availableHeight = window.innerHeight - headerHeight - inputBarHeight;
        messagesContainerRef.current.style.height = `${availableHeight}px`;
        messagesContainerRef.current.style.maxHeight = `${availableHeight}px`;
      }
    };

    const timer = setTimeout(() => {
      updateHeight();
      scrollToBottom();
    }, 100);

    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
    };
  }, [showHeader]);

  useEffect(() => {
    if (controlledMessages === undefined) {
      setInternalMessages(initialMessages);
    }
  }, [initialMessages, controlledMessages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => scrollToBottom(), 200);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const currentText = inputValue;
    setInputValue('');
    setIsTyping(true);

    if (controlledMessages !== undefined) {
      if (onUserMessage) {
        onUserMessage(currentText);
      }
    } else {
      setInternalMessages(prev => [...prev, userMsg]);
    }

    if (onSendMessage) {
      const res = await onSendMessage(currentText);
      setIsTyping(false);

    } else {
      setTimeout(() => {
        const msg: ChatMessage = {
          id: Date.now().toString(),
          type: 'assistant',
          content: `I understand you're asking about "${currentText}". How can I assist you further?`,
          timestamp: new Date(),
          quickActions: [{ label: "Main Menu", action: "dashboard" }]
        };
        setMessages(prev => [...prev, msg]);
        setIsTyping(false);
      }, 1200);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setInputValue("Book a consultation with a dermatologist");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50" style={{ height: '100vh', overflow: 'hidden' }}>

      {/* HEADER */}
      {showHeader && (
        <header ref={headerRef} className="flex-shrink-0 bg-gradient-to-br from-[#005EB8] to-[#004A94] px-5 py-4 shadow-lg z-10">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors -ml-2"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bot className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-white font-semibold">{headerTitle}</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-white/90 text-xs">{headerSubtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* MESSAGES SCROLL AREA */}
      <div
        ref={messagesContainerRef}
        className="overflow-y-auto overflow-x-hidden px-4 py-5 space-y-4 min-h-0"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.type === 'assistant' 
                ? 'bg-gradient-to-br from-[#005EB8] to-[#004A94]' 
                : 'bg-gray-300'
            }`}>
              {msg.type === 'assistant' ? (
                <Bot className="text-white" size={18} />
              ) : (
                <UserIcon className="text-gray-600" size={18} />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex flex-col gap-2 max-w-[75%] ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
              <Card className={`p-3 shadow-sm ${
                msg.type === 'assistant' 
                  ? 'bg-white border border-gray-200' 
                  : 'bg-[#005EB8] border-none'
              }`}>
                <p className={`text-sm whitespace-pre-line ${
                  msg.type === 'assistant' ? 'text-gray-800' : 'text-white'
                }`}>
                  {msg.content}
                </p>
                
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {msg.attachments.map((file, idx) => (
                      <div key={idx} className={`flex items-center gap-2 rounded px-2 py-1 ${
                        msg.type === 'assistant' ? 'bg-gray-100' : 'bg-white/10'
                      }`}>
                        <FileText size={14} className={msg.type === 'assistant' ? 'text-gray-600' : 'text-white'} />
                        <span className={`text-xs ${msg.type === 'assistant' ? 'text-gray-600' : 'text-white'}`}>{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Quick Actions */}
              {msg.quickActions && msg.type === 'assistant' && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {msg.quickActions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => onQuickAction?.(q.action)}
                      className="px-3 py-1.5 bg-white border-2 border-[#005EB8] text-[#005EB8] rounded-full text-sm hover:bg-[#005EB8] hover:text-white transition-all shadow-sm"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-400 px-1">
                {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* TYPING */}
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

        {/* CUSTOM CONTENT */}
        {customContent && (
          <div className="flex justify-center">
            {customContent}
          </div>
        )}
      </div>

      {/* INPUT BAR FIXED */}
      {showInput && (
      <div ref={inputBarRef} className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          {showVoiceButton && (
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-xl transition-all ${
                isRecording 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mic size={20} />
            </button>
          )}

          <div className="flex-1 relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={placeholder}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005EB8] text-sm"
            />
          </div>

          <button
            disabled={!inputValue.trim()}
            onClick={handleSendMessage}
            className={`p-3 rounded-xl transition-all ${
              inputValue.trim()
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
