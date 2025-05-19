// Jai Shree Ram

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../../../store/appStore';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';

// File system structure
const FILE_SYSTEM = {
  "/": {
    type: "directory",
    contents: {
      "home": {
        type: "directory",
        contents: {
          "user": {
            type: "directory",
            contents: {
              "Documents": {
                type: "directory",
                contents: {
                  "project.txt": { type: "file", size: "2.5KB" },
                  "notes.md": { type: "file", size: "1.2KB" }
                }
              },
              "Downloads": {
                type: "directory",
                contents: {
                  "image.jpg": { type: "file", size: "3.1MB" },
                  "document.pdf": { type: "file", size: "4.2MB" }
                }
              },
              "config.json": { type: "file", size: "1.8KB" }
            }
          }
        }
      },
      "etc": {
        type: "directory",
        contents: {
          "config.txt": { type: "file", size: "0.8KB" }
        }
      },
      "bin": {
        type: "directory",
        contents: {
          "app": { type: "file", size: "2.1MB" }
        }
      }
    }
  }
};

// Icons for different file types
const FILE_ICONS = {
  directory: (
    <svg className="w-5 h-5 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  file: (
    <svg className="w-5 h-5 text-[#8e8e8e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  )
};

function FileExplorer() {
  const navigate = useNavigate();
  const setIsAppOpened = useAppStore((state) => state.setIsAppOpened);
  const [currentPath, setCurrentPath] = useState('/');
  const [showExplorer, setShowExplorer] = useState(false);
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [position, setPosition] = useState({ 
    x: Math.max(0, (window.innerWidth - 800) / 2), 
    y: Math.max(0, (window.innerHeight - 500) / 2) 
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevSize, setPrevSize] = useState({ width: 800, height: 500 });
  const [prevPosition, setPrevPosition] = useState({ 
    x: Math.max(0, (window.innerWidth - 800) / 2), 
    y: Math.max(0, (window.innerHeight - 500) / 2) 
  });
  const [expandedFolders, setExpandedFolders] = useState(new Set(['/']));

  // Sound effects
  const openSound = new Audio('/sounds/terminal-open.mp3');
  const closeSound = new Audio('/sounds/terminal-close.mp3');
  const clickSound = new Audio('/sounds/key-press.mp3');

  useEffect(() => {
    if (showExplorer) {
      openSound.play();
    } else {
      closeSound.play();
    }
  }, [showExplorer]);

  // Open explorer animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowExplorer(true);
      setIsAppOpened(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const closeExplorer = () => {
    closeSound.play();
    setShowExplorer(false);
    setTimeout(() => {
      setIsAppOpened(false);
      navigate('/');
    }, 500);
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 });
      setPosition({ x: 0, y: 40 });
      setIsMaximized(true);
    } else {
      setSize(prevSize);
      setPosition(prevPosition);
      setIsMaximized(false);
    }
  };

  const getCurrentContents = () => {
    let current = FILE_SYSTEM;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    for (const part of pathParts) {
      if (current[part] && current[part].type === 'directory') {
        current = current[part].contents;
      } else {
        return null;
      }
    }
    
    return current;
  };

  const navigateToPath = (path) => {
    clickSound.play();
    setCurrentPath(path);
  };

  const toggleFolder = (folderPath) => {
    clickSound.play();
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const handleFileClick = (fileName) => {
    clickSound.play();
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#';
    link.download = fileName;
    link.click();
  };

  const renderPath = () => {
    const parts = currentPath.split('/').filter(Boolean);
    return (
      <div className="flex items-center gap-1 text-sm text-[#8e8e8e]">
        <span onClick={() => navigateToPath('/')} className="cursor-pointer hover:text-white transition-colors">/</span>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span className="text-[#666]">/</span>
            <span
              onClick={() => navigateToPath('/' + parts.slice(0, index + 1).join('/'))}
              className="cursor-pointer hover:text-white transition-colors"
            >
              {part}
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderContents = (contents, parentPath = '') => {
    if (!contents) return null;

    return Object.entries(contents).map(([name, item]) => {
      const fullPath = parentPath ? `${parentPath}/${name}` : `/${name}`;
      const isExpanded = expandedFolders.has(fullPath);

      return (
        <div key={name} className="pl-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 py-1.5 px-2 hover:bg-white/5 rounded-md cursor-pointer group transition-colors"
            onClick={() => item.type === 'directory' ? toggleFolder(fullPath) : handleFileClick(name)}
          >
            {FILE_ICONS[item.type]}
            <span className="text-[#e0e0e0] group-hover:text-white transition-colors">{name}</span>
            {item.type === 'file' && (
              <span className="text-xs text-[#8e8e8e] ml-auto">{item.size}</span>
            )}
          </motion.div>
          {item.type === 'directory' && isExpanded && (
            <AnimatePresence>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderContents(item.contents, fullPath)}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      );
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-auto ${showExplorer ? 'opacity-100' : 'opacity-0'}`}
    >
      <Rnd
        size={{ width: size.width, height: size.height }}
        position={{ x: position.x, y: position.y }}
        onDragStop={(e, d) => {
          setPosition({ x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setSize({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height)
          });
          setPosition(position);
        }}
        minWidth={600}
        minHeight={400}
        bounds="window"
        dragHandleClassName="explorer-header"
        style={{ display: showExplorer ? 'block' : 'none' }}
        disableDragging={isMaximized}
      >
        <div className="explorer-container flex flex-col bg-[#1e1e1e]/40 backdrop-blur-xl rounded-lg overflow-hidden border border-white/10 shadow-2xl w-full h-full">
          {/* Explorer Header */}
          <div className="explorer-header flex items-center justify-between w-full h-10 bg-[#2a2a2a]/30 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2 px-4">
              <div 
                className="group relative w-3.5 h-3.5 bg-[#ff5f57] rounded-full hover:bg-[#ff5f57]/90 transition-colors cursor-pointer"
                onClick={closeExplorer}
              >
                <svg className="absolute inset-0 w-full h-full scale-[0.6] opacity-0 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </div>
              <div 
                className="group relative w-3.5 h-3.5 bg-[#febc2e] rounded-full hover:bg-[#febc2e]/90 transition-colors cursor-pointer"
              >
                <svg className="absolute inset-0 w-full h-full scale-[0.6] opacity-0 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                </svg>
              </div>
              <div 
                className="group relative w-3.5 h-3.5 bg-[#28c840] rounded-full hover:bg-[#28c840]/90 transition-colors cursor-pointer"
                onClick={toggleMaximize}
              >
                <svg className="absolute inset-0 w-full h-full scale-[0.5] opacity-0 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="8" y="8" width="8" height="8"/>
                </svg>
              </div>
            </div>
            <div className="text-white/80 text-sm font-['SF Pro Display'] tracking-wide">TreeOS File Explorer</div>
            <div className="w-16"></div>
          </div>

          {/* Path Bar */}
          <div className="px-4 py-2.5 bg-[#252525]/30 backdrop-blur-sm border-b border-white/10">
            {renderPath()}
          </div>

          {/* File Explorer Content */}
          <div className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-[#1e1e1e]/40 to-[#252525]/40 backdrop-blur-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-white/30">
            {renderContents(getCurrentContents())}
          </div>
        </div>
      </Rnd>
    </motion.div>
  );
}

export default FileExplorer; 