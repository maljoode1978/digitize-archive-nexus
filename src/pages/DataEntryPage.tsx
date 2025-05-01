import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
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

/* relative paths → Vite rewrites for GitHub Pages */
const sampleImages = [
  "assets/samples/sample_invoice_01.jpg",
  "assets/samples/sample_invoice_02.jpg",
  "assets/samples/sample_invoice_03.jpg",
  "assets/samples/sample_invoice_04.jpg",
  "assets/samples/sample_invoice_05.jpg",
];

const formSchema = z.object({
  date: z.date({ required_error: "Date is required (التاريخ مطلوب)" }),
  invoiceNumber: z
    .string()
    .min(1, "Invoice number is required (رقم الفاتورة مطلوب)"),
  vendor: z.string().min(1, "Vendor is required (المورّد مطلوب)"),
  itemNumber: z.string().optional(),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required (السعر مطلوب)"),
});

export default function DataEntryPage() {
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState<InvoiceData>({
    date: undefined,
    invoiceNumber: "",
    vendor: "",
    itemNumber: "",
    description: "",
    price: "",
  });

  /* keyboard shortcuts */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleSaveAndNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [formData]);

  /* navigation helpers */
  const prev = () => setIndex((i) => (i === 0 ? sampleImages.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === sampleImages.length - 1 ? 0 : i + 1));

  const resetForm = () =>
    setFormData({
      date: undefined,
      invoiceNumber: "",
      vendor: "",
      itemNumber: "",
      description: "",
      price: "",
    });

  /* save handlers */
  const handleSave = () => {
    try {
      formSchema.parse(formData);
      toast({
        title: "Form Saved",
        description: `Invoice #${formData.invoiceNumber} saved successfully`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((e) =>
          toast({
            title: "Validation Error",
            description: e.message,
            variant: "destructive",
          }),
        );
      }
    }
  };

  const handleSaveAndNext = () => {
    handleSave();
    resetForm();
    next();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* viewer */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Invoice Viewer (عارض الفواتير)
          </h2>
          <DocumentViewer
            currentImage={sampleImages[index]}
            onPrevious={prev}
            onNext={next}
          />
        </div>

        {/* form */}
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
              <li>Ctrl + S: Save &amp; stay (حفظ والبقاء)</li>
              <li>Ctrl + Enter: Save &amp; next (حفظ والتالي)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
