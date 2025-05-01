import { useState } from "react";
import { ScanProvider } from "../contexts/ScanContext";
import ScannerControls from "../components/ScannerControls";
import ShelvingMetadata from "../components/ShelvingMetadata";
import ScannedFilesList from "../components/ScannedFilesList";
import ScanPreview from "../components/ScanPreview";
import { toast } from "@/hooks/use-toast";

const ScanPage = () => {
  const [showMaintenance, setShowMaintenance] = useState(false);

  const maintenanceActions = [
    "Feeder Cleaning Log",
    "Roller Life Counter",
    "Reset Counter",
  ];

  const toggleMaintenance = () => setShowMaintenance((prev) => !prev);

  const handleMaintenanceAction = (action: string) => {
    toast({
      title: "Maintenance Action",
      description: `${action} selected`,
    });
    setShowMaintenance(false);
  };

  return (
    <ScanProvider>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* ─── Left (scanner controls + preview) ─── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Scanner controls */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                  Scanner Control (التحكم بالماسح)
                </h2>

                {/* Maintenance dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleMaintenance}
                    className="bg-secondary hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                  >
                    <span>Maintenance (الصيانة)</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${
                        showMaintenance ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {showMaintenance && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md py-1 z-10">
                      {maintenanceActions.map((label) => (
                        <button
                          key={label}
                          onClick={() => handleMaintenanceAction(label)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <ScannerControls />
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Preview (المعاينة)
              </h3>
              <ScanPreview />
            </div>
          </div>

          {/* ─── Right (metadata + scanned list) ─── */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Shelving Metadata (بيانات التخزين)
              </h3>
              <ShelvingMetadata />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Scanned Files (الملفات الممسوحة)
              </h3>
              <ScannedFilesList />
            </div>
          </div>
        </div>
      </div>
    </ScanProvider>
  );
};

export default ScanPage;
