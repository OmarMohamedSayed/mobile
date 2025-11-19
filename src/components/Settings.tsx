import { ArrowLeft, Bell, Moon, Globe, Shield, Lock, Info, FileText, HelpCircle } from 'lucide-react';
import { Card } from './ui/card';
import { useState } from 'react';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          value: notifications,
          type: 'toggle',
          action: () => setNotifications(!notifications)
        },
        {
          icon: Moon,
          label: 'Dark Mode',
          value: darkMode,
          type: 'toggle',
          action: () => setDarkMode(!darkMode)
        },
        {
          icon: Globe,
          label: 'Language',
          value: language,
          type: 'select',
          action: () => {}
        }
      ]
    },
    {
      title: 'Security',
      items: [
        {
          icon: Lock,
          label: 'Change Password',
          type: 'action',
          action: () => {}
        },
        {
          icon: Shield,
          label: 'Two-Factor Authentication',
          value: false,
          type: 'toggle',
          action: () => {}
        }
      ]
    },
    {
      title: 'About',
      items: [
        {
          icon: FileText,
          label: 'Terms & Conditions',
          type: 'action',
          action: () => {}
        },
        {
          icon: Shield,
          label: 'Privacy Policy',
          type: 'action',
          action: () => {}
        },
        {
          icon: Info,
          label: 'App Version',
          value: '1.0.0',
          type: 'info'
        },
        {
          icon: HelpCircle,
          label: 'Help & Support',
          type: 'action',
          action: () => {}
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('profile')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-semibold">Settings</h1>
            <p className="text-xs text-gray-500">Manage your preferences</p>
          </div>
        </div>
      </header>

      <div className="px-5 py-6">
        {settingsGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-6">
            <h2 className="text-gray-900 font-semibold mb-3 text-sm uppercase tracking-wide">
              {group.title}
            </h2>
            <Card className="divide-y">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={itemIdx}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="text-[#005EB8]" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 font-medium">{item.label}</div>
                      {item.value && typeof item.value === 'string' && (
                        <div className="text-xs text-gray-500 mt-0.5">{item.value}</div>
                      )}
                    </div>
                    {item.type === 'toggle' && (
                      <button
                        onClick={item.action}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          item.value ? 'bg-[#005EB8]' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                          style={{ marginTop: '2px' }}
                        />
                      </button>
                    )}
                    {item.type === 'select' && (
                      <button
                        onClick={item.action}
                        className="text-[#005EB8] text-sm font-medium"
                      >
                        {item.value} ▼
                      </button>
                    )}
                    {item.type === 'action' && (
                      <button className="text-gray-400">
                        →
                      </button>
                    )}
                    {item.type === 'info' && (
                      <span className="text-gray-500 text-sm">{item.value}</span>
                    )}
                  </div>
                );
              })}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

