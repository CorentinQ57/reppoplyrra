import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="py-4 border-b border-gray-200">
      <div className="flex items-center space-x-2 text-sm">
        <button className="text-gray-400 hover:text-orange-500 transition-colors duration-200">
          <Home className="w-4 h-4" />
        </button>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            {item.isActive ? (
              <span className="text-gray-900 font-medium">{item.label}</span>
            ) : (
              <button className="text-gray-500 hover:text-orange-500 hover:underline transition-colors duration-200">
                {item.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumbs;