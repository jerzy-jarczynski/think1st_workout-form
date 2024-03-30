import React, { useRef, useState, useEffect } from 'react';
import { useForm } from '../../../FormContext';

export interface PhotoUploadProps {
  header: string;
  state: 'default' | 'error'; // Dodaj prop state do interfejsu PhotoUploadProps
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ header, state }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [inputState, setInputState] = useState<'default' | 'active'>('default');
  const [, formActions] = useForm();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileName(file.name);
      setInputState('default');
      formActions.setPhoto(file.name);
    } else {
      setFileName('');
      setInputState('default');
      formActions.setPhoto('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setInputState('default');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setInputState('active');
    }
  };

  const handleClearFile = () => {
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setInputState('default');
    formActions.setPhoto('');
  };

  return (
    <>
      <h3 className="text-base font-normal mb-2">{header}</h3>
      <div
        className={`transition-colors ${
          state === 'default'
            ? inputState === 'default'
              ? 'border-purple-300'
              : 'border-purple-500'
            : 'border-red-500'
        } file-upload-container flex items-center justify-center w-full border rounded-md p-4 relative bg-white`}
        style={{ height: '96px', backgroundColor: state === 'error' ? '#FEECEC' : '' }}
        ref={containerRef}
      >
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif, .webp"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {fileName ? (
          <div className="flex items-center">
            <p>
              {fileName.length > 20 ? `${fileName.slice(0, 20)}...` : fileName}
            </p>
            <button
              onClick={handleClearFile}
              className="flex items-center justify-center p-0 w-5 h-5 cursor-pointer outline-none mr-1 relative rounded-full transition-opacity duration-300 hover:opacity-100"
              style={{ margin: '0 7px' }}
            >
              <img
                src="/icons/cancel-button.svg"
                alt="Cancel"
                className="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-300 hover:opacity-0"
              />
            </button>
          </div>
        ) : (
          <label
            htmlFor="file-upload-label"
            className="text-purple-600 cursor-pointer flex items-center justify-center underline"
            onClick={handleUploadClick}
          >
            <span className="mr-1">Upload a file</span>
          </label>
        )}
        {!fileName && (
          <span
            className="hidden sm:inline text-gray-500 ml-1"
            onClick={(e) => e.stopPropagation()}
          >
            or drag and drop here.
          </span>
        )}
      </div>
    </>
  );
};

export default PhotoUpload;
