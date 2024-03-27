import React, { useRef, useState } from 'react';

interface PhotoUploadProps {
  header: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ header }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleClearFile = () => {
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className="file-upload-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={(e) => {
        if (!(e.target instanceof HTMLAnchorElement)) {
          handleUploadClick();
        }
      }}
    >
      <h3>{header}</h3>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif, .webp"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {fileName ? (
        <p>{fileName} (Click to change file)</p>
      ) : (
        <label htmlFor="file-upload-label">
          <a href="#upload" onClick={(e) => { e.preventDefault(); handleUploadClick(); }}>
            Upload a file
          </a>{' '}
          or drag and drop here.
        </label>
      )}
      {fileName && <button onClick={handleClearFile}>Clear</button>}
    </div>
  );
};

export default PhotoUpload;
