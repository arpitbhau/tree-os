// Radhe Radhe 

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const Notion = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    setShowPopup(false);
    setTimeout(() => {
      window.open('https://www.notion.so/', '_blank');
      navigate('/');
    }, 350);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setTimeout(() => navigate('/'), 350);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.35
            }}
            className="bg-neutral-900/85 rounded-2xl p-10 
              min-w-[340px] min-h-[180px] 
              flex flex-col items-center justify-center 
              border border-white/10 backdrop-blur-lg 
              shadow-2xl"
          >
            <div className="text-2xl mb-4 font-semibold text-white text-center tracking-wider">
              Open Notion in a new tab?
            </div>
            <div className="text-neutral-400 text-sm mb-8 text-center max-w-[260px]">
              You are about to leave this workspace and open <span className="text-white font-medium">notion.so</span> in a new browser tab.
            </div>
            <div className="flex gap-9">
              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                className="bg-gradient-to-br from-green-600 to-green-500 
                  rounded-full w-14 h-14 flex items-center justify-center 
                  text-2xl cursor-pointer shadow-md hover:shadow-lg 
                  focus:outline-none active:scale-95 transition-all 
                  text-white"
                aria-label="Confirm"
              >
                <Check size={30} strokeWidth={2.5} />
              </button>
              
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="bg-gradient-to-br from-[#3a2323] to-[#e74c3c] 
                  rounded-full w-14 h-14 flex items-center justify-center 
                  text-2xl cursor-pointer shadow-md hover:shadow-lg 
                  focus:outline-none active:scale-95 transition-all 
                  text-white"
                aria-label="Cancel"
              >
                <X size={30} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Notion;