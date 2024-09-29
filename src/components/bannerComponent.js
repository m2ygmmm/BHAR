import React from 'react';
import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdPhone } from "react-icons/md";

const BannerComponent = () => {
  return (
    <Banner>
      <div className="flex justify-center items-center w-full h-full border-t border-gray-300 bg-gradient-to-r from-blue-50 to-blue-100 p-2">
        <div className="flex items-center space-x-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 p-1">
            <MdPhone className="h-6 w-6 text-white" />
          </span>
          <p className="text-sm font-normal text-gray-700">
            <span className='font-bold text-xl text-blue-800'>Book now!</span>
          </p>
        </div>
        <a className='font-bold text-lg text-blue-700 ml-3 hover:underline' href="tel:01273011505">01273 011 505</a>
        <div className="flex items-center">
          <Banner.CollapseButton className="border-0 bg-transparent text-gray-500 hover:text-gray-700">
            <HiX className="h-5 w-5" />
          </Banner.CollapseButton>
        </div>
      </div>
    </Banner>
  );
}

export default BannerComponent;
