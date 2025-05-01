
import { useScan } from "../contexts/ScanContext";

const ShelvingMetadata = () => {
  const { rack, shelf, box, folder, setRack, setShelf, setBox, setFolder } = useScan();

  const NumericInput = ({ 
    label, 
    arabicLabel, 
    value, 
    onChange 
  }: { 
    label: string; 
    arabicLabel: string; 
    value: number; 
    onChange: (value: number) => void 
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value);
      if (!isNaN(newValue) && newValue > 0) {
        onChange(newValue);
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} # ({arabicLabel})
        </label>
        <div className="flex">
          <button
            type="button"
            className="px-2 py-1 border border-gray-300 rounded-l-md bg-gray-100"
            onClick={() => value > 1 && onChange(value - 1)}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            className="w-full text-center border-y border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            value={value}
            onChange={handleChange}
          />
          <button
            type="button"
            className="px-2 py-1 border border-gray-300 rounded-r-md bg-gray-100"
            onClick={() => onChange(value + 1)}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <NumericInput
        label="Rack"
        arabicLabel="رف"
        value={rack}
        onChange={setRack}
      />
      <NumericInput
        label="Shelf"
        arabicLabel="طابق"
        value={shelf}
        onChange={setShelf}
      />
      <NumericInput
        label="Box"
        arabicLabel="صندوق"
        value={box}
        onChange={setBox}
      />
      <NumericInput
        label="Folder"
        arabicLabel="مجلد"
        value={folder}
        onChange={setFolder}
      />

      <div className="col-span-2 mt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Shelf Code (رمز التخزين):
          </span>
          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
            R{rack}-S{shelf}-B{box}-F{folder}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShelvingMetadata;
