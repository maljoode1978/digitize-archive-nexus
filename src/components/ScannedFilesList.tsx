
import { useScan } from "../contexts/ScanContext";
import { formatDistanceToNow } from "date-fns";

const ScannedFilesList = () => {
  const { scannedFiles, setSelectedFile } = useScan();

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return "Unknown time";
    }
  };

  if (scannedFiles.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No scanned files yet (لا توجد ملفات ممسوحة بعد)
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File Name (اسم الملف)
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp (التوقيت)
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Shelf Code (رمز التخزين)
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status (الحالة)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {scannedFiles.map((file) => (
            <tr 
              key={file.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedFile(file)}
            >
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                {file.fileName}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                {formatTimestamp(file.timestamp)}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                {file.shelfCode}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {file.status} (قيد المراجعة)
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScannedFilesList;
