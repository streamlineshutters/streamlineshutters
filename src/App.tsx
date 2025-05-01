import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.title = 'Streamline Shutters | Premium Window Solutions';
  }, []);

  return (
    <div className="font-sans bg-[#FCFCFC] text-gray-900">
      <Header />
      <Hero />
      <Products />
      <Features />
      <Footer />
    </div>
  );
}

export default App;