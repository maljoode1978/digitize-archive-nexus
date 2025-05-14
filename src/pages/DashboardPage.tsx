import React from "react";

const SummaryCard = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-lg font-bold mb-2">{label}</h3>
    <p className="text-2xl font-semibold text-gray-700">{value}</p>
  </div>
);

const LineChartCard = () => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-lg font-bold mb-2">Scans Over Time (المسح عبر الزمن)</h3>
    <div className="h-48 bg-gray-100"></div>
  </div>
);

const PieChartCard = () => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-lg font-bold mb-2">Review Status (حالة المراجعة)</h3>
    <div className="h-48 bg-gray-100"></div>
  </div>
);

const TableCard = () => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h3 className="text-lg font-bold mb-2">Recent Activity</h3>
    <table className="min-w-full bg-white rounded-lg">
      <thead>
        <tr>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Action</th>
          <th className="px-4 py-2">User</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="px-4 py-2">2025-05-12</td>
          <td className="px-4 py-2">Scanned Document</td>
          <td className="px-4 py-2">John Doe</td>
        </tr>
        <tr className="border-t">
          <td className="px-4 py-2">2025-05-11</td>
          <td className="px-4 py-2">Reviewed Document</td>
          <td className="px-4 py-2">Jane Smith</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const DashboardPage = () => (
  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    <SummaryCard label="Total Scans" value="1,234" />
    <SummaryCard label="Pending Reviews" value="56" />
    <SummaryCard label="Users" value="12" />
    <SummaryCard label="Avg. Throughput" value="89/min" />
    <LineChartCard />
    <PieChartCard />
    <TableCard />
  </div>
);

export default DashboardPage;
