
import { useState, useRef, useEffect } from "react";
import { useScan } from "../contexts/ScanContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const SampleImages = [
  "/assets/samples/sample_invoice_01.jpg",
  "/assets/samples/sample_invoice_02.jpg",
  "/assets/samples/sample_invoice_03.jpg",
  "/assets/samples/sample_invoice_04.jpg",
  "/assets/samples/sample_invoice_05.jpg",
];

const ScanPreview = () => {
  const { selectedFile } = useScan();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate images for the carousel display
  const sampleImages = SampleImages.map((path, index) => ({
    id: `sample-${index + 1}`,
    path,
    alt: `Sample Invoice ${index + 1}`,
  }));

  // Scroll to selected item
  useEffect(() => {
    if (selectedFile) {
      // Find the index of the selected file in our sample images
      const fileNameNumber = selectedFile.fileName.match(/\d+/);
      if (fileNameNumber) {
        const index = parseInt(fileNameNumber[0]) - 1;
        if (index >= 0 && index < sampleImages.length) {
          setActiveIndex(index);
          scrollToImage(index);
        }
      }
    }
  }, [selectedFile]);

  const scrollToImage = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const imageWidth = container.querySelector("div")?.clientWidth || 0;
      container.scrollTo({
        left: index * (imageWidth + 16), // 16px for gap
        behavior: "smooth",
      });
    }
  };

  const handleOpenLightbox = (index: number) => {
    setActiveIndex(index);
    setShowLightbox(true);
  };

  return (
    <div className="space-y-4">
      {/* Main preview image */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={sampleImages[activeIndex].path}
          alt={sampleImages[activeIndex].alt}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/800x600?text=Invoice+Preview";
          }}
        />
      </div>

      {/* Thumbnail strip */}
      <div 
        className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin"
        ref={scrollContainerRef}
      >
        {sampleImages.map((image, index) => (
          <div
            key={image.id}
            className={`shrink-0 cursor-pointer transition-all duration-200 ${
              index === activeIndex
                ? "opacity-100 border-2 border-primary"
                : "opacity-70 border border-gray-200 hover:opacity-100"
            }`}
            onClick={() => {
              setActiveIndex(index);
              scrollToImage(index);
            }}
            onDoubleClick={() => handleOpenLightbox(index)}
          >
            <div className="h-20 w-28 relative">
              <img
                src={image.path}
                alt={image.alt}
                className="h-full w-full object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/160x120?text=Thumbnail";
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox dialog */}
      <Dialog open={showLightbox} onOpenChange={setShowLightbox}>
        <DialogContent className="max-w-5xl">
          <div className="flex items-center justify-center">
            <img
              src={sampleImages[activeIndex].path}
              alt={sampleImages[activeIndex].alt}
              className="max-h-[80vh] max-w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/1200x800?text=Unable+to+load+image";
              }}
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : sampleImages.length - 1))}
              className="p-2 mx-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev < sampleImages.length - 1 ? prev + 1 : 0))}
              className="p-2 mx-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScanPreview;
