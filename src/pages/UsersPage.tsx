import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Viewer", status: "Active" },
];

const UserTable = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {mockUsers.map((user) => (
          <tr key={user.id} className="border-t">
            <td className="px-4 py-2">{user.id}</td>
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 rounded-full text-white ${
                  user.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {user.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AddUserButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700"
  >
    Add User (إضافة مستخدم)
  </button>
);

const UserFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-lg">
      <h2 className="text-xl font-bold mb-4">User Form</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select className="w-full border rounded-lg px-3 py-2">
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <input type="checkbox" className="mr-2" /> Active
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg" onClick={onClose}>
            Cancel (إلغاء)
          </button>
          <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg">
            Save (حفظ)
          </button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
);

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <AddUserButton onClick={() => setIsModalOpen(true)} />
      <UserTable />
      <UserFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UsersPage;
