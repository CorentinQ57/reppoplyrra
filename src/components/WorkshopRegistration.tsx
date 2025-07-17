import React, { useState } from 'react';
import ProgressSteps from './ProgressSteps';
import WorkshopDetails from './WorkshopDetails';
import DocumentUpload from './DocumentUpload';
import RegistrationConfirmation from './RegistrationConfirmation';

interface WorkshopRegistrationProps {
  workshopId: string;
  onComplete: () => void;
  onCancel: () => void;
}

const WorkshopRegistration: React.FC<WorkshopRegistrationProps> = ({
  workshopId,
  onComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File>>({});

  const steps = [
    'Détails de l\'atelier',
    'Documents requis',
    'Confirmation'
  ];

  // Données simulées de l'atelier
  const workshop = {
    id: workshopId,
    title: 'Atelier Cuisine Équilibrée',
    type: 'ETP' as const,
    level: 'Débutant',
    objectives: [
      'Apprendre à préparer des repas équilibrés et savoureux',
      'Comprendre les bases de la nutrition infantile',
      'Développer l\'autonomie en cuisine',
      'Créer de bonnes habitudes alimentaires en famille'
    ],
    description: 'Cet atelier pratique permet aux enfants et leurs familles de découvrir le plaisir de cuisiner ensemble tout en apprenant les principes d\'une alimentation équilibrée. À travers des recettes ludiques et adaptées, nous explorons les groupes d\'aliments, les portions recommandées et les techniques culinaires de base.',
    prerequisites: [
      'Aucune allergie alimentaire majeure',
      'Capacité à rester debout pendant 2 heures',
      'Accompagnement d\'un parent obligatoire'
    ],
    duration: '3 séances de 2h',
    location: 'Centre RéPPOP Toulouse',
    availableSlots: [
      { date: '15 Mars 2024', time: '14h00 - 16h00', spots: 3 },
      { date: '22 Mars 2024', time: '14h00 - 16h00', spots: 1 },
      { date: '29 Mars 2024', time: '10h00 - 12h00', spots: 5 },
      { date: '05 Avril 2024', time: '14h00 - 16h00', spots: 0 }
    ],
    price: 120,
    testimonials: [
      {
        name: 'Marie L.',
        comment: 'Ma fille a adoré apprendre à cuisiner ! Elle me demande maintenant de l\'aider à préparer les repas.',
        rating: 5
      },
      {
        name: 'Thomas P.',
        comment: 'Très bon atelier, bien organisé. Les animateurs sont patients et pédagogues.',
        rating: 4
      }
    ]
  };

  // Données simulées des documents
  const [documents, setDocuments] = useState([
    {
      id: 'consent',
      name: 'Consentement famille',
      required: true,
      description: 'Autorisation de participation aux activités RéPPOP',
      status: 'missing' as const
    },
    {
      id: 'medical',
      name: 'Certificat médical',
      required: true,
      description: 'Certificat médical de non contre-indication à la pratique d\'activités',
      maxAge: 6,
      status: 'missing' as const
    },
    {
      id: 'parental',
      name: 'Autorisation parentale',
      required: true,
      description: 'Autorisation parentale pour la participation de l\'enfant',
      status: 'missing' as const
    },
    {
      id: 'insurance',
      name: 'Assurance extra-scolaire',
      required: true,
      description: 'Attestation d\'assurance responsabilité civile et individuelle accident',
      status: 'missing' as const
    }
  ]);

  // Données simulées de l'enfant
  const child = {
    name: 'Emma',
    age: 8,
    birthDate: '15/03/2016'
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleContinueFromDetails = () => {
    if (selectedSlot) {
      setCurrentStep(2);
    }
  };

  const handleDocumentUpload = (documentId: string, file: File) => {
    setUploadedDocuments(prev => ({ ...prev, [documentId]: file }));
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, status: 'uploaded' as const, file, uploadDate: new Date().toLocaleDateString('fr-FR') }
        : doc
    ));
  };

  const handleDocumentRemove = (documentId: string) => {
    setUploadedDocuments(prev => {
      const newDocs = { ...prev };
      delete newDocs[documentId];
      return newDocs;
    });
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, status: 'missing' as const, file: undefined, uploadDate: undefined }
        : doc
    ));
  };

  const handleContinueFromDocuments = () => {
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    // Simulation de soumission
    console.log('Inscription soumise:', {
      workshop: workshopId,
      slot: selectedSlot,
      documents: uploadedDocuments,
      child
    });
    onComplete();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WorkshopDetails
            workshop={workshop}
            selectedSlot={selectedSlot}
            onSlotSelect={handleSlotSelect}
            onContinue={handleContinueFromDetails}
          />
        );
      case 2:
        return (
          <DocumentUpload
            documents={documents}
            onDocumentUpload={handleDocumentUpload}
            onDocumentRemove={handleDocumentRemove}
            onContinue={handleContinueFromDocuments}
          />
        );
      case 3:
        return (
          <RegistrationConfirmation
            child={child}
            workshop={{
              title: workshop.title,
              type: workshop.type,
              level: workshop.level,
              date: selectedSlot?.split('-')[0] || '',
              time: selectedSlot?.split('-')[1] || '',
              location: workshop.location,
              price: workshop.price
            }}
            documents={documents.filter(doc => doc.status === 'uploaded' || doc.status === 'validated')}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressSteps
        currentStep={currentStep}
        totalSteps={steps.length}
        steps={steps}
      />
      
      {renderCurrentStep()}
      
      {/* Bouton annuler */}
      <div className="fixed bottom-6 left-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          Annuler l'inscription
        </button>
      </div>
    </div>
  );
};

export default WorkshopRegistration;