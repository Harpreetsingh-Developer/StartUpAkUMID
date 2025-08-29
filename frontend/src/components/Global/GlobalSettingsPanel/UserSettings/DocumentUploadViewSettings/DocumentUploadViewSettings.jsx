import React, { useState } from 'react';
import JSZip from 'jszip';
import './DocumentUploadViewSettings.scss';

const DocumentUploadViewSettings = () => {
  const [toast, setToast] = useState(null);
  const [showUploadPanel, setShowUploadPanel] = useState(true);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const initialFiles = [
    { id: 1, fileName: 'DETAILS1.pdf', owner: 'John', fileSize: '28.60 kB', date: '02/01/2021', type: 'pdf' },
    { id: 2, fileName: 'DETAILS1.docx', owner: 'Ronaldo', fileSize: '48.70 kB', date: '13/11/2022', type: 'docx' },
    { id: 3, fileName: 'DETAILS1.docx', owner: 'Michael', fileSize: '16.80 kB', date: '23/11/2022', type: 'docx' },
    { id: 4, fileName: 'DETAILS1.jpg', owner: 'Messi', fileSize: '12.30 kB', date: '16/12/2022', type: 'jpg' },
    { id: 5, fileName: 'DETAILS1.png', owner: 'Speed', fileSize: '20.50 kB', date: '06/11/2023', type: 'png' },
    { id: 6, fileName: 'DETAILS1.docx', owner: 'Robin Hood', fileSize: '28.50 kB', date: '11/11/2023', type: 'docx' },
    { id: 7, fileName: 'DETAILS1.pdf', owner: 'John', fileSize: '28.60 kB', date: '02/01/2021', type: 'pdf' },
    { id: 8, fileName: 'DETAILS1.docx', owner: 'Ronaldo', fileSize: '48.70 kB', date: '13/11/2022', type: 'docx' },
    { id: 9, fileName: 'DETAILS1.docx', owner: 'Michael', fileSize: '16.80 kB', date: '23/11/2022', type: 'docx' },
    { id: 10, fileName: 'DETAILS1.jpg', owner: 'Speed', fileSize: '12.30 kB', date: '16/12/2022', type: 'jpg' },
    { id: 11, fileName: 'DETAILS1.png', owner: 'Speed', fileSize: '20.50 kB', date: '06/11/2023', type: 'png' },
    { id: 12, fileName: 'DETAILS1.docx', owner: 'Robin Hood', fileSize: '28.50 kB', date: '11/11/2023', type: 'docx' },
  ];

  const [files, setFiles] = useState(initialFiles);
  const [starredIds, setStarredIds] = useState([]); 
  const [showStarred, setShowStarred] = useState(false);

  
  const [searchTerm, setSearchTerm] = useState("");
 
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; 

  let filteredFiles = showStarred ? files.filter(f => starredIds.includes(f.id)) : files;
  if (searchTerm.trim() !== "") {
    filteredFiles = filteredFiles.filter(f =>
      f.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.owner && f.owner.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
  const totalPages = Math.ceil(filteredFiles.length / pageSize);
  const paginatedFiles = filteredFiles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPages);
  const goToPrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNext = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const filteredByType = filterType === 'all' ? paginatedFiles : paginatedFiles.filter(f => f.type === filterType);
  const handleToggleStar = (id) => {
    setStarredIds((prev) => {
      const isStarred = prev.includes(id);
      setToast(isStarred ? 'Removed from Starred' : 'Added to Starred');
      setTimeout(() => setToast(null), 1500);
      return isStarred ? prev.filter(fid => fid !== id) : [...prev, id];
    });
  };

  const handleStarredFilter = () => {
    setShowStarred((prev) => !prev);
  };

  const handleExportDocuments = async () => {
    if (!files.length) return;
    const zip = new JSZip();
    for (const file of files) {
      if (file.file) {
        zip.file(file.fileName, file.file);
      } else {
        zip.file(file.fileName, `This is a demo file for ${file.fileName}`);
      }
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documents.zip';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  const [notifications, setNotifications] = useState([]);

  const handleFileDrop = (event) => {
    event.preventDefault();
    const filesArray = [...event.dataTransfer.files];
    if (filesArray.length > 0) {
      const newFile = filesArray[0];
      const url = URL.createObjectURL(newFile);
      const newDocument = {
        id: Date.now(),
        fileName: newFile.name,
        owner: 'You',
        fileSize: (newFile.size / 1024).toFixed(2) + ' kB',
        date: new Date().toLocaleDateString('en-GB'),
        type: newFile.name.split('.').pop(),
        url,
        file: newFile,
      };
      setFiles(prevFiles => [newDocument, ...prevFiles]);
      setUnreadCount(prev => prev + 1);
      setNotifications(prev => [
        { id: Date.now(), message: `You uploaded ${newFile.name}` },
        ...prev
      ]);
    }
  };

  const handleBrowseFiles = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const newFile = e.target.files[0];
      if (newFile) {
        const url = URL.createObjectURL(newFile);
        const newDocument = {
          id: Date.now(),
          fileName: newFile.name,
          owner: 'You',
          fileSize: (newFile.size / 1024).toFixed(2) + ' kB',
          date: new Date().toLocaleDateString('en-GB'),
          type: newFile.name.split('.').pop(),
          url,
          file: newFile,
        };
        setFiles(prevFiles => [newDocument, ...prevFiles]);
        setUnreadCount(prev => prev + 1);
        setNotifications(prev => [
          { id: Date.now(), message: `You uploaded ${newFile.name}` },
          ...prev
        ]);
      }
    };
    fileInput.click();
  };

  const handleViewDocument = (file) => {
    setSelectedDocument(file);
    setShowViewer(true);
  };

  const handleDeleteDocument = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

 
  const handleDownloadDocument = (file) => {
    let url;
    if (file.file) {
      url = URL.createObjectURL(file.file);
    } else if (file.url) {
      url = file.url;
    } else {
     
      const content = `This is a demo file for ${file.fileName}`;
      const blob = new Blob([content], { type: 'application/octet-stream' });
      url = URL.createObjectURL(blob);
    }
    const a = document.createElement('a');
    a.href = url;
    a.download = file.fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState(null); 
  const [createName, setCreateName] = useState('');
  const handleCreate = () => {
    setShowCreateModal(true);
    setCreateType(null);
    setCreateName('');
  };
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreateType(null);
    setCreateName('');
  };
  const handleCreateOption = (type) => {
    setCreateType(type);
    setCreateName('');
  };
  const handleCreateConfirm = () => {
    if (!createName.trim()) return;
    if (createType === 'Document') {
      const newDoc = {
        id: Date.now(),
        fileName: createName,
        owner: 'You',
        fileSize: '0.00 kB',
        date: new Date().toLocaleDateString('en-GB'),
        type: createName.split('.').pop() || 'txt',
      };
      setFiles(prev => [newDoc, ...prev]);
    } else if (createType === 'Folder') {
      const newFolder = {
        id: Date.now(),
        fileName: createName,
        owner: 'You',
        fileSize: '-',
        date: new Date().toLocaleDateString('en-GB'),
        type: 'folder',
      };
      setFiles(prev => [newFolder, ...prev]);
    }
    setShowCreateModal(false);
    setCreateType(null);
    setCreateName('');
  };
  const handleCreateFolder = () => {
    setShowCreateModal(true);
    setCreateType('Folder');
    setCreateName('');
  };
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const handleBell = () => {
    setShowNotificationModal(true);
    setUnreadCount(0);
  };
  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
  };
  const [unreadCount, setUnreadCount] = useState(0); 

  return (
    <div className="dashboard-container">
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#007bff',
          color: '#fff',
          padding: '1rem 2.5rem',
          borderRadius: '10px',
          zIndex: 9999,
          fontWeight: 600,
          fontSize: '1.1rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          letterSpacing: '0.01em'
        }}>
          <span role="img" aria-label="mail" style={{fontSize: '1.5rem'}}>📧</span>
          {toast.replace('📧 ','')}
        </div>
      )}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="welcome-text">Welcome Back,</h1>
          <p className="subtitle">Check your files, folders here</p>
        </div>
        <div className="header-actions">
          <button className="btn create-btn" onClick={handleCreate} title="Create a new document or folder">
            <i className="fas fa-plus-circle"></i> Create
          </button>
          <button className="btn create-folder-btn" onClick={handleCreateFolder} title="Quick create a new folder">
            <i className="fas fa-folder-plus"></i> Folder
          </button>
          <div className="notification-icon" onClick={handleBell} style={{ cursor: 'pointer' }} title="Notifications">
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>
          <button className="btn upload-document-btn" onClick={() => setShowUploadPanel((prev) => !prev)} title="Upload a new document">
            <i className="fas fa-upload"></i> Upload
          </button>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="file-management-section">
          <div className="toolbar">
            <div className="tabs">
              <button className={`tab-btn${!showStarred ? ' active' : ''}`} onClick={() => setShowStarred(false)}>
                <i className="fas fa-clock"></i> Recent
              </button>
              <button
                className={`tab-btn${showStarred ? ' active' : ''}`}
                onClick={handleStarredFilter}
              >
                <i className="fas fa-star"></i> Starred
              </button>
            </div>
            <div className="search-and-filter">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button className="filter-btn" onClick={() => setShowFilterModal(true)}>
                <i className="fas fa-filter"></i> Filter
              </button>
            </div>
          </div>
          <table className="file-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Owner</th>
                <th>File Size</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredByType.map(file => (
                <tr key={file.id}>
                  <td className="file-name-cell">
                    <span className={`file-icon ${file.type}`}>{file.type === 'folder' ? '�' : '�📄'}</span>
                    {file.fileName}
                  </td>
                  <td>{file.owner}</td>
                  <td>{file.fileSize}</td>
                  <td>{file.date}</td>
                  <td className="action-cell">
                    <div className="action-icons">
                      <button className="action-icon-btn" onClick={() => handleViewDocument(file)}>
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="action-icon-btn" onClick={() => handleDownloadDocument(file)}>
                        <i className="fas fa-download"></i>
                      </button>
                      <button className="action-icon-btn" onClick={() => handleToggleStar(file.id)} title={starredIds.includes(file.id) ? "Unstar this file" : "Star this file"}>
                        <i className={`${starredIds.includes(file.id) ? 'fas' : 'far'} fa-star`} style={{ color: starredIds.includes(file.id) ? '#FFD700' : undefined }}></i>
                      </button>
                      <button className="action-icon-btn" onClick={() => handleDeleteDocument(file.id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button className="page-btn" onClick={goToFirst} disabled={currentPage === 1}>&lt;&lt;</button>
            <button className="page-btn" onClick={goToPrev} disabled={currentPage === 1}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn${currentPage === i + 1 ? ' active' : ''}`}
                onClick={() => goToPage(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
            <button className="page-btn" onClick={goToNext} disabled={currentPage === totalPages}>&gt;</button>
            <button className="page-btn" onClick={goToLast} disabled={currentPage === totalPages}>&gt;&gt;</button>
          </div>
      {showFilterModal && (
        <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center' }}>Filter Files</h2>
            <div style={{ margin: '1rem 0', textAlign: 'center' }}>
              <label>
                <input
                  type="radio"
                  name="fileType"
                  value="all"
                  checked={filterType === 'all'}
                  onChange={() => setFilterType('all')}
                /> All
              </label>
              {' '}
              <label>
                <input
                  type="radio"
                  name="fileType"
                  value="pdf"
                  checked={filterType === 'pdf'}
                  onChange={() => setFilterType('pdf')}
                /> PDF
              </label>
              {' '}
              <label>
                <input
                  type="radio"
                  name="fileType"
                  value="docx"
                  checked={filterType === 'docx'}
                  onChange={() => setFilterType('docx')}
                /> DOCX
              </label>
              {' '}
              <label>
                <input
                  type="radio"
                  name="fileType"
                  value="jpg"
                  checked={filterType === 'jpg'}
                  onChange={() => setFilterType('jpg')}
                /> JPG
              </label>
              {' '}
              <label>
                <input
                  type="radio"
                  name="fileType"
                  value="png"
                  checked={filterType === 'png'}
                  onChange={() => setFilterType('png')}
                /> PNG
              </label>
            </div>
            <button className="btn cancel-btn" style={{ width: '100%' }} onClick={() => setShowFilterModal(false)}>Close</button>
          </div>
        </div>
      )}
          <button
            className="btn export-document-btn"
            onClick={handleExportDocuments}
          >
            Export Document
          </button>
        </div>
        {showUploadPanel && (
          <div className="upload-document-panel">
            <div className="panel-header">
              <h3>Upload Document</h3>
              <button className="close-panel-btn" onClick={() => setShowUploadPanel(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="panel-content">
              <p className="panel-info">
                Our Transaction Department will be looking at your uploaded files. If you have an inquiry or need to send the files directly, you may email us at 
                  <br />
                  If you have an inquiry or need to send the files directly, you may email us at <br />
                  <a
                    href="mailto:support@solutio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007bff', textDecoration: 'underline', fontWeight: 600, fontSize: '1.05em', marginTop: 4, display: 'inline-block' }}
                    onClick={() => setToast('📧 Official Support: Opening your email client to contact support@solutio.com')}
                  >
                    support@solutio.com
                  </a>
              </p>
              <div
                className="drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
              >
                <div className="drop-icon">
                  <i className="fas fa-cloud-upload-alt"></i>
                </div>
                <p>Drag and Drop Files here or</p>
                <button className="browse-files-btn" onClick={handleBrowseFiles}>
                  Browse Files
                </button>
              </div>
              <p className="upload-note">
                <i className="fas fa-exclamation-triangle"></i> By browsing the file and uploading the self-signed files automatically will help to re-submit/collect documents. Documents checklist is on you.
              </p>
            </div>
            <div className="panel-footer">
              <button className="btn cancel-btn" onClick={() => setShowUploadPanel(false)}>
                Cancel
              </button>
              <button className="btn upload-btn" onClick={handleBrowseFiles}>
                <i className="fas fa-upload"></i> Upload
              </button>
            </div>
          </div>
        )}
      </main>
      {showViewer && selectedDocument && (
        <div className="document-viewer-overlay" onClick={() => setShowViewer(false)}>
          <div className="document-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="viewer-header">
              <h3>{selectedDocument.fileName}</h3>
              <button className="close-viewer-btn" onClick={() => setShowViewer(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="viewer-content" style={{textAlign: 'center'}}>
              {['jpg','jpeg','png','gif'].includes((selectedDocument.type||'').toLowerCase()) && selectedDocument.url ? (
                <img src={selectedDocument.url} alt={selectedDocument.fileName} style={{maxWidth: '100%', maxHeight: '400px'}} />
              ) : (selectedDocument.type||'').toLowerCase() === 'pdf' && selectedDocument.url ? (
                <embed src={selectedDocument.url} type="application/pdf" width="100%" height="400px" />
              ) : ['docx','doc','xlsx','xls','pptx','ppt'].includes((selectedDocument.type||'').toLowerCase()) && selectedDocument.url ? (
                <div>
                  <p>Previewing Office files requires uploading to a public server. <br/>Click below to view in Google Docs Viewer (opens in new tab):</p>
                  <a
                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedDocument.url)}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{marginTop: '1rem', display: 'inline-block'}}
                  >
                    Open in Google Docs Viewer
                  </a>
                  <div style={{marginTop: '1rem'}}>
                    <a href={selectedDocument.url} download={selectedDocument.fileName} className="btn" style={{display: 'inline-block'}}>
                      Download File
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <p>No preview available for <b>{selectedDocument.fileName}</b>.</p>
                  <button
                    className="btn"
                    style={{marginTop: '1rem', display: 'inline-block'}}
                    onClick={() => handleDownloadDocument(selectedDocument)}
                  >
                    Download File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showNotificationModal && (
        <div className="modal-overlay" onClick={handleCloseNotificationModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center' }}>Notifications</h2>
            <div style={{ margin: '2rem 0', textAlign: 'center', color: '#888' }}>
              {notifications.length === 0 ? (
                'No new notifications.'
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, color: '#333', textAlign: 'left' }}>
                  {notifications.map(n => (
                    <li key={n.id} style={{ marginBottom: '1rem', fontSize: '1rem' }}>
                      <i className="fas fa-upload" style={{ color: '#007bff', marginRight: 8 }}></i>
                      {n.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {notifications.length > 0 && (
              <button className="btn" style={{ width: '100%', marginBottom: '0.5rem' }} onClick={() => setNotifications([])}>
                Mark all as read
              </button>
            )}
            <button className="btn cancel-btn" style={{ width: '100%' }} onClick={handleCloseNotificationModal}>Close</button>
          </div>
        </div>
      )}
      {showCreateModal && (
        <div className="modal-overlay animated" onClick={handleCloseCreateModal}>
          <div className="modal-content create-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseCreateModal} title="Close">
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-stepper">
              <div className={`step ${!createType ? 'active' : ''}`}>1</div>
              <div className="step-line"></div>
              <div className={`step ${createType ? 'active' : ''}`}>2</div>
            </div>
            <h2 className="modal-title">
              {createType ? (
                <>
                  <i className={createType === 'Folder' ? 'fas fa-folder-plus' : 'fas fa-file-alt'} style={{ color: createType === 'Folder' ? '#f7b731' : '#007bff', marginRight: 8 }}></i>
                  Create New {createType}
                </>
              ) : (
                <>
                  <i className="fas fa-magic" style={{ color: '#007bff', marginRight: 8 }}></i>
                  What do you want to create?
                </>
              )}
            </h2>
            {!createType && (
              <div className="modal-type-select">
                <button className="btn type-btn" title="Create a new document" onClick={() => handleCreateOption('Document')}>
                  <i className="fas fa-file-alt" style={{ marginRight: 6 }}></i> Document
                </button>
                <button className="btn type-btn" title="Create a new folder" onClick={() => handleCreateOption('Folder')}>
                  <i className="fas fa-folder-plus" style={{ marginRight: 6 }}></i> Folder
                </button>
              </div>
            )}
            {createType && (
              <div className="modal-name-step">
                <input
                  type="text"
                  className={`input create-input${createName.trim() === '' ? ' error' : ''}`}
                  placeholder={`Enter ${createType} name`}
                  value={createName}
                  onChange={e => setCreateName(e.target.value)}
                  autoFocus
                />
                {createName.trim() === '' && (
                  <span className="input-error">Please enter a name for your {createType.toLowerCase()}.</span>
                )}
                <button
                  className="btn confirm-btn"
                  onClick={handleCreateConfirm}
                  disabled={createName.trim() === ''}
                  title={`Create ${createType}`}
                >
                  <i className={createType === 'Folder' ? 'fas fa-folder-plus' : 'fas fa-file-alt'} style={{ marginRight: 6 }}></i>
                  Create {createType}
                </button>
                <button className="btn cancel-btn" onClick={handleCloseCreateModal} title="Cancel">Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadViewSettings;