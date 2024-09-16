import React, { useState } from 'react';

const VoiceToText = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognition = new recognition();

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  const startListening = () => {
    speechRecognition.start();
    setIsListening(true);

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

  const stopListening = () => {
    speechRecognition.stop();
    setIsListening(false);
  };

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <textarea
        rows="10"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default VoiceToText;
