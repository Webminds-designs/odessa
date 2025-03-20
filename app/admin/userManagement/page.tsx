"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaTrash, FaEdit } from "react-icons/fa";

type User = {
  id?: string;
  _id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  activity?: string;
  role?: string;
  image?: string;
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users");

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get display name from user object
  const getUserDisplayName = (user: User): string => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user.name) {
      return user.name;
    } else if (user.firstName) {
      return user.firstName;
    } else if (user.email) {
      return user.email.split("@")[0];
    }
    return "Unknown User";
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const displayName = getUserDisplayName(user).toLowerCase();
    const email = user.email.toLowerCase();
    const role = (user.role || "user").toLowerCase();

    return (
      displayName.includes(searchLower) ||
      email.includes(searchLower) ||
      role.includes(searchLower)
    );
  });

  // Handle user deletion
  const handleDelete = async (user: User) => {
    if (
      !confirm(`Are you sure you want to delete ${getUserDisplayName(user)}?`)
    ) {
      return;
    }

    try {
      const userId = user._id || user.id;
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((u) => (u._id || u.id) !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  // Handle opening the edit modal
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Handle saving updated user
  const handleSaveUser = async (updatedUser: User) => {
    try {
      const userId = updatedUser._id || updatedUser.id;
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      // Update users state with updated user
      setUsers((prev) =>
        prev.map((u) => ((u._id || u.id) === userId ? updatedUser : u))
      );
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brown"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="p-2 bg-gray-800 rounded-lg">
            <FaBell />
          </button>
        </div>
      </div>

      <div className="rounded-lg p-6 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-2">Name</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Role</th>
              <th className="text-left py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id || user.id}
                  className="border-b border-gray-700 hover:bg-gray-900 transition"
                >
                  <td className="py-3 px-2 flex items-center gap-2">
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={getUserDisplayName(user)}
                          className="h-10 w-10 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-600 flex items-center justify-center">
                          {getUserDisplayName(user).charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    {/* Name */}
                    {getUserDisplayName(user)}
                  </td>
                  <td className="py-3 px-2">{user.email}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        user.role === "admin"
                          ? "bg-brown text-white"
                          : "bg-gray-700"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex gap-2">
                      <button
                        className="p-2 rounded transition"
                        onClick={() => handleEditUser(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-2 bg-red-600 rounded hover:bg-red-700 transition"
                        onClick={() => handleDelete(user)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  {searchQuery
                    ? "No users match your search."
                    : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={selectedUser.firstName || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={selectedUser.lastName || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-1">Role</label>
                <select
                  className="bg-gray-700 text-white px-3 py-2 rounded w-full"
                  value={selectedUser.role || "user"}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-brown rounded hover:bg-opacity-90 transition"
                onClick={() => handleSaveUser(selectedUser)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
