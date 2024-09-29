import React from 'react';
import { Element } from 'react-scroll'; // Import Element for scrollable sections
import Navbar from './components/navbar';
import BannerComponent from './components/bannerComponent';
import MainBanner from './components/mainBanner';
import AboutBanner from './components/aboutBanner';
import Footer from './components/footer';
import Contact from './components/contact';

const App = () => {
  return (
    <>
      <Navbar />
      <Element name="banner" id="banner">
        <BannerComponent />
      </Element>
      <Element name="mainBanner" id="mainBanner">
        <MainBanner />
      </Element>
      <Element name="about" id="about">
        <AboutBanner />
      </Element>
      <Element name="contact" id="contact">
        <Contact />
      </Element>
      <Footer />
    </>
  );
};

export default App;
