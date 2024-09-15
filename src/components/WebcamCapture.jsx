import React, { useRef, useState } from 'react';

const WebcamCapture = () => {
  const [webcamActive, setWebcamActive] = useState(false);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startWebcam = () => {
    setWebcamActive(true);
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing webcam: ", error);
        });
    }
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageData = canvasRef.current.toDataURL('image/png');
    setImage(imageData);
    stopWebcam();
  };

  const stopWebcam = () => {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setWebcamActive(false);
  };

  return (
    <div>
      <h3>Capture from Webcam</h3>
      {webcamActive ? (
        <>
          <video ref={videoRef} autoPlay width="640" height="480" />
          <button onClick={captureImage}>Capture Image</button>
          <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
        </>
      ) : (
        <button onClick={startWebcam}>Start Webcam</button>
      )}
      {image && <img src={image} alt="Captured" width="200" />}
    </div>
  );
};

export default WebcamCapture;
