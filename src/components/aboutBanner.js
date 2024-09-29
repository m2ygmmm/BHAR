import FaqAccordion from './faqAccordion'
import { MdMoneyOff, MdTimer, MdHandshake, MdFamilyRestroom } from "react-icons/md"; 
import { useState } from 'react';
import BookingModal from "./bookingModal";


function SecondBanner(){
   const [isModalOpen, setIsModalOpen] = useState(false);
   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  };

    return (
        <section id="About" class="flex flex-col items-center p-2">
                   <div className="grid grid-cols-2 md:grid-cols-4 justify-center shadow-xl mb-12 bg-gray-100" onClick={toggleModal}>
                    <div className="p-2 w-48 md:w-60 max-w-xs text-center border border-gray-400 border-x-0 border-b-0 border-2 md:border-x-0 md:border-y"onClick={toggleModal}>
                        <h4 className="text-3xl font-semibold text-gray-800 mb-2">Gatwick</h4>
                        <p className="text-xl font-medium text-gray-500">From £60</p>
                        <p className="text-sm font-medium text-gray-500">Estate £70</p>
                        <p className="text-sm font-medium text-gray-500">MPV £80</p>
                        <p className="text-sm font-medium text-gray-500">Executive £80</p>
                    </div>
                    <div className="p-2 w-48 md:w-60 max-w-xs text-center border border-gray-400 border-x-0 border-b-0 border-2 md:border-x-0 md:border-y" onClick={toggleModal}>
                        <h4 className="text-3xl font-semibold text-gray-800 mb-2">Heathrow</h4>
                        <p className="text-xl font-bold text-gray-500">From £120</p>
                        <p className="text-sm font-medium text-gray-500">Estate £130</p>
                        <p className="text-sm font-medium text-gray-500">MPV £150</p>
                        <p className="text-sm font-medium text-gray-500">Executive £150</p>
                    </div>
                    <div className="p-2 w-48 md:w-60 max-w-xs text-center border border-gray-400 border-x-0 border-t-0 border-2 md:border-x-0 md:border-y" onClick={toggleModal}>
                        <h4 className="text-3xl font-semibold text-gray-800 mb-2">Luton</h4>
                        <p className="text-xl font-bold text-gray-500">From £170</p>
                        <p className="text-sm font-medium text-gray-500">Estate £190</p>
                        <p className="text-sm font-medium text-gray-500">MPV £220</p>
                        <p className="text-sm font-medium text-gray-500">Executive £220</p>
                    </div>
                    <div className="p-2 w-48 md:w-60 max-w-xs text-center border border-gray-400 border-x-0 border-t-0 border-2 md:border-x-0 md:border-y" onClick={toggleModal}>
                        <h4 className="text-3xl font-semibold text-gray-800 mb-2">Stansted</h4>
                        <p className="text-xl font-bold text-gray-500">From £170</p>
                        <p className="text-sm font-medium text-gray-500">Estate £190</p>
                        <p className="text-sm font-medium text-gray-500">MPV £220</p>
                        <p className="text-sm font-medium text-gray-500">Executive £220</p>
                    </div>
                </div>
            <h1 className="text-3xl text-gray-600">Your premier taxi service</h1>
            <p className="font-lato text-lg lg:text-2xl p-6 text-black text-center tracking-wide text-pretty">Welcome to Brighton and Hove Airport Runs, your premier taxi service for hassle-free and comfortable journeys to London airports. With a strong base in Brighton,
               we take pride in offering reliable and punctual transportation solutions to all major airports in London. Our experienced drivers and modern fleet ensure a 
               smooth and stress-free travel experience. Trust Brighton and Hove Airport Runs to get you to your destination on time and in style.
            </p>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 drop-shadow-lg p-2 bg-gray-200">
               <article className="max-w-sm bg-white flex flex-col p-4 items-center">
               <MdHandshake size={64}/>
                     <figure>
                     <p className="mb-3 font-normal font-lato text-md lg:text-lg text-gray-700 text-center text-pretty">All our drivers are highly experienced, rigorously DBS checked, fully insured and licensed with our local council,
                        ensuring the utmost safety throughout your journeys.
                     </p>
                  </figure>
               </article>
               <article className="max-w-sm bg-white flex flex-col p-4 items-center">
                  <MdTimer size={64}/>
                  <figure>
                     <p className="mb-3 font-normal font-lato text-md lg:text-lg text-gray-700 text-center text-pretty">Experience unbeatable convenience with our taxis available 24/7, 
                        ensuring a punctual and reliable round-the-clock service.
                     </p>
                  </figure>
               </article>
               <article className="max-w-sm bg-white flex flex-col p-4 items-center">
               <MdMoneyOff size={64}/>
                  <figure>
                     <p className="mb-3 font-normal font-lato text-md lg:text-lg text-gray-700 text-center text-pretty">Make the most of your travels with our competitive rates for all journeys,
                        and benefit from our all-inclusive fixed rates to airport destinations.
                     </p>
                  </figure>
               </article>
               <article className="max-w-sm bg-white flex flex-col p-4 items-center">
               <MdFamilyRestroom size={64}/>
                  <figure>
                     <p className="mb-3 font-normal font-lato text-md lg:text-lg text-gray-700 text-center text-pretty">In addition to accommodating various school runs, we
                        are pleased to offer child seats for your convenience upon request.
                     </p>
                  </figure>
               </article>
            </section>
            <h1 className="font-lato text-4xl p-2 text-center font-semibold p-4 mt-2">Frequently Asked Questions:</h1>
            <section id="accordion" data-accordion="collapse" className="p-6">
                <FaqAccordion />
            </section>
            <figure className="flex flex-row p-2">
               <a href="tel:07426334620" className="font-lato font-medium ">
               <i className="fa-solid fa-phone rounded text-2xl font-lato mx-3 text-gray-900 hover:font-bold hover:text-3xl"></i>
               </a>
               <a href="https://api.whatsapp.com/message/NJKNICUNBI6CO1" className="font-lato font-medium ">
               <i className="fa-brands fa-whatsapp rounded text-2xl font-lato mx-3 text-gray-900 hover:font-bold hover:text-3xl"></i>
               </a>
               <a href="https://www.facebook.com/people/Brighton-and-Hove-Airport-Runs/100095642228594/" className="font-lato font-medium hover:font-bold">
               <i className="fa-brands fa-facebook rounded text-2xl font-lato mx-3 text-gray-900 hover:font-bold hover:text-3xl"></i>
               </a>
            </figure>
            <h1 className="font-lato text-4xl p-2 text-center font-semibold p-4">See what our valued customers have to say:</h1>
            <div data-trustmary-widget="3mTSgL8ky"></div>
            <script src="https://widget.trustmary.com/3mTSgL8ky"></script>
            {isModalOpen && <BookingModal />}
      </section>
      
    )
}

export default SecondBanner;