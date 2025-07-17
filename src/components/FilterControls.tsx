import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface FilterControlsProps {
  sections: FilterSection[];
  onFilterChange: (sectionId: string, optionId: string, checked: boolean) => void;
  selectedFilters: Record<string, string[]>;
}

const FilterControls: React.FC<FilterControlsProps> = ({ 
  sections, 
  onFilterChange, 
  selectedFilters 
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.map(s => s.id)
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const clearAllFilters = () => {
    sections.forEach(section => {
      section.options.forEach(option => {
        if (selectedFilters[section.id]?.includes(option.id)) {
          onFilterChange(section.id, option.id, false);
        }
      });
    });
  };

  const totalSelectedFilters = Object.values(selectedFilters).reduce(
    (total, filters) => total + filters.length, 0
  );

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        {totalSelectedFilters > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-orange-500 hover:underline"
          >
            Clear all ({totalSelectedFilters})
          </button>
        )}
      </div>

      {sections.map((section, index) => (
        <div key={section.id} className={`${index < sections.length - 1 ? 'border-b border-gray-100 pb-5 mb-6' : ''}`}>
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between mb-3"
          >
            <h4 className="text-sm font-semibold text-gray-700">{section.title}</h4>
            <div className="text-gray-400">
              {expandedSections.includes(section.id) ? '−' : '+'}
            </div>
          </button>
          
          {expandedSections.includes(section.id) && (
            <div className="space-y-2">
              {section.options.map(option => (
                <label key={option.id} className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFilters[section.id]?.includes(option.id) || false}
                    onChange={(e) => onFilterChange(section.id, option.id, e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                    {option.label}
                  </span>
                  {option.count && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 min-w-0">
                      {option.count}
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterControls;