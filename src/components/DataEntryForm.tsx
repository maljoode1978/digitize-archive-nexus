
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataEntryFormProps {
  formData: {
    date: Date | undefined;
    invoiceNumber: string;
    vendor: string;
    itemNumber: string;
    description: string;
    price: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      date: Date | undefined;
      invoiceNumber: string;
      vendor: string;
      itemNumber: string;
      description: string;
      price: string;
    }>
  >;
  onSave: () => void;
  onSaveAndNext: () => void;
}

const DataEntryForm = ({
  formData,
  setFormData,
  onSave,
  onSaveAndNext,
}: DataEntryFormProps) => {
  const [vendors, setVendors] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showVendorSuggestions, setShowVendorSuggestions] = useState(false);
  const [filteredVendors, setFilteredVendors] = useState<string[]>([]);

  useEffect(() => {
    // Load vendors from mock data
    const loadVendors = async () => {
      try {
        const response = await fetch('/mock-scans.json');
        const data = await response.json();
        setVendors(data.vendors || []);
      } catch (error) {
        console.error('Failed to load vendors:', error);
      }
    };

    loadVendors();
  }, []);

  useEffect(() => {
    if (formData.vendor) {
      const filtered = vendors.filter(v => 
        v.toLowerCase().includes(formData.vendor.toLowerCase())
      );
      setFilteredVendors(filtered);
    } else {
      setFilteredVendors([]);
    }
  }, [formData.vendor, vendors]);

  const validateField = (name: string, value: any) => {
    let error = '';
    
    if (name === 'date' && !value) {
      error = 'Date is required (التاريخ مطلوب)';
    } else if (name === 'invoiceNumber' && !value) {
      error = 'Invoice number is required (رقم الفاتورة مطلوب)';
    } else if (name === 'vendor' && !value) {
      error = 'Vendor is required (المورّد مطلوب)';
    } else if (name === 'price') {
      if (!value) {
        error = 'Price is required (السعر مطلوب)';
      } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        error = 'Invalid price format (صيغة سعر غير صالحة)';
      }
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
    
    if (name === 'vendor') {
      setShowVendorSuggestions(true);
    }
  };

  const handleSelectVendor = (vendor: string) => {
    setFormData(prev => ({ ...prev, vendor }));
    setShowVendorSuggestions(false);
    validateField('vendor', vendor);
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
    validateField('date', date);
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      {/* Date input */}
      <div className="space-y-1">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date (التاريخ)
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date ? (
                format(formData.date, "PP")
              ) : (
                <span>Select date (اختر التاريخ)</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={handleDateChange}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
      </div>

      {/* Invoice number */}
      <div className="space-y-1">
        <label
          htmlFor="invoiceNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Invoice # (رقم الفاتورة)
        </label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.invoiceNumber && (
          <p className="text-sm text-red-600">{errors.invoiceNumber}</p>
        )}
      </div>

      {/* Vendor with autocomplete */}
      <div className="space-y-1 relative">
        <label
          htmlFor="vendor"
          className="block text-sm font-medium text-gray-700"
        >
          Vendor (المورّد)
        </label>
        <input
          type="text"
          id="vendor"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          onFocus={() => setShowVendorSuggestions(true)}
          onBlur={() => setTimeout(() => setShowVendorSuggestions(false), 100)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {showVendorSuggestions && filteredVendors.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto w-full">
            {filteredVendors.map((vendor) => (
              <li
                key={vendor}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelectVendor(vendor)}
              >
                {vendor}
              </li>
            ))}
          </ul>
        )}
        {errors.vendor && <p className="text-sm text-red-600">{errors.vendor}</p>}
      </div>

      {/* Item number */}
      <div className="space-y-1">
        <label
          htmlFor="itemNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Item # (رقم الصنف)
        </label>
        <input
          type="text"
          id="itemNumber"
          name="itemNumber"
          value={formData.itemNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (الوصف)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Price */}
      <div className="space-y-1">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price (السعر)
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-right"
          placeholder="0.00"
        />
        {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          onClick={onSave}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Save (حفظ)
        </Button>
        <Button
          type="button"
          onClick={onSaveAndNext}
          className="bg-accent hover:bg-accent/90 text-white"
        >
          Next (التالي)
        </Button>
      </div>
    </form>
  );
};

export default DataEntryForm;
