import React from 'react';
import { TrendingUp, Users, FileText, Calendar, Activity, ArrowUp, ArrowDown } from 'lucide-react';

interface DashboardProps {
  stats: {
    revenue: { value: string; change: number };
    users: { value: string; change: number };
    projects: { value: string; change: number };
    tasks: { value: string; change: number };
  };
  activities: Array<{
    id: string;
    type: string;
    description: string;
    time: string;
    user: string;
  }>;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, activities }) => {
  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon 
  }: { 
    title: string; 
    value: string; 
    change: number; 
    icon: React.ElementType;
  }) => (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase" style={{ letterSpacing: '0.02em' }}>
          {title}
        </h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="flex items-center text-sm">
        {change > 0 ? (
          <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={change > 0 ? 'text-green-500' : 'text-red-500'}>
          {Math.abs(change)}%
        </span>
        <span className="text-gray-500 ml-1">vs last month</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Revenue"
        value={stats.revenue.value}
        change={stats.revenue.change}
        icon={TrendingUp}
      />
      <StatCard
        title="Users"
        value={stats.users.value}
        change={stats.users.change}
        icon={Users}
      />
      <StatCard
        title="Projects"
        value={stats.projects.value}
        change={stats.projects.change}
        icon={FileText}
      />
      <StatCard
        title="Tasks"
        value={stats.tasks.value}
        change={stats.tasks.change}
        icon={Calendar}
      />
      
      {/* Recent Activity Widget */}
      <div className="md:col-span-2 lg:col-span-4 bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-xs text-orange-500 hover:underline">
            View all
          </button>
        </div>
        
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-center space-x-3 py-2">
              <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
                <Activity className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;