import React from 'react';
import { Calendar, Clock, MapPin, Users, Target, BookOpen, AlertCircle, Star } from 'lucide-react';

interface Workshop {
  id: string;
  title: string;
  type: 'ETP' | 'APA';
  level: string;
  objectives: string[];
  description: string;
  prerequisites: string[];
  duration: string;
  location: string;
  availableSlots: { date: string; time: string; spots: number }[];
  price: number;
  testimonials?: { name: string; comment: string; rating: number }[];
}

interface WorkshopDetailsProps {
  workshop: Workshop;
  selectedSlot: string | null;
  onSlotSelect: (slotId: string) => void;
  onContinue: () => void;
}

const WorkshopDetails: React.FC<WorkshopDetailsProps> = ({ 
  workshop, 
  selectedSlot, 
  onSlotSelect, 
  onContinue 
}) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* En-tête atelier */}
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 text-sm font-medium ${
                workshop.type === 'ETP' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {workshop.type}
              </span>
              <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800">
                {workshop.level}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{workshop.title}</h1>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {workshop.duration}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {workshop.location}
              </div>
            </div>
          </div>

          {/* Objectifs */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-500" />
              Objectifs de l'atelier
            </h2>
            <ul className="space-y-2">
              {workshop.objectives.map((objective, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Déroulement */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-orange-500" />
              Déroulement
            </h2>
            <p className="text-gray-700 leading-relaxed">{workshop.description}</p>
          </div>

          {/* Prérequis */}
          {workshop.prerequisites.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                Prérequis
              </h2>
              <ul className="space-y-2">
                {workshop.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Témoignages */}
          {workshop.testimonials && workshop.testimonials.length > 0 && (
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-orange-500" />
                Témoignages de familles
              </h2>
              <div className="space-y-4">
                {workshop.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">{testimonial.name}</span>
                    </div>
                    <p className="text-gray-600 text-sm italic">"{testimonial.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Calendrier et inscription */}
        <div className="space-y-6">
          {/* Créneaux disponibles */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-orange-500" />
              Créneaux disponibles
            </h2>
            
            <div className="space-y-3">
              {workshop.availableSlots.map((slot, index) => {
                const slotId = `${slot.date}-${slot.time}`;
                const isSelected = selectedSlot === slotId;
                const isAvailable = slot.spots > 0;
                
                return (
                  <button
                    key={index}
                    onClick={() => isAvailable && onSlotSelect(slotId)}
                    disabled={!isAvailable}
                    className={`w-full p-3 text-left border transition-all duration-200 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50'
                        : isAvailable
                          ? 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                          : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{slot.date}</div>
                        <div className="text-sm text-gray-600">{slot.time}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          isAvailable ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {isAvailable ? `${slot.spots} places` : 'Complet'}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tarif */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tarif</h3>
            <div className="text-2xl font-bold text-orange-600 mb-2">{workshop.price}€</div>
            <p className="text-sm text-gray-600">
              Tarif selon quotient familial CAF
            </p>
          </div>

          {/* Bouton continuer */}
          <button
            onClick={onContinue}
            disabled={!selectedSlot}
            className={`w-full py-3 px-4 font-medium transition-all duration-200 ${
              selectedSlot
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuer l'inscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetails;