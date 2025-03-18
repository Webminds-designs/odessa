"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaTrash } from "react-icons/fa";

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

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/users');
        
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (user.firstName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (user.lastName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.role?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  // Handler for deleting a user
  const handleDelete = async (user: User) => {
    const userId = user._id || user.id;
    if (!userId) return;

    if (confirm(`Are you sure you want to delete ${user.name || user.email}?`)) {
      try {
        const res = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });
        
        if (!res.ok) {
          throw new Error('Failed to delete user');
        }
        
        setUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  // Format user display name
  const getUserDisplayName = (user: User) => {
    if (user.name) return user.name;
    if (user.firstName || user.lastName) {
      return `${user.firstName || ''} ${user.lastName || ''}`.trim();
    }
    return user.email;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch />
            </span>
            <input
              type="search"
              className="bg-[#1a1a1a] text-white rounded-md pl-10 pr-4 py-2 focus:outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Notification icon */}
          <button className="relative p-2 rounded-full hover:bg-[#1a1a1a] transition-colors">
            <FaBell />
          </button>

          {/* Admin avatar/name */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="font-bold">A</span>
            </div>
            <span className="hidden md:inline">Admin</span>
          </div>
        </div>
      </div>

      {/* Users table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="bg-red-800 text-white p-4 rounded-md">{error}</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-2 font-semibold">Name</th>
                <th className="py-3 px-2 font-semibold">Email</th>
                <th className="py-3 px-2 font-semibold">Role</th>
                <th className="py-3 px-2 font-semibold">Action</th>
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
                      <span className={`px-2 py-1 rounded ${
                        user.role === 'admin' ? 'bg-brown text-white' : 'bg-gray-700'
                      }`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
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
                  <td colSpan={4} className="py-4 text-center">
                    {searchQuery
                      ? "No users found matching your search."
                      : "No users available in the list."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}