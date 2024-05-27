import React, { useEffect } from 'react';

const ImageCanvas = ({
  canvasRef,
  uploadedImage,
  segmentationZones,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  isDrawing,
  currentZone,
  imageScale,
  handleScanZone,
}) => {
  useEffect(() => {
    if (uploadedImage) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => {
        const scaledWidth = img.width * imageScale;
        const scaledHeight = img.height * imageScale;
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      };
    }
  }, [uploadedImage, imageScale, canvasRef]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        style={{ cursor: 'crosshair', transform: `scale(${imageScale})`, transformOrigin: 'top left', maxWidth: '100%' }}
      />
      {segmentationZones.map((zone, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: zone.y * imageScale,
            left: zone.x * imageScale,
            width: zone.width * imageScale,
            height: zone.height * imageScale,
            border: '2px solid red',
            cursor: 'pointer',
          }}
          onClick={() => handleScanZone(zone)}
        >
          <span style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            fontSize: '12px',
            padding: '2px',
          }}>
            ID: {zone.id}
          </span>
        </div>
      ))}
      {isDrawing && currentZone && (
        <div
          style={{
            position: 'absolute',
            top: currentZone.y * imageScale,
            left: currentZone.x * imageScale,
            width: currentZone.width * imageScale,
            height: currentZone.height * imageScale,
            border: '2px solid blue',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export default ImageCanvas;
