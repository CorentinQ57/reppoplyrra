import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Bell, 
  Search, 
  Mail, 
  Calendar, 
  Folder, 
  ChevronDown, 
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const navigationSections = [
    {
      id: 'main',
      title: 'MAIN',
      items: [
        { icon: Home, label: 'Dashboard', isActive: true },
        { icon: BarChart3, label: 'Analytics' },
        { icon: Users, label: 'Users' },
        { icon: FileText, label: 'Reports' },
      ]
    },
    {
      id: 'workspace',
      title: 'WORKSPACE',
      items: [
        { icon: Folder, label: 'Projects' },
        { icon: Calendar, label: 'Calendar' },
        { icon: Mail, label: 'Messages' },
        { icon: Bell, label: 'Notifications' },
      ]
    },
    {
      id: 'settings',
      title: 'SETTINGS',
      items: [
        { icon: Settings, label: 'Preferences' },
        { icon: User, label: 'Profile' },
        { icon: Search, label: 'Search' },
      ]
    }
  ];

  return (
    <div className={`h-screen bg-white border-r border-gray-200 sticky top-0 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-280'
    }`}>
      {/* Header */}
      <div className="h-16 px-6 flex items-center border-b border-gray-100">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900" style={{ letterSpacing: '-0.05em' }}>
              SaaS Pro
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {navigationSections.map(section => (
          <div key={section.id} className="mb-6">
            {!isCollapsed && (
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-400 uppercase hover:text-gray-600 transition-colors"
                style={{ letterSpacing: '0.02em' }}
              >
                {section.title}
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            )}
            
            {(isCollapsed || expandedSections.includes(section.id)) && (
              <div className="space-y-1">
                {section.items.map(item => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      item.isActive
                        ? 'bg-blue-50 text-blue-600 border-l-3 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          {!isCollapsed && (
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">john@company.com</div>
            </div>
          )}
          {!isCollapsed && (
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;