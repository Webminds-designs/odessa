// app/admin/layout.tsx
import React from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex-shrink-0">
        <AdminSidebar />
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-primary">{children}</main>
    </div>
  );
}
