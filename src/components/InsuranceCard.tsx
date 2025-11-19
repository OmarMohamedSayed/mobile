import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Download, Share2, QrCode, Shield, Calendar, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { QRCodeSVG } from 'qrcode.react';

interface InsuranceCardProps {
  onNavigate: (page: string) => void;
}

export function InsuranceCard({ onNavigate }: InsuranceCardProps) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const cardInfo = {
    memberId: '20000001',
    name: 'Ahmed Mohammed',
    plan: 'Premium',
    expiryDate: 'Dec 31, 2025',
    iqama: '100001010',
    network: 'Bupa Arabia Network'
  };

  const qrCodeData = JSON.stringify({
    memberId: cardInfo.memberId,
    name: cardInfo.name,
    iqama: cardInfo.iqama,
    plan: cardInfo.plan,
    expiryDate: cardInfo.expiryDate
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('profile')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-semibold">Insurance Card</h1>
            <p className="text-xs text-gray-500">Your digital insurance card</p>
          </div>
        </div>
      </header>

      <div className="px-5 py-6">
        <div className="mb-6">
          <Card className="bg-gradient-to-br from-[#005EB8] to-[#004A94] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-white/80 text-xs mb-1">Bupa Arabia</div>
                  <div className="text-white text-2xl font-bold mb-2">{cardInfo.name}</div>
                  <Badge className="bg-white/20 text-white border-0">
                    <Shield size={12} className="mr-1" />
                    {cardInfo.plan} Plan
                  </Badge>
                </div>
                <button
                  onClick={() => setShowQRCode(true)}
                  className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <QrCode size={32} className="text-white" />
                </button>
              </div>

              <div className="border-t border-white/20 pt-4 space-y-3">
                <div>
                  <div className="text-white/80 text-xs mb-1">Member ID</div>
                  <div className="text-white text-lg font-semibold">{cardInfo.memberId}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/80 text-xs mb-1">IQAMA</div>
                    <div className="text-white text-sm">{cardInfo.iqama}</div>
                  </div>
                  <div>
                    <div className="text-white/80 text-xs mb-1 flex items-center gap-1">
                      <Calendar size={12} />
                      Valid Until
                    </div>
                    <div className="text-white text-sm">{cardInfo.expiryDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Download className="text-[#005EB8]" size={20} />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900 font-medium">Download Card</div>
              <div className="text-xs text-gray-500">Save as PDF or image</div>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Share2 className="text-green-600" size={20} />
            </div>
            <div className="flex-1 text-left">
              <div className="text-gray-900 font-medium">Share Card</div>
              <div className="text-xs text-gray-500">Share via message or email</div>
            </div>
          </button>
        </div>

        <Card className="p-4 bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="text-[#005EB8] flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-gray-900 font-semibold text-sm mb-1">Network Coverage</h3>
              <p className="text-xs text-gray-600">
                Your card is valid at all {cardInfo.network} hospitals and clinics across Saudi Arabia.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {showQRCode && mounted && createPortal(
        <div
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-5"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000 }}
          onClick={() => setShowQRCode(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            style={{ zIndex: 10001 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 font-semibold text-lg">Insurance Card QR Code</h3>
              <button
                onClick={() => setShowQRCode(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl mb-4">
              <QRCodeSVG
                value={qrCodeData}
                size={240}
                level="H"
                includeMargin={true}
                fgColor="#005EB8"
              />
            </div>

            <div className="text-center space-y-2 mb-4">
              <p className="text-sm text-gray-600">Member ID: {cardInfo.memberId}</p>
              <p className="text-xs text-gray-500">
                Scan this QR code at hospitals or clinics to verify your insurance
              </p>
            </div>

            <button
              onClick={() => setShowQRCode(false)}
              className="w-full py-3 px-4 bg-[#005EB8] text-white rounded-xl font-semibold hover:bg-[#004A94] transition-colors"
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

