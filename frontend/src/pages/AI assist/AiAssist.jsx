import React, { useState } from 'react';
import VoiceToText from '../../components/VoiceToText';
import WebcamCapture from '../../components/WebcamCapture';
import ImageUploader from '../../components/ImageUploader';
import { FiMic, FiSend, FiEdit2, FiCamera, FiLayers, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';

function AiAssist() {
  const [showWebcam, setShowWebcam] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);

  // Toggle Webcam or ImageUploader
  const toggleWebcam = () => {
    setShowWebcam(!showWebcam);
    setShowImageUploader(false);
  };

  const toggleImageUploader = () => {
    setShowImageUploader(!showImageUploader);
    setShowWebcam(false);
  };

  // Handle image upload (from ImageUploader component)
  const handleImageUpload = (imageSrc) => {
    setMessages([...messages, { image: imageSrc, sender: 'user' }]);
  };

  // Handle AI response from image upload
  const handleImageResponse = (response) => {
    setMessages([...messages, { text: response, sender: 'ai' }]);
  };

  // Start a new conversation by clearing previous messages
  const startNewConversation = () => {
    setMessages([]);
    setText('');
  };

  // Voice-to-text functionality
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognition = new recognition();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  const startListening = () => {
    setIsListening(true);
    speechRecognition.start();

    speechRecognition.onresult = (event) => {
      let currentText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentText += event.results[i][0].transcript;
      }
      setText(currentText);
    };

    speechRecognition.onend = () => {
      setIsListening(false);
    };
  };

  // Send the text as a message (like chatbot functionality)
  const handleSend = async () => {
    if (text.trim() !== '') {
      setMessages([...messages, { text, sender: 'user' }]);
      
      try {
        const response = await axios.post('http://localhost:3001/ask-ai', { query: text });
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.diagnosis, sender: 'ai' },
        ]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Sorry, something went wrong.', sender: 'ai' },
        ]);
      }
      
      setText('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Top Section with Back Button and Icon */}
      <div className="flex justify-between items-center mb-4">
        <Link to="/home"><button className="text-black">
          <FiArrowLeft size={24} />
        </button></Link>
        <button className="text-black">
          <FiLayers size={24} />
        </button>
      </div>

      {/* Voice, Image Upload, and Webcam Buttons */}
      <div className="flex justify-center items-center mb-4">
        <div className="flex border rounded-full px-4 py-2 bg-white shadow">
          <button
            className="flex justify-center items-center px-4"
            onClick={startNewConversation}
          >
            <FiEdit2 size={24} />
          </button>
          <div className="border-l mx-2" />
          <button
            className="flex justify-center items-center px-4"
            onClick={toggleWebcam}
          >
            <FiCamera size={24} />
          </button>
          <div className="border-l mx-2" />
          <button
            className="flex justify-center items-center px-4"
            onClick={toggleImageUploader}
          >
            <FiCamera size={24} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-grow space-y-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.sender === 'user'
                ? 'self-end bg-green-500'  // Green background for user messages
                : 'self-start bg-black'    // Black background for AI responses
            } text-white px-4 py-2 rounded-lg max-w-xs`}
          >
            {msg.text ? (
              <p className='font-bold'>{msg.text}</p>
            ) : (
              <img src={msg.image} alt="Uploaded" className="rounded-lg bg-green-500 max-w-xs" />
            )}
          </div>
        ))}

        {/* Webcam and ImageUploader Components */}
        {showWebcam && <WebcamCapture />}
        {showImageUploader && (
          <ImageUploader
            onImageUpload={handleImageUpload}
            onImageResponse={handleImageResponse}
          />
        )}
      </div>

      {/* Bottom Input Section */}
      <div className="flex items-center p-2 bg-white rounded-full shadow-lg mt-4">
        <button className="p-2" onClick={startListening}>
          <FiMic size={24} />
        </button>
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-grow px-4 py-2 text-sm outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="p-2" onClick={handleSend}>
          <FiSend size={24} />
        </button>
      </div>
      <BottomNav/>
    </div>
  );
}

export default AiAssist;
