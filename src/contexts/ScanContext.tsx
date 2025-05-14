
import React, { createContext, useState, useContext, useEffect } from 'react';

interface ScannedFile {
  id: string;
  fileName: string;
  timestamp: string;
  rack: number;
  shelf: number;
  box: number;
  folder: number;
  shelfCode: string;
  status: string;
}

interface ScanContextType {
  scanners: string[];
  selectedScanner: string;
  setSelectedScanner: (scanner: string) => void;
  scannedFiles: ScannedFile[];
  addScannedFile: (file: Omit<ScannedFile, 'id' | 'shelfCode'>) => void;
  isScanning: boolean;
  startScan: () => void;
  rack: number;
  shelf: number;
  box: number;
  folder: number;
  setRack: (value: number) => void;
  setShelf: (value: number) => void;
  setBox: (value: number) => void;
  setFolder: (value: number) => void;
  selectedFile: ScannedFile | null;
  setSelectedFile: (file: ScannedFile | null) => void;
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
};

export const ScanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scanners, setScanners] = useState<string[]>([]);
  const [selectedScanner, setSelectedScanner] = useState<string>('');
  const [scannedFiles, setScannedFiles] = useState<ScannedFile[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [rack, setRack] = useState(1);
  const [shelf, setShelf] = useState(1);
  const [box, setBox] = useState(1);
  const [folder, setFolder] = useState(1);
  const [selectedFile, setSelectedFile] = useState<ScannedFile | null>(null);

  // Load mock data
  useEffect(() => {
  const loadMockData = async () => {
    try {
      const base = import.meta.env.BASE_URL;
      const response = await fetch(`${base}mock-scans.json`);  // ✅ FIXED (added base URL)
      const data = await response.json();
      setScanners(data.scanners);
      setSelectedScanner(data.scanners[0]);
      setScannedFiles(data.scannedFiles || []);
    } catch (error) {
      console.error('Failed to load mock data:', error);
    }
  };

  loadMockData();
}, []);


  const generateShelfCode = (r: number, s: number, b: number, f: number) => {
    return `R${r}-S${s}-B${b}-F${f}`;
  };

  const startScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      
      // After scanning is complete, don't automatically add files
      // The user will click the "Start Scan" button to add files
    }, 2000);
  };

  const addScannedFile = (file: Omit<ScannedFile, 'id' | 'shelfCode'>) => {
    const newFile: ScannedFile = {
      ...file,
      id: Date.now().toString(),
      shelfCode: generateShelfCode(file.rack, file.shelf, file.box, file.folder)
    };
    
    setScannedFiles(prevFiles => [newFile, ...prevFiles]);
  };

  return (
    <ScanContext.Provider
      value={{
        scanners,
        selectedScanner,
        setSelectedScanner,
        scannedFiles,
        addScannedFile,
        isScanning,
        startScan,
        rack,
        shelf,
        box,
        folder,
        setRack,
        setShelf,
        setBox,
        setFolder,
        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};
