import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return setError('Selecione um arquivo.');

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/api/convert', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name.split('.')[0] + getExtension(file);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError('Error converting file.');
    } finally {
      setLoading(false);
    }
  };

  const getExtension = (file) => {
    if (file.type === 'image/gif') return '.mp4';
    if (['image/png', 'image/jpeg'].includes(file.type)) return '.webp';
    return '';
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Media Converter</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading} style={{ marginLeft: 10 }}>
        {loading ? 'Convertendo...' : 'Converter'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
