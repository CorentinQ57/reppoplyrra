import React, { useState } from 'react';
import { Check, Calendar, MapPin, Clock, FileText, User, AlertCircle } from 'lucide-react';

interface Child {
  name: string;
  age: number;
  birthDate: string;
}

interface Workshop {
  title: string;
  type: 'ETP' | 'APA';
  level: string;
  date: string;
  time: string;
  location: string;
  price: number;
}

interface Document {
  name: string;
  status: 'uploaded' | 'validated';
  uploadDate: string;
}

interface RegistrationConfirmationProps {
  child: Child;
  workshop: Workshop;
  documents: Document[];
  onSubmit: () => void;
  onBack: () => void;
}

const RegistrationConfirmation: React.FC<RegistrationConfirmationProps> = ({
  child,
  workshop,
  documents,
  onSubmit,
  onBack
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!acceptedTerms) return;
    
    setIsSubmitting(true);
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmit();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirmation d'inscription</h2>
        <p className="text-gray-600">
          Vérifiez les informations ci-dessous avant de soumettre votre demande d'inscription.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informations enfant */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-orange-500" />
            Informations enfant
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Prénom :</span>
              <span className="font-medium text-gray-900">{child.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Âge :</span>
              <span className="font-medium text-gray-900">{child.age} ans</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date de naissance :</span>
              <span className="font-medium text-gray-900">{child.birthDate}</span>
            </div>
          </div>
        </div>

        {/* Informations atelier */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-orange-500" />
            Détails de l'atelier
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 text-xs font-medium ${
                  workshop.type === 'ETP' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {workshop.type}
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800">
                  {workshop.level}
                </span>
              </div>
              <div className="font-medium text-gray-900">{workshop.title}</div>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {workshop.date}
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {workshop.time}
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {workshop.location}
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tarif :</span>
                <span className="text-xl font-bold text-orange-600">{workshop.price}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents uploadés */}
      <div className="mt-8 bg-white border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-orange-500" />
          Documents fournis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((document, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{document.name}</div>
                <div className="text-sm text-gray-600">Téléchargé le {document.uploadDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Délai de validation */}
      <div className="mt-6 bg-blue-50 border border-blue-200 p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Délai de validation</h4>
            <p className="text-sm text-blue-700">
              Votre demande sera examinée sous 3 à 5 jours ouvrés. Vous recevrez un email de confirmation 
              une fois votre inscription validée par notre équipe.
            </p>
          </div>
        </div>
      </div>

      {/* Conditions */}
      <div className="mt-6 bg-white border border-gray-200 p-6">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="w-5 h-5 text-orange-500 border-gray-300 focus:ring-orange-500 focus:ring-2 mt-0.5"
          />
          <div className="text-sm text-gray-700">
            <span className="font-medium">J'accepte les conditions de participation</span>
            <p className="mt-1 text-gray-600">
              En cochant cette case, j'accepte les conditions générales de participation aux ateliers RéPPOP 
              et je confirme que les informations fournies sont exactes.
            </p>
          </div>
        </label>
      </div>

      {/* Boutons d'action */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
        >
          Retour
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!acceptedTerms || isSubmitting}
          className={`px-6 py-3 font-medium transition-all duration-200 ${
            acceptedTerms && !isSubmitting
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
              <span>Envoi en cours...</span>
            </div>
          ) : (
            'Soumettre ma demande'
          )}
        </button>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;