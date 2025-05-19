// Jai Shree Ram

import React from 'react'

function Bg() {
  return (
    <div className="bg select-none pointer-events-none text-white font-['machinaRegular'] absolute flex items-center justify-center w-full h-full overflow-hidden">
      
      <div className="bgImage absolute w-full h-full">
        <img className='w-full h-full object-cover' src="/img/bg.jpg" alt="" />
      </div>

      <div className="bgContent absolute flex gap-3 items-center justify-center">
        <img src="/img/logo-white.png" alt="" className="bgLogo w-32" />

        <h1 className='text-5xl mt-4 tracking-tighter'>Tree OS</h1>
      </div>
    </div>
  )
}

export default Bg