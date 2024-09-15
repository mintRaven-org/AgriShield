import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  return (
    <div>
      <h3>Capture from Webcam</h3>
      {/* Webcam Feed */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"  // Makes the webcam feed responsive to screen size
      />

      {/* Capture Button */}
      <button onClick={capture}>Capture Photo</button>

      {/* Display Captured Image */}
      {imageSrc && (
        <div>
          <h2>Captured Image:</h2>
          <img src={imageSrc} alt="Captured" width="200" />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
