import React from 'react';
import { Filter, MapPin } from 'lucide-react';

interface WorkshopFiltersProps {
  selectedType: 'all' | 'ETP' | 'APA';
  selectedAgeRange: string;
  selectedLocation: string;
  onTypeChange: (type: 'all' | 'ETP' | 'APA') => void;
  onAgeRangeChange: (range: string) => void;
  onLocationChange: (location: string) => void;
}

const WorkshopFilters: React.FC<WorkshopFiltersProps> = ({
  selectedType,
  selectedAgeRange,
  selectedLocation,
  onTypeChange,
  onAgeRangeChange,
  onLocationChange
}) => {
  const ageRanges = [
    { value: 'all', label: 'Tous âges' },
    { value: '3-6', label: '3-6 ans' },
    { value: '7-11', label: '7-11 ans' },
    { value: '12-17', label: '12-17 ans' }
  ];

  const departments = [
    { value: 'all', label: 'Tous départements' },
    { value: '31', label: 'Haute-Garonne (31)' },
    { value: '09', label: 'Ariège (09)' },
    { value: '12', label: 'Aveyron (12)' },
    { value: '32', label: 'Gers (32)' },
    { value: '46', label: 'Lot (46)' },
    { value: '65', label: 'Hautes-Pyrénées (65)' },
    { value: '81', label: 'Tarn (81)' },
    { value: '82', label: 'Tarn-et-Garonne (82)' }
  ];

  return (
    <div className="bg-white border border-gray-200 p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-gray-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Type d'atelier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d'atelier
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => onTypeChange('all')}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedType === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => onTypeChange('ETP')}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedType === 'ETP'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ETP
            </button>
            <button
              onClick={() => onTypeChange('APA')}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedType === 'APA'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              APA
            </button>
          </div>
        </div>

        {/* Tranche d'âge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tranche d'âge
          </label>
          <select
            value={selectedAgeRange}
            onChange={(e) => onAgeRangeChange(e.target.value)}
            className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {ageRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Localisation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Département
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {departments.map(dept => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default WorkshopFilters;