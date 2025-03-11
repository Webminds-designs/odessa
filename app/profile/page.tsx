"use client";
import React from "react";
import ComingSoon from "../components/ComingSoonProps";
import { FaUserAstronaut } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <ComingSoon
      title="User Profile"
      icon={<FaUserAstronaut className="w-16 h-16 text-gray-500" />}
    />
  );
};

export default ProfilePage;
