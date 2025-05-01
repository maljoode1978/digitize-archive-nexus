import { useState, useEffect } from "react";
import { toast } from '@/hooks/use-toast';
import DataEntryForm from "../components/DataEntryForm";
import DocumentViewer from "../components/DocumentViewer";
import { z } from "zod";

interface InvoiceData {
  date: Date | undefined;
  invoiceNumber: string;
  vendor: string;
  itemNumber: string;
  description: string;
  price: string;
}

// Use relative paths (no leading slash)
const SampleImages = [
  "assets/samples/sample_invoice_01.jpg",
  "assets/samples/sample_invoice_02.jpg",
  "assets/samples/sample_invoice_03.jpg",
  "assets/samples/sample_invoice_04.jpg",
  "assets/samples/sample_invoice_05.jpg",
];

const DataEntryPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState<InvoiceData>({
    date: undefined,
    invoiceNumber: "",
    vendor: "",
    itemNumber: "",
    description: "",
    price: "",
  });

  // Form schema for validation
  const formSchema = z.object({
    date: z.date({
      required_error: "Date is required (التاريخ مطلوب)",
    }),
    invoiceNumber: z
      .string()
      .min(1, "Invoice number is required (رقم الفاتورة مطلوب)"),
    vendor: z.string().min(1, "Vendor is required (المورّد مطلوب)"),
    itemNumber: z.string().optional(),
    description: z.string().optional(),
    price: z.string().min(1, "Price is required (السعر مطلوب)"),
  });

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
      if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        handleSaveAndNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formData]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? SampleImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === SampleImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleSave = () => {
    try {
      formSchema.parse(formData);
      toast({
        title: "Form Saved",
        description: `Invoice #${formData.invoiceNumber} saved successfully`,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast({
            title: "Validation Error",
            description: err.message,
            variant: "destructive",
          });
        });
      }
    }
  };

  const handleSaveAndNext = () => {
    try {
      formSchema.parse(formData);
      toast({
        title: "Form Saved",
        description: `Invoice #${formData.invoiceNumber} saved successfully`,
      });
      // Clear form and move to next image
      setFormData({
        date: undefined,
        invoiceNumber: "",
        vendor: "",
        itemNumber: "",
        description: "",
        price: "",
      });
      handleNextImage();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast({
            title: "Validation Error",
            description: err.message,
            variant: "destructive",
          });
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Document viewer */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Invoice Viewer (عارض الفواتير)
          </h2>
          <DocumentViewer
            currentImage={SampleImages[currentImageIndex]}
            onPrevious={handlePrevImage}
            onNext={handleNextImage}
          />
        </div>

        {/* Data entry form */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Data Entry (إدخال البيانات)
          </h2>
          <DataEntryForm
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
            onSaveAndNext={handleSaveAndNext}
          />
          <div className="mt-4 text-sm text-gray-500">
            <p>Keyboard shortcuts (اختصارات لوحة المفاتيح):</p>
            <ul className="list-disc list-inside">
              <li>Ctrl + S: Save & stay (حفظ والبقاء)</li>
              <li>Ctrl + Enter: Save & next (حفظ والتالي)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEntryPage;
