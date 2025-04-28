import React, { useState, useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis'; 
import Hero from '../Hero/Hero';
import NavBar from '../NavBar/NavBar';
import DiabeticRetinopathyInfo from './RetinopathyInfo';
import Contact from '../Contact/Contact';
import About from '../About/About';
import Footer from '../Footer/Footer';

export const SmoothScrollHero = ({ navbarHidden }) => {
  return (
    <div id = "home" className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        {/* Render NavBar and pass navbarHidden state to it */}
        <NavBar navbarHidden={navbarHidden} />

        <Hero />

        <DiabeticRetinopathyInfo />  

        <Contact />

        <About />

        <Footer />
      </ReactLenis>
    </div>
  );
};

export default SmoothScrollHero;
