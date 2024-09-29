import React from 'react';
import { Footer } from 'flowbite-react';
import { Link as ScrollLink } from 'react-scroll';  // Import Link from react-scroll
import { useState } from 'react';
import BookingModal from './bookingModal';

export function FooterComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://www.bhairportruns.co.uk/"
            src={`${process.env.PUBLIC_URL}/Logo-BRIGHTON AND HOVE AIRPORT RUNS-1 - Copy.png`}
            alt="BHAR Logo"
          />
          <Footer.LinkGroup>
            <Footer.Link as={ScrollLink} to="mainBanner" smooth={true} duration={500}>Home</Footer.Link>
            <Footer.Link as={ScrollLink} to="about" smooth={true} duration={500}>About Us</Footer.Link>
            <Footer.Link as={ScrollLink} to="contact" smooth={true} duration={500}>Contact</Footer.Link>
            {/* The "Book now" link might be a modal trigger or another special action */}
            <Footer.Link as="button" onClick={() => {toggleModal()}}>Book Now</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="https://www.bhairportruns.co.uk/" by="Brighton And Hove Airport Runs" year={2023} />
      </div>
      {isModalOpen && <BookingModal />}
    </Footer>
    
  );
}

export default FooterComponent;
