import React from 'react';
import { Calendar, MapPin, Users, Euro } from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  type: 'ETP' | 'APA';
  level: string;
  startDate: string;
  endDate: string;
  location: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
  quotientFamilial: number;
}

interface WorkshopCardProps {
  workshop: Workshop;
  onRegister: (workshopId: string) => void;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, onRegister }) => {
  const isAvailable = workshop.availableSpots > 0;
  const isFull = workshop.availableSpots === 0;
  
  const getTypeColor = (type: string) => {
    return type === 'ETP' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const calculatePrice = () => {
    // Simulation calcul selon quotient familial
    if (workshop.quotientFamilial < 500) return Math.round(workshop.price * 0.3);
    if (workshop.quotientFamilial < 1000) return Math.round(workshop.price * 0.5);
    if (workshop.quotientFamilial < 1500) return Math.round(workshop.price * 0.7);
    return workshop.price;
  };

  return (
    <div className="bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium ${getTypeColor(workshop.type)}`}>
            {workshop.type}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800">
            {workshop.level}
          </span>
        </div>
        <div className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
          {isAvailable ? `${workshop.availableSpots} places` : 'Complet'}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {workshop.title}
      </h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          Du {workshop.startDate} au {workshop.endDate}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {workshop.location}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          {workshop.availableSpots}/{workshop.totalSpots} places disponibles
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Euro className="w-4 h-4 mr-2" />
          {calculatePrice()}€ (selon quotient familial)
        </div>
      </div>

      <button
        onClick={() => onRegister(workshop.id)}
        disabled={isFull}
        className={`w-full py-2 px-4 text-sm font-medium transition-colors duration-200 ${
          isFull
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        {isFull ? 'Complet' : "S'inscrire"}
      </button>
    </div>
  );
};

export default WorkshopCard;