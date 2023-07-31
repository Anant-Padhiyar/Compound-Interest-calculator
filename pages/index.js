import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [mode, setMode] = useState('');
 
  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      const initialMode = 'light';
      setMode(initialMode);
      localStorage.setItem('mode', initialMode);
    }
  }, []);

  const handleToggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  useEffect(() => {
    document.body.style.backgroundColor = mode === 'dark' ? 'black' : 'white';
    document.body.style.color = mode === 'dark' ? 'white' : 'black';
  }, [mode]);

  

  // Check if mode is not yet set to prevent flashing
  if (mode === '') {
    return null; // or loading indicator, or any placeholder
  }

  return (
    <>
      <Head>
        <title>Calculator Home</title>
        {/* Add your custom Head content here */}
      </Head>
      <Navbar handleToggleMode={handleToggleMode} mode={mode} />
      <div>
        <Homepage handleToggleMode={handleToggleMode} mode={mode} heading='Enter a text to analyze' />
      </div>
    </>
  );
}

