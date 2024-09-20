import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Show image preview
        setFile(selectedFile); // Save the file for sending
        onImageUpload(reader.result); // Pass the image to AiAssist
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle form submission to send the image to the backend
  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file); // Attach the image file to FormData

      try {
        const response = await axios.post('http://localhost:3001/ask-ai-img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data && response.data.response) {
          setUploadMessage(response.data.response); // Set the AI response message
        } else {
          setUploadMessage('Image uploaded successfully'); // Default message
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploadMessage('Error uploading image'); // Error handling
      }

      // Clear the preview and file after upload
      setImage(null);
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between space-y-4">
  <h3>Upload Image</h3>
  <input type="file" accept="image/*" name="image" onChange={handleImageUpload} />
  
  {image && (
    <div className="bg-green-600 flex justify-center items-center w-64 h-60">
      <img src={image} alt="Uploaded Preview" className="max-w-full max-h-full" />
    </div>
  )}
  
  <div className="flex items-center space-x-2">
    {image && (
      <button onClick={handleSubmit} className="p-2 bg-blue-500 rounded-full text-white">
        <FiSend size={24} />
      </button>
    )}
  </div>

  {uploadMessage && <p>{uploadMessage}</p>}
</div>

  );
};

export default ImageUploader;
