import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  id?: string;
  name?: string;
  email?: string;
}

const menuVariants = {
  closed: {
    opacity: 0,
    y: -4,
    scale: 0.95,
    transition: { duration: 0.2 }
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const itemVariants = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0 }
};

export default function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const router = useRouter();
  // Initialize user state as null instead of an empty object.
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    onClose();
    router.push("/");
  };

  const handleLogin = () => {
    onClose();
    router.push("/login");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={onClose} />
          <motion.div
            className="absolute right-0 top-full mt-2 w-48 bg-[#181818] rounded-lg shadow-lg border border-[#292929] overflow-hidden z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div variants={itemVariants} className="border-b border-[#292929]">
              <Link
                href="/profile"
                className="block px-4 py-3 text-white hover:bg-[#292929] transition-colors"
                onClick={onClose}
              >
                Profile
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                onClick={user ? handleLogout : handleLogin}
                className="w-full text-left px-4 py-3 text-white hover:bg-[#292929] transition-colors"
              >
                {user ? "Logout" : "Login"}
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
