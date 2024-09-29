import React, { useState } from 'react';
import { Button, Navbar } from 'flowbite-react';
import { Link as ScrollLink } from 'react-scroll';
import BookingModal from './bookingModal';
import { MdOutlineWhatsapp, MdFacebook, MdPhone } from "react-icons/md";

function NavbarComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar fluid rounded className="shadow-lg bg-white">
        <Navbar.Brand href="https://www.bhairportruns.co.uk/">
          <img
            src={`${process.env.PUBLIC_URL}/Logo-BRIGHTON AND HOVE AIRPORT RUNS-1 - Copy.png`}
            className="ml-4 md:ml-8"
            alt="BHAR Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2 items-center space-x-4">
          <Button.Group className="md:flex">
            <Button color="gray" className="border-none hover:bg-gray-100 p-2" href="tel:07426334620">
              <MdPhone className="h-6 w-6 text-gray-700" />
            </Button>
            <Button color="gray" className="border-none hover:bg-gray-100 p-2" href="https://www.facebook.com/people/Brighton-and-Hove-Airport-Runs/100095642228594/">
              <MdFacebook className="h-6 w-6 text-gray-700" />
            </Button>
            <Button color="gray" className="border-none hover:bg-gray-100 p-2" href="https://api.whatsapp.com/message/B3P7TCTYHQVYD1?autoload=1&app_absent=0">
              <MdOutlineWhatsapp className="h-6 w-6 text-gray-700" />
            </Button>
          </Button.Group>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={ScrollLink} to="mainBanner" smooth={true} duration={500} className="text-lg md:text-xl text-gray-800 hover:text-blue-600 transition duration-200 font-bold">
            Home
          </Navbar.Link>
          <Navbar.Link as={ScrollLink} to="about" smooth={true} duration={500} className="text-lg md:text-xl text-gray-800 hover:text-blue-600 transition duration-200">
            About Us
          </Navbar.Link>
          <Navbar.Link as={ScrollLink} to="contact" smooth={true} duration={500} className="text-lg md:text-xl text-gray-800 hover:text-blue-600 transition duration-200">
            Contact
          </Navbar.Link>
          <Navbar.Link className="text-lg md:text-xl text-blue-600 hover:text-blue-300 cursor-pointer transition duration-200 font-bold" onClick={toggleModal}>
            Book Now
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      {isModalOpen && <BookingModal />}
    </>
  );
}

export default NavbarComponent;
