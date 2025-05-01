
import { useState } from "react";

interface DocumentViewerProps {
  currentImage: string;
  onPrevious: () => void;
  onNext: () => void;
}

const DocumentViewer = ({ currentImage, onPrevious, onNext }: DocumentViewerProps) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
          </button>
          <button
            onClick={handleRotate}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
          </button>
          <span className="flex items-center text-sm text-gray-500">
            {zoomLevel}%
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={onNext}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <img
            src={currentImage}
            alt="Document preview"
            className="transition-all duration-300"
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              maxHeight: "70vh",
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/800x1000?text=Invoice+Document";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
