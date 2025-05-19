// Jai Shree Ram

import { img } from 'framer-motion/client';
import React , { useState , useEffect } from 'react'

function Bg() {

  const accessKey = import.meta.env.VITE_UNSPLASH_API_KEY; // Replace with your actual Unsplash API key
  const query = 'nature,landscape,wallpaper';
  const orientation = 'landscape';

  const [apiUrl, setApiUrl] = useState(`https://api.unsplash.com/photos/random?query=nature&orientation=landscape&w=1920&h=1080&client_id=${accessKey}`)

  const [bgUrl, setBgUrl] = useState("/img/bg.jpg")


  // Fetch the image
  useEffect(() => {
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {

      const wallpaperWidth = window.screen.width;
      const wallpaperHeight = window.screen.height;

      let imgUrl = data.urls.raw + `&w=${wallpaperWidth}&h=${wallpaperHeight}&fit=crop`

      console.log(imgUrl);


      // Get the optimized size for the wallpaper
      setBgUrl(imgUrl)
      
    })
    .catch(error => {
      console.error('Error fetching wallpaper:', error);
    });

  } , [])


  return (
    <div className="bg select-none pointer-events-none text-white font-['machinaRegular'] absolute flex items-center justify-center w-full h-full overflow-hidden">
      
      <div className="bgImage absolute w-full h-full">
        <img className='w-full h-full object-cover' src={bgUrl} alt="/img/bg.jpg"/>
      </div>

      <div className="bgContent opacity-0 absolute flex gap-3 items-center justify-center">
        <img src="/img/logo-white.png" alt="" className="bgLogo w-32" />

        <h1 className='text-5xl mt-4 tracking-tighter'>Tree OS</h1>
      </div>
    </div>
  )
}

export default Bg
