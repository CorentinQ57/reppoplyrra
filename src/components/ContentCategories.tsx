import React from 'react';
import { Folder, FileText, Image, Video, Music, Archive } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ElementType;
  isActive?: boolean;
}

interface ContentCategoriesProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

const ContentCategories: React.FC<ContentCategoriesProps> = ({ 
  categories, 
  onCategorySelect 
}) => {
  const defaultCategories: Category[] = [
    { id: 'all', name: 'All Categories', count: 0, icon: Folder, isActive: true },
    { id: 'documents', name: 'Documents', count: 45, icon: FileText },
    { id: 'images', name: 'Images', count: 123, icon: Image },
    { id: 'videos', name: 'Videos', count: 28, icon: Video },
    { id: 'audio', name: 'Audio', count: 67, icon: Music },
    { id: 'archives', name: 'Archives', count: 12, icon: Archive },
  ];

  const allCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">Categories</h3>
      
      <div className="space-y-2">
        {allCategories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full flex items-center justify-between p-3 text-left transition-colors duration-200 ${
              category.isActive
                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <category.icon className="w-4 h-4 mr-3 text-gray-500" />
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 min-w-0">
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentCategories;