import React, { useState } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  childName: string;
  childAge: number;
}

const Header: React.FC<HeaderProps> = ({ childName, childAge }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo et nom enfant */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-xl font-semibold text-gray-900">RéPPOP</span>
          </div>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Bonjour {childName} - {childAge} ans
            </h1>
          </div>
        </div>

        {/* Menu profil */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50">
              <div className="py-1">
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="w-4 h-4 mr-3" />
                  Paramètres
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <LogOut className="w-4 h-4 mr-3" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;