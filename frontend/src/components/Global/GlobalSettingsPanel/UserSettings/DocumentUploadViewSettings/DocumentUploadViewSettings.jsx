import React, { useState, useRef } from 'react';
import './DocumentUploadViewSettings.scss';

const DocumentUploadViewSettings = () => {
  const [showViewer, setShowViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { id: 1, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
    { id: 2, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
    { id: 3, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
    { id: 4, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
    { id: 5, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
    { id: 6, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
    { id: 7, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
    { id: 8, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
    { id: 9, name: 'Aadhaar_Startup.pdf', status: 'uploaded' },
  ]);

  const [pendingDocuments, setPendingDocuments] = useState([
    { id: 1, name: 'FeeStructure_Startup.pdf', status: 'pending' },
    { id: 2, name: 'FeeStructure_Startup.pdf', status: 'pending' },
    { id: 3, name: 'FeeStructure_Startup.pdf', status: 'pending' },
  ]);

  const fileInputRef = useRef(null);

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setShowViewer(true);
  };

  const handleDeleteDocument = (documentId) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
    console.log('Document deleted:', documentId);
  };

  const handleChooseDocument = (documentId) => {
    // Trigger file input for the specific pending document
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    console.log('Choose document:', documentId);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Add the selected file to uploaded documents
      const newDocument = {
        id: Date.now(), // Generate unique ID
        name: file.name,
        status: 'uploaded',
        file: file
      };
      
      setUploadedDocuments(prev => [...prev, newDocument]);
      
      // Remove from pending documents (you might want to adjust this logic)
      // setPendingDocuments(prev => prev.filter(doc => doc.id !== documentId));
      
      console.log('File selected:', file.name);
    }
    
    // Reset file input
    event.target.value = '';
  };

  const closeViewer = () => {
    setShowViewer(false);
    setSelectedDocument(null);
  };

  return (
    <div className="document-upload-view-settings"> 
      {/* Hidden file input for file selection */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.txt"
        style={{ display: 'none' }}
      />
      
      <div className="document-sections">
        {/* Documents Uploaded Section */}
        <div className="documents-section uploaded-section">
          <h2>Documents Uploaded</h2>
          <div className="documents-list">
            {uploadedDocuments.map((doc) => (
              <div key={doc.id} className="document-item">
                <span className="document-name">{doc.name}</span>
                <div className="document-actions">
                  <button 
                    className="btn btn-view"
                    onClick={() => handleViewDocument(doc)}
                  >
                    View
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => handleDeleteDocument(doc.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Pending Section */}
        <div className="documents-section pending-section">
          <h2>Documents Pending</h2>
          <div className="documents-list">
            {pendingDocuments.map((doc) => (
              <div key={doc.id} className="document-item">
                <span className="document-name">{doc.name}</span>
                <div className="document-actions">
                  <button 
                    className="btn btn-choose"
                    onClick={() => handleChooseDocument(doc.id)}
                  >
                    Notify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Viewer Popup */}
      {showViewer && (
        <div className="document-viewer-overlay" onClick={closeViewer}>
          <div className="document-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="viewer-header">
              <h3>{selectedDocument?.name}</h3>
              <button className="close-btn" onClick={closeViewer}>
                ×
              </button>
            </div>
            <div className="viewer-content">
              <div className="pdf-placeholder">
                <div className="pdf-icon">📄</div>
                <p>PDF Document Viewer</p>
                <p className="document-name">{selectedDocument?.name}</p>
                <p className="placeholder-text">
                  Document viewer functionality will be implemented here.
                  <br />
                  This will display the actual PDF content.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadViewSettings;
