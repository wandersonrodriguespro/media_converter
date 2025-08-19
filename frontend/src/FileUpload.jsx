import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:4000/api/convert', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.includes('.gif') ? file.name.replace(/\.gif$/, '.mp4') : file.name.replace(/\.(png|jpg|jpeg)$/, '.webp');
      a.click();
    } else {
      alert('Conversion failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Convert</button>
    </div>
  );
}
