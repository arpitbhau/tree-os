// Radhe Radhe 

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import useAppStore from '../../../../store/appStore';

const Spotify = () => {
  const navigate = useNavigate();
  const isAppOpened = useAppStore((state) => state.isAppOpened);
  const setIsAppOpened = useAppStore((state) => state.setIsAppOpened);

  const handleOpenSpotify = () => {
    navigate("/");
    window.open('https://open.spotify.com', '_blank');
    setIsAppOpened(false);
  };

  const handleCancel = () => {
    setIsAppOpened(false);
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/20">
      <AnimatePresence mode="wait">
        {isAppOpened && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
              onClick={handleCancel}
            />

            {/* Popup */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed z-50"
            >
              <div className="bg-neutral-900/85 rounded-2xl p-10 shadow-2xl 
                min-w-[340px] min-h-[180px] flex flex-col items-center justify-center 
                border border-white/10 backdrop-blur-lg"
              >
                <div className="text-2xl mb-4 font-semibold text-white text-center tracking-wider">
                  Open Spotify in a new tab?
                </div>
                <div className="text-neutral-400 text-sm mb-8 text-center max-w-[260px]">
                  You are about to leave this workspace and open <span className="text-[#1ed760] font-medium">Spotify</span> in a new browser tab.
                </div>
                <div className="flex gap-9">
                  {/* Confirm Button */}
                  <button
                    onClick={handleOpenSpotify}
                    className="bg-gradient-to-br from-[#1ed760] to-[#1db954] 
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Spotify;