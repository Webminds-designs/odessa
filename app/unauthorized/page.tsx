"use client";

import React from "react";
import { useRouter } from "next/navigation";

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-6">You do not have permission to view this page.</p>
      <button
        onClick={handleLoginRedirect}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go to Login
      </button>
    </div>
  );
};

export default UnauthorizedPage;
