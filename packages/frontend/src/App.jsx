import React from 'react';
import Footer from './Footer/Footer';
import Navbar from './Header/Navbar';
import Page from './Page/Page';

export default function App() {
  return (
    <div className='bg-gray-900 antialiased font-sans'>
      <div className='container mx-auto flex flex-col '>
        <Navbar />
        <Page />
        <Footer />
      </div>
    </div>
  );
}
