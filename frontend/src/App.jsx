import { useState, useCallback } from 'react';
import axios from 'axios';
import FileUploader from './components/FileUploader';
import ConvertButton from './components/ConvertButton';
import ErrorDisplay from './components/ErrorDisplay';
import ConvertedFilesList from './components/ConvertedFilesList';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState({});

  const handleFilesSelect = useCallback((selectedFiles) => {
    setFiles(selectedFiles);
    setError('');
  }, []);

  const API_URL = 'http://localhost:4000';

  const handleUpload = async () => {
    if (files.length === 0) return setError('Select a file.');

    setLoading(true);
    setProgress({});

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        
        const response = await axios.post(`${API_URL}/api/convert`, formData, {
          responseType: 'blob',
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(prev => ({
              ...prev,
              [file.name]: percentCompleted
            }));
          }
        });

        const fileUrl = URL.createObjectURL(response.data);
        const fileId = Date.now() + '-' + file.name;
        
        return {
          id: fileId,
          name: file.name.split('.')[0] + getExtension(file),
          url: fileUrl,
          originalName: file.name
        };
      });

      const results = await Promise.all(uploadPromises);
      setConvertedFiles(prev => [...prev, ...results]);
      setFiles([]);
    } catch (err) {
      console.error('Detailed error converting files:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack,
      });
      setError('Error converting files. Please try again. Check the console for details.');
    } finally {
      setLoading(false);
      setProgress({});
    }
  };

  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (fileToDelete) => {
    URL.revokeObjectURL(fileToDelete.url);
    setConvertedFiles(prev => prev.filter(file => file.id !== fileToDelete.id));
  };

  const getExtension = (file) => {
    if (file.type === 'image/gif') return '.mp4';
    if (['image/png', 'image/jpeg'].includes(file.type)) return '.webp';
    return '';
  };

  return (
    <div className="app">
      <h1>Media Converter</h1>
      
      <div className="container">
        <FileUploader onFilesSelect={handleFilesSelect} />
        {files.length > 0 && (
          <div style={{ margin: '10px 0' }}>
            <p className="fileCount">
              {files.length} {files.length === 1 ? 'file' : 'files'} selected
            </p>
            <ConvertButton 
              onClick={handleUpload} 
              isLoading={loading} 
              text={loading ? 'Converting...' : 'Convert All'}
            />
          </div>
        )}
        {Object.keys(progress).length > 0 && (
          <div className="progressContainer">
            {Object.entries(progress).map(([filename, percent]) => (
              <div key={filename} className="progressItem">
                <div>{filename}: {percent}%</div>
                <div className="progressBarContainer">
                  <div 
                    className="progressBar"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <ErrorDisplay message={error} />
      </div>

      <ConvertedFilesList 
        files={convertedFiles}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
