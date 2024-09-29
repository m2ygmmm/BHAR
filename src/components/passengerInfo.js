import React, { useState } from 'react';
import axios from 'axios';
import { TextInput, Label, Textarea, Select } from "flowbite-react";
import { MdAirplanemodeActive, MdPerson } from "react-icons/md";
import { HiMail, HiLocationMarker, HiPhone } from "react-icons/hi";
import { usePlacesWidget } from "react-google-autocomplete";

const API_KEY = 'AIzaSyCYGCqAuRld_Ly4H4Yyshj-Q8ayKXnP7xg'; // Replace with your API key

function BookingForm({ setFormData, formData, airportData, generalTripData }) {
    const [distance, setDistance] = useState(null);
    const [selectedCode, setSelectedCode] = useState('+44');

    const { ref } = usePlacesWidget({
        apiKey: API_KEY,
        onPlaceSelected: (place) => {
            const address = place.formatted_address || place.name;
            setFormData(prevData => ({
                ...prevData,
                address: address
            }));
        },
        options: {
            componentRestrictions: { country: "uk" },
            types: ['address'],
        },
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const fetchDistance = async (origin, destination) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
                params: {
                    origins: origin,
                    destinations: destination,
                    units: 'metric',
                    key: API_KEY
                }
            });

            if (response.data.status === 'OK') {
                const distanceInfo = response.data.rows[0].elements[0];
                if (distanceInfo.status === 'OK') {
                    setDistance({
                        distance: distanceInfo.distance.text,
                        duration: distanceInfo.duration.text
                    });
                } else {
                    console.error('Distance Matrix API error:', distanceInfo.status);
                }
            } else {
                console.error('Distance Matrix API error:', response.data.status);
            }
        } catch (error) {
            console.error('Error fetching distance:', error);
        }
    };

    // Example usage: fetch distance between form address and some fixed destination
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.address && airportData.address) {
            fetchDistance(formData.address, airportData.address);
        }
    };

    const showReturn = () => {
        if(airportData.isReturn || generalTripData.isReturn){
            return true
        } else {
            return false
        }
    }

    return (
        <form className="max-w-lg mx-auto drop" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6 bg-gray-50">
                <div className="py-4 bg-gray-50">
                    <Label htmlFor="fname" value="First Name:" className="font-medium" />
                    <TextInput
                        id="fname"
                        type="text"
                        placeholder="John"
                        value={formData.fname}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        rightIcon={MdPerson}
                    />
                </div>
                <div className="py-4 bg-gray-50">
                    <Label htmlFor="lname" value="Last Name:" className="font-medium" />
                    <TextInput
                        id="lname"
                        type="text"
                        placeholder="Smith"
                        value={formData.lname}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        rightIcon={MdPerson}
                    />
                </div>
            </div>
            <div className="pb-4 bg-gray-50">
                <Label htmlFor="address" value="Address:" className="font-medium" />
                <TextInput
                    id="address"
                    type="text"
                    ref={ref}
                    placeholder="10 Downing St"
                    value={formData.address}
                    onChange={handleInputChange}
                    rightIcon={HiLocationMarker}
                    required
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    autoComplete="off"
                />
            </div>
            <div className="pb-4 grid grid-cols-2 gap-6 bg-gray-50">
                <div className='bg-gray-50'>
                    <Label htmlFor="ddate" value="Departing On:" className="font-medium" />
                    <input
                        type="date"
                        id="ddate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.ddate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="dtime" value="Select Time:" className="font-medium" />
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                        </div>
                        <input
                            type="time"
                            id="dtime"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.dtime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
            </div>
            {showReturn() && (
                <div className="pb-4 grid grid-cols-2 gap-6 bg-gray-50">
                    <div>
                        <Label htmlFor="rdate" value="Returning On:" className="font-medium" />
                        <input
                            type="date"
                            id="rdate"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            min={formData.ddate}
                            value={formData.rdate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="rtime" value="Select Time:" className="font-medium" />
                        <div className="relative">
                    
                            <input
                                type="time"
                                id="rtime"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={formData.rtime}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="pb-4 bg-gray-50">
                <Label htmlFor="email" value="Email Address:" className="font-medium" />
                <TextInput
                    id="email"
                    type="email"
                    placeholder="Johnsmith@outlook.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    rightIcon={HiMail}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="pb-4 bg-gray-50">
                <Label htmlFor="phone" value="Phone Number:" className="font-medium" />
                    <div className="flex flex-row space-x-2">
                
    <TextInput
      id="phone"
      type="tel"
      placeholder="0123456789"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      value={formData.phone}
      onChange={handleInputChange}
      required
      className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 flex-grow"
      rightIcon={HiPhone}
    />
  </div>
</div>

            <div className="pb-4 bg-gray-50">
                <Label htmlFor="flightNo" value="Flight Number (optional):" className="font-medium" />
                <TextInput
                    id="flightNo"
                    type="text"
                    placeholder="BA1234"
                    value={formData.flightNo}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    rightIcon={MdAirplanemodeActive}
                />
                <p className="text-gray-500 text-xs text-gray-600 font-normal mt-1">
                    *For arriving flights - this enables the driver to track your flight and make necessary arrangements in case of delays, ensuring timely arrival.
                </p>
            </div>
            <div className="pb-4 bg-gray-50">
                <Label htmlFor="message" value="Additional Notes: (optional)" className="font-medium" />
                <Textarea
                    id="message"
                    rows={4}
                    placeholder='"Baby chair required"'
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-600">
                    *We currently only operate within the following areas: Brighton, Hove, Portslade, Southwick, Shoreham, Ovingdean, Rottingdean, Saltdean, and Woodingdean as well as major airports including London Gatwick, Heathrow, Stansted, and Luton. Pick-ups in areas beyond may incur an additional charge. In some cases, we may have to cancel your booking if it exceeds our operating area, depending on driver availability.
                </p>
            </div>
  
        </form>
    );
}

export default BookingForm;
