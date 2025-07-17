import React, { useState } from 'react';
import { Clock, CheckCircle, Archive, Calendar, Euro, Star } from 'lucide-react';

interface Registration {
  id: string;
  workshopTitle: string;
  type: 'ETP' | 'APA';
  status: 'pending' | 'validated' | 'completed';
  registrationDate: string;
  workshopDate?: string;
  price?: number;
  evaluationDone?: boolean;
}

interface RegistrationTabsProps {
  registrations: Registration[];
  onPayment: (registrationId: string) => void;
  onEvaluation: (registrationId: string) => void;
}

const RegistrationTabs: React.FC<RegistrationTabsProps> = ({ 
  registrations, 
  onPayment, 
  onEvaluation 
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'validated' | 'completed'>('pending');

  const filteredRegistrations = registrations.filter(reg => reg.status === activeTab);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'validated': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed': return <Archive className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-l-orange-500 bg-orange-50';
      case 'validated': return 'border-l-green-500 bg-green-50';
      case 'completed': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-300';
    }
  };

  const getTabCount = (status: string) => {
    return registrations.filter(reg => reg.status === status).length;
  };

  return (
    <div className="bg-white border border-gray-200">
      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'pending'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            En attente ({getTabCount('pending')})
          </button>
          
          <button
            onClick={() => setActiveTab('validated')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'validated'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Validées ({getTabCount('validated')})
          </button>
          
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'completed'
                ? 'border-gray-500 text-gray-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Terminées ({getTabCount('completed')})
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="p-6">
        {filteredRegistrations.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              {getStatusIcon(activeTab)}
            </div>
            <p className="text-gray-500">
              Aucune inscription {activeTab === 'pending' ? 'en attente' : 
                                 activeTab === 'validated' ? 'validée' : 'terminée'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map(registration => (
              <div
                key={registration.id}
                className={`border-l-4 p-4 ${getStatusColor(registration.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(registration.status)}
                      <h4 className="font-semibold text-gray-900">
                        {registration.workshopTitle}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium ${
                        registration.type === 'ETP' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {registration.type}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Inscription le {registration.registrationDate}
                      </div>
                      
                      {registration.workshopDate && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Atelier le {registration.workshopDate}
                        </div>
                      )}
                      
                      {registration.price && (
                        <div className="flex items-center">
                          <Euro className="w-4 h-4 mr-2" />
                          {registration.price}€
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {registration.status === 'validated' && (
                      <button
                        onClick={() => onPayment(registration.id)}
                        className="px-4 py-2 bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors duration-200"
                      >
                        Payer
                      </button>
                    )}
                    
                    {registration.status === 'completed' && !registration.evaluationDone && (
                      <button
                        onClick={() => onEvaluation(registration.id)}
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center"
                      >
                        <Star className="w-4 h-4 mr-1" />
                        Évaluation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationTabs;