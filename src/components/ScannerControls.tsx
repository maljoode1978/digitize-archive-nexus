
import { useScan } from "../contexts/ScanContext";
import { useState } from "react";

const ScannerControls = () => {
  const { scanners, selectedScanner, setSelectedScanner, startScan, isScanning, rack, shelf, box, folder, addScannedFile } = useScan();
  const [scanProgress, setScanProgress] = useState(0);

  const handleStartScan = () => {
    startScan();
    
    // Simulate progress
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulate completing scan and adding a new file
    setTimeout(() => {
      const fileNumber = Math.floor(Math.random() * 5) + 1;
      const fileName = `sample_invoice_0${fileNumber}.jpg`;
      
      addScannedFile({
        fileName,
        timestamp: new Date().toISOString(),
        rack,
        shelf,
        box,
        folder,
        status: "Pending Review"
      });
      
      clearInterval(interval);
      setScanProgress(0);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="scanner" className="block text-sm font-medium text-gray-700 mb-1">
          Scanner (المسح الضوئي)
        </label>
        <select
          id="scanner"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={selectedScanner}
          onChange={(e) => setSelectedScanner(e.target.value)}
          disabled={isScanning}
        >
          {scanners.map((scanner) => (
            <option key={scanner} value={scanner}>
              {scanner}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          onClick={handleStartScan}
          disabled={isScanning}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            isScanning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isScanning ? (
            <span>Scanning... (جاري المسح...)</span>
          ) : (
            <span>Start Scan (بدء المسح)</span>
          )}
        </button>
        
        {isScanning && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-accent h-2.5 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerControls;
