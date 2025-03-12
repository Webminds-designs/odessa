import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetModal = ({ isOpen, onClose }: PasswordResetModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 backdrop-blur-lg"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="bg-[#292929] p-8 rounded-lg z-50 w-[500px]">
              <h2 className="text-xl text-center font-semibold mb-6">Reset Password</h2>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block mb-2">Old Password</label>
                  <input
                    type="password"
                    className="bg-[#181818] p-2 w-full rounded"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block mb-2">New Password</label>
                  <input
                    type="password"
                    className="bg-[#181818] p-2 w-full rounded"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="bg-[#181818] p-2 w-full rounded"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-[#181818] text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-brown text-white px-4 py-2 rounded-md"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PasswordResetModal;
