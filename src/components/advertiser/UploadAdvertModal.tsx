import React, { useState } from 'react';
import { useCreateAdvertMutation } from '../api/apiSlice';
import { SubmitHandler } from 'react-hook-form';

interface UploadAdvertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (formData: CustomFormData) => void; 
}

export interface CustomFormData {
  title: string;
  description: string;
  advertType: string;
  duration: number;
  type: string;
  file: File | null;
  link: string;
}


const UploadAdvertModal: React.FC<UploadAdvertModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [advertType, setAdvertType] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<string>('popup');
  const [duration, setDuration] = useState<number>(2);
  const [link, setLink] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [createAdvert] = useCreateAdvertMutation();


  const onSubmit: SubmitHandler<CustomFormData> = async (data) => {
    if (!data.file) {
      // Handle the case where no file is selected.
      console.error('No file selected.');
      return;
    }

    // Check the file type based on the selected 'type' option.
    const allowedImageTypes = ['.jpg', '.jpeg', '.png', '.gif'];
    const allowedVideoTypes = ['.mp4', '.avi', '.mov'];

    const fileType = data.type === 'popup' ? allowedImageTypes : allowedVideoTypes;
    const fileExtension = data.file.name.split('.').pop();

    if (!fileType.includes(`.${fileExtension}`)) {
      console.error('Invalid file type selected.');
      return;
    }
    const totalUploadSize = 100;
    let uploadedSize = 0;
    const uploadInterval = setInterval(() => {
      if (uploadedSize >= totalUploadSize) {
        clearInterval(uploadInterval);
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
        }, 3000);
      } else {
        uploadedSize += 1;
        const newProgress = (uploadedSize / totalUploadSize) * 100;
        setProgress(newProgress);
      }
    }, 200);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('advertType', data.advertType);
    formData.append('link', data.link)
    formData.append('file', data.file);


    try {
      // Upload the file using the API
      const res = await fetch('https://media.tunycemedia.com/upload/advert', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload the file');
      }
      const responseData = await res.json();
      const link = responseData.file;
      const createAdvertData = {
        ...data,
        link: link,
      };
      console.log(link)
      const createResponse = await createAdvert(createAdvertData);
      console.log('Create Advert Response:', createResponse);

      setTimeout(() => {
        clearInterval(uploadInterval);
        setProgress(100);
      }, 3000);

      onClose();
    } catch (error) {
      console.error(error);
    }
  };


  const handleUploadClick = () => {
    onSubmit({ title, description, advertType, file, duration, type, link });


  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
    }
  };

  const handleBrowseFileClick = () => {
    const FileInput = document.getElementById('FileInput');
    if (FileInput) {
      FileInput.click();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose}></div>
      <div className="modal-container rounded-3xl bg-white w-96 md:w-1/2 mx-auto shadow-lg z-50">
        <div className="modal-content p-4 text-center justify-center items-center" onClick={handleModalClick}>
          <h2 className="text-2xl font-semibold mb-4">Upload Advert</h2>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 rounded-2xl border-none bg-gray-100 focus:bg-white focus:border-none"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="advertType"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              placeholder="Enter advertType"
              value={advertType}
              onChange={(e) => setAdvertType(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <select
              id="type"
              className="w-full px-3 py-2 border-none bg-gray-100 rounded-2xl focus:bg-white focus:border-orange-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="popup">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="flex p-4 justify-center">
            <div className="mb-4">
              <div
                className="border-dashed border rounded-2xl h-40 w-60 p-4 border-orange-500 cursor-pointer flex items-center justify-center"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={handleBrowseFileClick}
              >
                <label htmlFor="FileInput" className="cursor-pointer">
                  {File ? (
                    <p> File: {File.name}</p>
                  ) : (
                    <p>Drag & Drop  File or <span className="text-blue-500">Browse</span></p>
                  )}
                </label>
                <input
                  type="file"
                  id="FileInput"
                  accept={type === 'popup' ? '.jpg, .jpeg, .png, .gif' : '.mp4, .avi, .mov'}
                  style={{ display: 'none' }}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
          <button
            className="mt-4 bg-orange-500 w-60 text-white py-2 px-4 rounded-2xl hover:bg-orange-600"
            onClick={handleUploadClick}
          >
            Upload Advert
          </button>
          {progress > 0 && (
            <div className="mt-4 relative w-60 h-6 bg-gray-200 rounded-3xl">
              <div
                className="absolute h-full bg-orange-500 rounded-3xl"
                style={{ width: `${progress}%` }}
              ><p className="text-center font-bold z-50 text-sm text-gray-700">{progress}%</p></div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadAdvertModal;
