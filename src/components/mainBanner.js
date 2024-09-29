import { MdOutlineWhatsapp } from "react-icons/md";
import { useState } from 'react';
import BookingModal from "./bookingModal";
import { Button, Rating } from "flowbite-react";
import { FaCcAmex ,FaGooglePay,FaCcMastercard } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";
import { FaApplePay } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function MainBanner() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <section className="w-full
        p-2
        relative
        overflow-hidden
        block
        z-10	
        bg-[url('hert-niks-kTVMiab7Pf8-unsplash.jpg')]
        bg-cover
        bg-no-repeat
        bg-center
        before:content-['']
        before:absolute
        before:inset-0
        before:block
        before:bg-gradient-to-t
        before:from-white
        before:opacity-100
        before:z-[-5]">
            {/* Dark Tint and Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white to-black opacity-5 z-[1]">
            </div>
            <div className="items-center fixed top-4 right-4 z-50">
                <button className="bg-green-500 hover:bg-green-600 text-white font-lato font-bold py-2 px-4 rounded-full shadow-lg">
                    <a href="https://api.whatsapp.com/message/B3P7TCTYHQVYD1?autoload=1&app_absent=0" className="flex items-center font-lato font-medium text-center">
                        <span className="mr-2">Chat now</span>
                        <MdOutlineWhatsapp />
                    </a>
                </button>
            </div>
            <section className="flex flex-col items-center mx-auto text-center pt-24 pb-12 relative z-10">
                <h1 className="text-5xl font-serif font-semibold md:text-5xl lg:text-7xl text-black drop-shadow-xl">
                    Brighton And Hove Airport Runs
                </h1>
                <h1 className="mb-4 text-3xl font-serif font-semibold md:text-2xl lg:text-5xl text-gray-800 drop-shadow-xl">
                    Your premier taxi and airport transfer service
                </h1>
                <h2 className="mb-4 text-xl font-semibold text-black lg:text-2xl sm:px-16 lg:px-48 drop-shadow-xl">
                    AIRPORT TRIPS ∙ GENERAL / LONG-DISTANCE TRIPS ∙ SCHOOL RUNS ∙ CHAUFFEUR SERVICE
                </h2>
                <h2 className="mb-4 text-lg font-semibold text-black lg:text-3xl sm:px-16 lg:px-48 drop-shadow-xl" id="Phone number">
                    Call now on 01273 011505
                </h2>
                <Button 
                    className="text-lg font-semibold lg:text-3xl sm:px-16 lg:px-48 drop-shadow-xl min-w-[12rem] max-w-[18rem] whitespace-nowrap" 
                    onClick={toggleModal} 
                    gradientDuoTone="cyanToBlue"
                >
                    Book online now
                </Button>

                <div className="mt-6 flex flex-col items-center text-center">
                    <h2 className="text-lg font-semibold text-black lg:text-3xl drop-shadow-xl">
                        Rated 5 Stars on Google by Satisfied Customers!
                    </h2>
                    <Rating size="md" className="mt-2 flex items-center">
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500" />
                        <a href="https://g.page/r/CQHk4qCErn3xEAE/review" className="text-sm font-medium text-gray-900 underline hover:no-underline">
                            100+ reviews
                        </a>
                    </Rating>
                </div>
                <h2 className="mx-4 text-lg font-semibold text-black lg:text-2xl sm:px-16 lg:px-48 drop-shadow-xl" id="Payment types">
                    All major payment methods accepted
                </h2>
                <div className="flex flex-row p-4">
                    <FaCcAmex className="w-10 h-8 text-blue-600 mx-2"/>
                    <RiVisaLine className="w-10 h-8 text-blue-800 mx-2"/>
                    <FaApplePay  className="w-10 h-8 mx-2"/>
                    <FcGoogle className="w-8 h-6"/><span className="font-semibold text-gray-700">Pay</span>
                    
                    <svg
                        width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-2">
                        <circle cx="12" cy="15" r="12" fill="#d9302c" />
                        <circle cx="28" cy="15" r="12" fill="#eaa23f" />
                    </svg>
                    </div>
                    <div>
                </div>
                
                {isModalOpen && <BookingModal />}
            </section>
        </section>
    );
}

export default MainBanner;
