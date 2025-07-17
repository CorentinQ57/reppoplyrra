import React from 'react';
import { User, Edit, Settings, Share } from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
    stats: {
      projects: number;
      tasks: number;
      completed: number;
    };
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="bg-white border border-gray-200 p-8 shadow-sm">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <div className="w-30 h-30 bg-gray-200 flex items-center justify-center shadow-md">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white border-2 border-gray-200 flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500"></div>
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ letterSpacing: '-0.05em' }}>
            {user.name}
          </h2>
          <p className="text-base text-orange-500 font-medium mb-4">{user.role}</p>
          
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">{user.stats.projects}</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">{user.stats.tasks}</div>
              <div className="text-sm text-gray-500">Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">{user.stats.completed}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button className="flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors duration-200">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
              <Share className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;