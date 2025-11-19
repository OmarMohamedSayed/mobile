import { useState } from 'react';
import { ChevronRight, Video, FileText, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Video,
      title: 'Digital Consultation',
      description: 'Connect with qualified doctors anytime, anywhere through video or audio calls',
      color: '#005EB8'
    },
    {
      icon: FileText,
      title: 'Manage Your Claims',
      description: 'Submit and track your medical claims easily with our AI-powered assistant',
      color: '#00A3E0'
    },
    {
      icon: Heart,
      title: 'Full Insurance Overview',
      description: 'View your benefits, coverage limits, and hospital network all in one place',
      color: '#0091EA'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const Icon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip Button */}
      <div className="pt-6 px-6 flex justify-end">
        <button 
          onClick={handleSkip}
          className="text-gray-500 text-sm"
        >
          Skip
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        <div 
          className="w-32 h-32 rounded-3xl flex items-center justify-center mb-8 transition-all duration-300"
          style={{ backgroundColor: `${slides[currentSlide].color}20` }}
        >
          <Icon size={64} style={{ color: slides[currentSlide].color }} />
        </div>

        <h2 className="text-2xl text-gray-900 text-center mb-4">
          {slides[currentSlide].title}
        </h2>
        
        <p className="text-gray-600 text-center max-w-sm">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-[#005EB8]' 
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="px-6 pb-8">
        <Button 
          onClick={handleNext}
          className="w-full bg-[#005EB8] hover:bg-[#004A94] text-white py-6"
        >
          {currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}
          <ChevronRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
}
