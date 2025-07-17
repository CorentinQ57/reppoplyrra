import React, { useState } from 'react';
import Header from './components/Header';
import FileStatusCard from './components/FileStatusCard';
import WorkshopFilters from './components/WorkshopFilters';
import WorkshopCard from './components/WorkshopCard';
import RegistrationTabs from './components/RegistrationTabs';
import WorkshopRegistration from './components/WorkshopRegistration';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'registration'>('dashboard');
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  
  // États des filtres
  const [selectedType, setSelectedType] = useState<'all' | 'ETP' | 'APA'>('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Données de l'enfant
  const childData = {
    name: 'Emma',
    age: 8
  };

  // Données des documents
  const documents = [
    { id: '1', name: 'Certificat médical', status: 'validated' as const },
    { id: '2', name: 'Autorisation parentale', status: 'validated' as const },
    { id: '3', name: 'Justificatif de domicile', status: 'missing' as const },
    { id: '4', name: 'Attestation assurance', status: 'expired' as const, expiryDate: '15/01/2024' },
    { id: '5', name: 'Fiche sanitaire', status: 'validated' as const },
    { id: '6', name: 'Quotient familial CAF', status: 'missing' as const }
  ];

  const completionPercentage = Math.round((documents.filter(doc => doc.status === 'validated').length / documents.length) * 100);

  // Données des ateliers
  const workshops = [
    {
      id: '1',
      title: 'Atelier Cuisine Équilibrée',
      type: 'ETP' as const,
      level: 'Débutant',
      startDate: '15/03/2024',
      endDate: '22/03/2024',
      location: 'Toulouse Centre',
      availableSpots: 3,
      totalSpots: 12,
      price: 120,
      quotientFamilial: 800
    },
    {
      id: '2',
      title: 'Activité Physique Ludique',
      type: 'APA' as const,
      level: 'Tous niveaux',
      startDate: '20/03/2024',
      endDate: '27/03/2024',
      location: 'Blagnac',
      availableSpots: 0,
      totalSpots: 8,
      price: 80,
      quotientFamilial: 800
    },
    {
      id: '3',
      title: 'Découverte Nutritionnelle',
      type: 'ETP' as const,
      level: 'Intermédiaire',
      startDate: '25/03/2024',
      endDate: '01/04/2024',
      location: 'Colomiers',
      availableSpots: 7,
      totalSpots: 10,
      price: 100,
      quotientFamilial: 800
    },
    {
      id: '4',
      title: 'Sport et Bien-être',
      type: 'APA' as const,
      level: 'Débutant',
      startDate: '05/04/2024',
      endDate: '12/04/2024',
      location: 'Muret',
      availableSpots: 5,
      totalSpots: 15,
      price: 90,
      quotientFamilial: 800
    }
  ];

  // Données des inscriptions
  const registrations = [
    {
      id: '1',
      workshopTitle: 'Atelier Cuisine Familiale',
      type: 'ETP' as const,
      status: 'pending' as const,
      registrationDate: '10/02/2024'
    },
    {
      id: '2',
      workshopTitle: 'Sport Adapté Enfants',
      type: 'APA' as const,
      status: 'validated' as const,
      registrationDate: '05/02/2024',
      workshopDate: '18/03/2024',
      price: 60
    },
    {
      id: '3',
      workshopTitle: 'Nutrition et Plaisir',
      type: 'ETP' as const,
      status: 'completed' as const,
      registrationDate: '15/01/2024',
      workshopDate: '20/02/2024',
      evaluationDone: false
    },
    {
      id: '4',
      workshopTitle: 'Activités Motrices',
      type: 'APA' as const,
      status: 'completed' as const,
      registrationDate: '10/01/2024',
      workshopDate: '15/02/2024',
      evaluationDone: true
    }
  ];

  // Filtrage des ateliers
  const filteredWorkshops = workshops.filter(workshop => {
    if (selectedType !== 'all' && workshop.type !== selectedType) return false;
    // Ici on pourrait ajouter la logique de filtrage par âge et localisation
    return true;
  });

  const handleRegister = (workshopId: string) => {
    setSelectedWorkshopId(workshopId);
    setCurrentView('registration');
  };

  const handleRegistrationComplete = () => {
    setCurrentView('dashboard');
    setSelectedWorkshopId(null);
    // Ici on pourrait rafraîchir les données ou afficher une notification de succès
  };

  const handleRegistrationCancel = () => {
    setCurrentView('dashboard');
    setSelectedWorkshopId(null);
  };

  const handlePayment = (registrationId: string) => {
    console.log('Paiement pour l\'inscription:', registrationId);
    // Logique de paiement
  };

  const handleEvaluation = (registrationId: string) => {
    console.log('Évaluation pour l\'inscription:', registrationId);
    // Logique d'évaluation
  };

  if (currentView === 'registration' && selectedWorkshopId) {
    return (
      <WorkshopRegistration
        workshopId={selectedWorkshopId}
        onComplete={handleRegistrationComplete}
        onCancel={handleRegistrationCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <style>{`
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          letter-spacing: -0.05em;
        }
        
        button:hover {
          opacity: 0.9;
        }
        
        button:active {
          transform: scale(0.98);
        }
        
        input:focus, select:focus, textarea:focus {
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }
        
        .transition-all {
          transition: all 0.2s ease;
        }
      `}</style>

      <Header childName={childData.name} childAge={childData.age} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Section État du Dossier */}
        <div className="mb-8">
          <FileStatusCard 
            documents={documents} 
            completionPercentage={completionPercentage} 
          />
        </div>

        {/* Section Ateliers Disponibles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ateliers Disponibles</h2>
          
          <WorkshopFilters
            selectedType={selectedType}
            selectedAgeRange={selectedAgeRange}
            selectedLocation={selectedLocation}
            onTypeChange={setSelectedType}
            onAgeRangeChange={setSelectedAgeRange}
            onLocationChange={setSelectedLocation}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map(workshop => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onRegister={handleRegister}
              />
            ))}
          </div>
        </div>

        {/* Section Mes Inscriptions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Inscriptions</h2>
          
          <RegistrationTabs
            registrations={registrations}
            onPayment={handlePayment}
            onEvaluation={handleEvaluation}
          />
        </div>
      </main>
    </div>
  );
}

export default App;