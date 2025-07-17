import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

interface NotificationBarProps {
  message: string;
  ctaText?: string;
  ctaAction?: () => void;
  type?: 'info' | 'warning' | 'success' | 'error';
}

const NotificationBar: React.FC<NotificationBarProps> = ({ 
  message, 
  ctaText, 
  ctaAction, 
  type = 'info' 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const getBackgroundColor = () => {
    switch (type) {
      case 'warning': return 'bg-yellow-500';
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-700';
      default: return 'bg-orange-500';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`w-full ${getBackgroundColor()} text-white py-3 px-4 animate-slide-down`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="w-5 h-5 text-white/80" />
          <span className="text-sm font-medium">{message}</span>
          {ctaText && (
            <button
              onClick={ctaAction}
              className="text-sm font-semibold underline hover:no-underline transition-all duration-200"
            >
              {ctaText}
            </button>
          )}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBar;