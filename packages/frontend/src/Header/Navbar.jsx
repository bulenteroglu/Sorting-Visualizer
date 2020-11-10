import React from 'react';

export default function Navbar() {
  return (
    <div className='flex justify-between items-center py-5'>
      <div className='font-bold italic text-3xl text-white   flex items-center'>
        <span className='wavvy'>Bulent Eroglu</span>
        <span className='wiggle'>👋🏼</span>
      </div>
      <div className='font-bold italic text-3xl capitalize text-gray-500'>
        sorting visualizer
      </div>
    </div>
  );
}
