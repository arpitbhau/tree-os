// Jai Shree Ram

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../../../../store/appStore';
import { Rnd } from 'react-rnd';
import { updateCellValue , getColumnValues } from "../../../../supabase/supabaseController.js"

async function addBookmark(name , url) {
  let oldData = await getColumnValues("bookmarks" , "bookmarks")
  oldData = oldData[0]

  let response  = await updateCellValue("bookmarks" , "bookmarks" , "refRow" , "ref" , [...oldData , {"name": name , "url": url}])

  if (response) return "Saved the Bookmark"
  else return "Failed to Save BookMark"

}


// Command output mapping
const COMMANDS = {
  "help": `Available commands:
  help - Show this help
  clear - Clear terminal
  echo [text] - Print text
  date - Show current date and time
  whoami - Show current user
  ls - List directory contents
  cat [file] - Show file contents
  pwd - Print working directory
  uname - Show system information
  neofetch - Show system info with logo
  bookmark add name:url - set bookmark in the apps`,
  
  "clear": "",
  
  "echo": (args) => args.join(" "),
  
  "date": () => new Date().toString(),
  
  "whoami": "root@tree-os",
  
  "ls": `Applications  Documents  Downloads  Pictures
Music        Videos     node_modules  package.json`,
  
  "pwd": "/home/user",
  
  "uname": "TreeOS 1.0.0 x86_64",
  
  "neofetch": `                    .
                   .:.
                  .:::.             user@tree-os
                 .:::::.            -------------
             ***.:::::::.***        OS: TreeOS 1.0.0
        ******.::::::::::.******    Kernel: React 18.2.0
      ********.:::::::::::.********  Uptime: ${Math.floor(Math.random() * 24)} hours, ${Math.floor(Math.random() * 60)} mins
     ********.:::::::::::::.******** Shell: TreeShell 1.0.0
    ********.:::::::'***:::.******** Resolution: 1920x1080
    *******.:::::::'   '*::.******* DE: React Custom
    *******.::::::*       '******** WM: Custom Window Manager
    *******.:::::'         ******** CPU: JavaScript V8 ${Math.floor(Math.random() * 4) + 2} cores
     *******.:::'        .********  Memory: ${Math.floor(Math.random() * 8) + 8}GB / ${Math.floor(Math.random() * 16) + 16}GB
      *******.:'       .********
        *******      ********
             ***..::.***`,

  "cat": (args) => {
    const files = {
      "readme.txt": "Welcome to TreeOS Terminal! Type 'help' for available commands.",
      "todo.txt": "1. Implement more terminal features\n2. Add file system navigation\n3. Create custom themes",
      "package.json": "{\n  \"name\": \"tree-os\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A beautiful React desktop environment\"\n}"
    };
    
    if (!args[0]) return "Error: No file specified";
    return files[args[0]] || `Error: ${args[0]}: No such file or directory`;
  } ,

  "bookmark": async (args) => {
  if (args[0] === "add" && args[1]) {
    const [name, url] = args[1].split(",");
    if (!name || !url) return "Error: Invalid format. Use bookmark add name,url";

    const result = await addBookmark(name.trim(), url.trim());
    return result;
  }

  return "Error: Invalid bookmark command. Use `bookmark add name,url`";
}
};

function Terminal() {
  const navigate = useNavigate();
  const setIsAppOpened = useAppStore((state) => state.setIsAppOpened);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [commandHistory, setCommandHistory] = useState([{ type: 'output', content: 'Welcome to TreeOS Terminal v1.0.0\nType "help" for available commands.' }]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputHistory, setInputHistory] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [size, setSize] = useState({ width: 700, height: 400 });
  const [position, setPosition] = useState({ 
    x: Math.max(0, (window.innerWidth - 700) / 2), 
    y: Math.max(0, (window.innerHeight - 400) / 2) 
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevSize, setPrevSize] = useState({ width: 700, height: 400 });
  const [prevPosition, setPrevPosition] = useState({ 
    x: Math.max(0, (window.innerWidth - 700) / 2), 
    y: Math.max(0, (window.innerHeight - 400) / 2) 
  });

  // Sound effects
  const openSound = new Audio('/sounds/terminal-open.mp3');
  const closeSound = new Audio('/sounds/terminal-close.mp3');
  const keySound = new Audio('/sounds/key-press.mp3');
  const errorSound = new Audio('/sounds/error-beep.mp3');

  useEffect(() => {
    if (showTerminal) {
      openSound.play();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 500);
    } else {
      closeSound.play();
    }
  }, [showTerminal]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Open terminal animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTerminal(true);
      setIsAppOpened(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleCommand = async e => {
    e.preventDefault();
    if (!currentCommand.trim()) return;
    
    const newInputHistory = [...inputHistory, currentCommand];
    setInputHistory(newInputHistory);
    setHistoryIndex(-1);

    const [cmd, ...args] = currentCommand.trim().split(' ');
    
    const newCommandHistory = [
      ...commandHistory,
      { type: 'input', content: currentCommand }
    ];

    // Handle clear command specially
    if (cmd.toLowerCase() === 'clear') {
      setCommandHistory([]);
      setCurrentCommand('');
      return;
    }
    
    // Handle exit command
    if (cmd.toLowerCase() === 'exit') {
      closeTerminal();
      return;
    }

    // Process command output
    let output;
    const commandFn = COMMANDS[cmd.toLowerCase()];
    if (commandFn) {
      try {
        output = typeof commandFn === 'function' 
          ? await commandFn(args)
          : commandFn;
      } catch (err) {
        output = "Error running command: " + err.message;
        errorSound.play();
      }
    } else {
      output = `Command not found: ${cmd}. Type 'help' for available commands.`;
      errorSound.play();
    }

    newCommandHistory.push({ type: 'output', content: output });
    setCommandHistory(newCommandHistory);
    setCurrentCommand('');
  };

  const handleKeyDown = (e) => {
    // Play key sound on keypress
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
      keySound.volume = 0.2; // Lower volume for key sounds
      keySound.currentTime = 0;
      keySound.play();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (inputHistory.length > 0) {
        const newIndex = historyIndex < inputHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentCommand(inputHistory[inputHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(inputHistory[inputHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  const closeTerminal = () => {
    closeSound.play();
    setShowTerminal(false);
    setTimeout(() => {
      setIsAppOpened(false);
      navigate('/');
    }, 500);
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 }); // Save space for toolbar
      setPosition({ x: 0, y: 40 });
      setIsMaximized(true);
    } else {
      setSize(prevSize);
      setPosition(prevPosition);
      setIsMaximized(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-auto transition-opacity duration-300 ${showTerminal ? 'opacity-100' : 'opacity-0'}`}>
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
        minWidth={400}
        minHeight={300}
        bounds="window"
        dragHandleClassName="terminal-header"
        style={{ display: showTerminal ? 'block' : 'none' }}
        disableDragging={isMaximized}
      >
        <div className="terminal-container flex flex-col bg-[#1e1e1e]/40 backdrop-blur-xl rounded-lg overflow-hidden border border-white/10 shadow-2xl w-full h-full">
          {/* Terminal Header with controls */}
          <div className="terminal-header flex items-center justify-between w-full h-9 bg-[#2a2a2a]/30 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2 px-3">
              {/* Close button */}
              <div 
                className="group relative w-3.5 h-3.5 bg-[#ff5f57] rounded-full hover:bg-[#ff5f57]/90 transition-colors cursor-pointer"
                onClick={closeTerminal}
              >
                <svg className="absolute inset-0 w-full h-full scale-[0.6] opacity-0 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </div>
              {/* Minimize button */}
              <div 
                className="group relative w-3.5 h-3.5 bg-[#febc2e] rounded-full hover:bg-[#febc2e]/90 transition-colors cursor-pointer"
              >
                <svg className="absolute inset-0 w-full h-full scale-[0.6] opacity-0 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                </svg>
              </div>
              {/* Maximize button */}
              <div 
                className="group relative w-3.5 h-3.5 bg-[#28c840] rounded-full hover:bg-[#28c840]/90 transition-colors cursor-pointer"
                onClick={toggleMaximize}
              >
                <svg className="absolute inset-0 w-full h-full scale-[0.5] opacity-0 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="8" y="8" width="8" height="8"/>
                </svg>
              </div>
            </div>
            <div className="text-white/70 text-sm font-['machinaRegular']">TreeOS Terminal</div>
            <div className="w-16"></div> {/* Empty space to balance header */}
          </div>
          
          {/* Terminal Output Area */}
          <div 
            ref={terminalRef} 
            className="flex-grow overflow-y-auto p-3 font-mono text-sm text-green-500 bg-gradient-to-b from-[#1e1e1e]/40 to-[#252525]/40 backdrop-blur-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-white/30"
          >
            {commandHistory.map((cmd, index) => (
              <div key={index} className="mb-1">
                {cmd.type === 'input' ? (
                  <div>
                    <span className="text-blue-400">root@tree-os:~$ </span>
                    <span className="text-white">{cmd.content}</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{cmd.content}</div>
                )}
              </div>
            ))}
            
            {/* Current command line with prompt */}
            <div className="flex">
              <span className="text-blue-400 mr-1">root@tree-os:~$ </span>
              <form onSubmit={handleCommand} className="flex-grow">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent text-white outline-none w-full font-mono text-sm"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </div>
      </Rnd>
    </div>
  );
}

export default Terminal;