import React from 'react';
import { CheckCircle, AlertTriangle, FileText, Clock } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  status: 'validated' | 'missing' | 'expired';
  expiryDate?: string;
}

interface FileStatusCardProps {
  documents: Document[];
  completionPercentage: number;
}

const FileStatusCard: React.FC<FileStatusCardProps> = ({ documents, completionPercentage }) => {
  const validatedDocs = documents.filter(doc => doc.status === 'validated').length;
  const totalDocs = documents.length;
  const expiredDocs = documents.filter(doc => doc.status === 'expired');

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">État du Dossier</h2>
        <FileText className="w-5 h-5 text-gray-400" />
      </div>

      {/* Barre de progression */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Dossier complet à {completionPercentage}%
          </span>
          <span className="text-sm text-gray-500">
            {validatedDocs}/{totalDocs} documents
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2">
          <div 
            className="bg-green-500 h-2 transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Alertes documents expirés */}
      {expiredDocs.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-red-800">
              {expiredDocs.length} document(s) expiré(s)
            </span>
          </div>
          <ul className="mt-2 text-sm text-red-700">
            {expiredDocs.map(doc => (
              <li key={doc.id} className="flex items-center">
                <span className="w-1 h-1 bg-red-500 mr-2"></span>
                {doc.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Synthèse documents */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-lg font-semibold text-gray-900">{validatedDocs}</div>
          <div className="text-xs text-gray-500">Validés</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {documents.filter(doc => doc.status === 'missing').length}
          </div>
          <div className="text-xs text-gray-500">Manquants</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-lg font-semibold text-gray-900">{expiredDocs.length}</div>
          <div className="text-xs text-gray-500">Expirés</div>
        </div>
      </div>
    </div>
  );
};

export default FileStatusCard;