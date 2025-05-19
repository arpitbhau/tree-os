// Jai Shree Ram

import React, { useState, useEffect } from 'react'

function Toolbar() {

  // toolbar time functionality
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = now.toLocaleString('default', { month: 'short' }); // 'May', 'Jun', etc.
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      setCurrentTime(`${month} ${day} ${hours}:${minutes}`);
    };

    updateClock(); // Run once immediately
    const interval = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // battery percentage functionality
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    async function fetchBattery() {
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        const updateLevel = () => {
          setBatteryLevel(Math.round(battery.level * 100));
        };

        updateLevel(); // Initial level
        battery.addEventListener('levelchange', updateLevel);

        return () => battery.removeEventListener('levelchange', updateLevel);
      } else {
        console.warn("Battery API not supported on this browser.");
      }
    }

    fetchBattery();
  }, []);

  // get device ram and cpu cores 
  const [deviceMemory, setDeviceMemory] = useState(null);
  const [cpuCores, setCpuCores] = useState(null);

  useEffect(() => {
    // Device Memory (in GB)
    setDeviceMemory('deviceMemory' in navigator ? navigator.deviceMemory : 'Not supported');

    // CPU Cores
    setCpuCores('hardwareConcurrency' in navigator ? navigator.hardwareConcurrency : 'Not supported');

  }, []);

  return (
    <div className="navbar tracking-tight flex z-[999999] items-center justify-between text-white font-[helRegular] relative w-full top-0 left-0 py-1 px-5 bg-[var(--whiteGlass)]">
      
      <div className="nLeft relative flex gap-2 font-['machinaRegular'] tracking-tighter items-center justify-center">
        <img className='w-6' src="/img/logo-white.png" alt="Logo" />
        tree os
      </div>

      <div className="nMid font-['machinaRegular'] flex left-16 relative navTime ">
        {currentTime}
      </div>

      <div className="nRight relative flex gap-4">

        {/* wifi */}
        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M12.0005 3C16.2849 3 20.2196 4.49683 23.3104 6.99607L12.0005 21L0.689941 6.99671C3.78078 4.49709 7.71583 3 12.0005 3Z"></path></svg>
  


        {/* ram  */}
        <div className="flex font-['machinaRegular'] gap-1 items-center justify-center">
          <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(251,251,251,1)"><path d="M2 5H22C22.5523 5 23 5.44772 23 6V15C23 15.5523 22.5523 16 22 16V18C22 18.5523 21.5523 19 21 19H13.5858L12.5858 18H11.4142L10.4142 19H3C2.44772 19 2 18.5523 2 18L2 16C1.44772 16 1 15.5523 1 15V6C1 5.44771 1.44772 5 2 5ZM4 16V17H9.58579L10.5858 16H4ZM13.4142 16L14.4142 17H20V16H13.4142ZM7 9H5V12H7V9ZM9 9V12H11V9H9ZM15 9H13V12H15V9ZM17 9V12H19V9H17Z"></path></svg>
          {deviceMemory} GB
        </div>

        {/* cpu cores */}
        <div className="flex gap-1 font-['machinaRegular'] items-center justify-center">
          <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M6 18H18V6H6V18ZM14 20H10V22H8V20H5C4.44772 20 4 19.5523 4 19V16H2V14H4V10H2V8H4V5C4 4.44772 4.44772 4 5 4H8V2H10V4H14V2H16V4H19C19.5523 4 20 4.44772 20 5V8H22V10H20V14H22V16H20V19C20 19.5523 19.5523 20 19 20H16V22H14V20ZM8 8H16V16H8V8Z"></path></svg>
          {cpuCores}
        </div>



        {/* battery */}
        <div className="flex font-['machinaRegular'] items-center justify-center">
          <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M9 4V3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4H18C18.5523 4 19 4.44772 19 5V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V5C5 4.44772 5.44772 4 6 4H9Z"></path></svg>
          {batteryLevel !== null ? `${batteryLevel}%` : 'Battery info not available'}
        </div>
        
      </div>

    </div>
  )
}

export default Toolbar
