import React, { useEffect, useRef } from 'react';

const TestCanvasImages = ({
  canvasRef,
  uploadedImage,
  segmentationZones = [],
  imageScale = 1,
}) => {
  useEffect(() => {
    if (uploadedImage) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width * imageScale, img.height * imageScale);

        // Draw existing zones
        segmentationZones.forEach((zone) => {
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.strokeRect(zone.x * imageScale, zone.y * imageScale, zone.width * imageScale, zone.height * imageScale);
          ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
          ctx.fillRect(zone.x * imageScale, zone.y * imageScale, zone.width * imageScale, zone.height * imageScale);
        });
      };
    }
  }, [uploadedImage, segmentationZones, imageScale]);

  return (
    <canvas
      ref={canvasRef}
      width={620} // Adjust the width and height as needed
      height={800}
      style={{ border: '1px solid black' }}
    />
  );
};

export default TestCanvasImages;
