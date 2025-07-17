import React, { useState, useCallback } from 'react';
import { Upload, File, Check, X, AlertTriangle, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  required: boolean;
  description: string;
  maxAge?: number; // en mois
  file?: File;
  status: 'missing' | 'uploaded' | 'validated' | 'expired' | 'invalid';
  uploadDate?: string;
}

interface DocumentUploadProps {
  documents: Document[];
  onDocumentUpload: (documentId: string, file: File) => void;
  onDocumentRemove: (documentId: string) => void;
  onContinue: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documents,
  onDocumentUpload,
  onDocumentRemove,
  onContinue
}) => {
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent, documentId: string) => {
    e.preventDefault();
    setDraggedOver(documentId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDraggedOver(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, documentId: string) => {
    e.preventDefault();
    setDraggedOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && isValidFile(file)) {
      onDocumentUpload(documentId, file);
    }
  }, [onDocumentUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
    const file = e.target.files?.[0];
    if (file && isValidFile(file)) {
      onDocumentUpload(documentId, file);
    }
  }, [onDocumentUpload]);

  const isValidFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
      case 'validated':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'expired':
      case 'invalid':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Upload className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
      case 'validated':
        return 'border-green-200 bg-green-50';
      case 'expired':
      case 'invalid':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const allRequiredUploaded = documents
    .filter(doc => doc.required)
    .every(doc => doc.status === 'uploaded' || doc.status === 'validated');

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents requis</h2>
        <p className="text-gray-600">
          Veuillez télécharger les documents nécessaires pour finaliser votre inscription.
          Formats acceptés : PDF, JPG, PNG (max 5MB)
        </p>
      </div>

      <div className="space-y-6">
        {documents.map((document) => (
          <div
            key={document.id}
            className={`border-2 border-dashed p-6 transition-all duration-200 ${
              draggedOver === document.id
                ? 'border-orange-400 bg-orange-50'
                : getStatusColor(document.status)
            }`}
            onDragOver={(e) => handleDragOver(e, document.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, document.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getStatusIcon(document.status)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{document.name}</h3>
                  {document.required && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      Obligatoire
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-3">{document.description}</p>
                
                {document.maxAge && (
                  <div className="flex items-center text-sm text-orange-600 mb-3">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Document de moins de {document.maxAge} mois requis
                  </div>
                )}

                {document.status === 'missing' ? (
                  <div className="space-y-3">
                    <div className="text-center py-8 border-2 border-dashed border-gray-300">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 mb-2">
                        Glissez-déposez votre fichier ici ou
                      </p>
                      <label className="inline-block px-4 py-2 bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 cursor-pointer transition-colors duration-200">
                        Parcourir les fichiers
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileSelect(e, document.id)}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 p-3">
                    <div className="flex items-center space-x-3">
                      <File className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">{document.file?.name}</div>
                        {document.uploadDate && (
                          <div className="text-sm text-gray-500">
                            Téléchargé le {document.uploadDate}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDocumentRemove(document.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {document.status === 'expired' && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200">
                    <p className="text-sm text-red-700">
                      Ce document est expiré. Veuillez télécharger une version plus récente.
                    </p>
                  </div>
                )}

                {document.status === 'invalid' && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200">
                    <p className="text-sm text-red-700">
                      Format de fichier non valide. Veuillez télécharger un fichier PDF, JPG ou PNG.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onContinue}
          disabled={!allRequiredUploaded}
          className={`px-6 py-3 font-medium transition-all duration-200 ${
            allRequiredUploaded
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continuer vers la confirmation
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;