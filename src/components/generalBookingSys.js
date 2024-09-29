import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput, Label, Checkbox, Spinner, Alert } from "flowbite-react";
import { usePlacesWidget } from "react-google-autocomplete";
import { MdLuggage, MdOutlinePerson, MdInfo } from "react-icons/md";

// Replace with your API key, ideally stored in an environment variable
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || 'AIzaSyCYGCqAuRld_Ly4H4Yyshj-Q8ayKXnP7xg'; 

const vehicleData = {
    saloon: {
        image: `${process.env.PUBLIC_URL}/images/saloon_econ.png`,
        capacity: {
            passengers: 4,
            suitcases: 2
        }
    },
    estate: {
        image: `${process.env.PUBLIC_URL}/images/estate.png`,
        capacity: {
            passengers: 4,
            suitcases: 4
        }
    },
    MPV: {
        image: `${process.env.PUBLIC_URL}/images/mpv.png`,
        capacity: {
            passengers: 8,
            suitcases: 8
        }
    },
    executive: {
        image: `${process.env.PUBLIC_URL}/images/saloon car.png`,
        capacity: {
            passengers: 4,
            suitcases: 2
        }
    }
};

function BookingForm({ setGeneralTripData }) {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [distance, setDistance] = useState(null);
    const [vehicleType, setVehicleType] = useState(''); // Default vehicle type
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [returnOption, setReturnOption] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { ref: refAddress1 } = usePlacesWidget({
        apiKey: API_KEY,
        onPlaceSelected: (place) => {
            setAddress1(place.formatted_address || place.name);
        },
        options: {
            componentRestrictions: { country: "uk" },
            types: ['geocode', 'establishment'],
        },
    });

    const { ref: refAddress2 } = usePlacesWidget({
        apiKey: API_KEY,
        onPlaceSelected: (place) => {
            setAddress2(place.formatted_address || place.name);
        },
        options: {
            componentRestrictions: { country: "uk" },
            types: ['geocode', 'establishment'],
        },
    });

    // Function to convert kilometers to miles
    const kilometersToMiles = (km) => km * 0.621371;

    const calculatePrice = (miles, baseFare, perMileRate) => {
        return baseFare + (perMileRate * miles);
    };

    const fetchDistance = async (origin, destination) => {
        setErrorMessage(''); // Clear any previous error message
        setLoading(true); // Set loading to true at the beginning
        console.log(loading)
        try {
            const response = await axios.get(`https://api.distancematrix.ai/maps/api/distancematrix/json`, {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: 'ohnHABNalqBeovHlRD8MuUwwb1Ch8W7FDzThIhL99K985pBgUxhQpIYtwOrnAFs1'
                }
            });
    
            if (response.data.status === 'OK') {
                const distanceInfo = response.data.rows[0].elements[0];
                if (distanceInfo.status === 'OK') {
                    const distanceInKm = parseFloat(distanceInfo.distance.text.match(/\d+\.?\d*/)[0]);
                    const distanceInMiles = kilometersToMiles(distanceInKm);
    
                    let baseFare, perMileRate;
    
                    // Adjust rates based on vehicle type
                    switch(vehicleType){
                        case 'saloon':
                            baseFare = 10; // Base fare for shorter trips
                            perMileRate = distanceInMiles <= 25 ? 1.6 : 2.8; // Two-tier rate
                            break;
                        case 'estate':
                            baseFare = 12; 
                            perMileRate = distanceInMiles <= 25 ? 1.8 : 3.0;
                            break;
                        case 'MPV':
                        case 'executive':
                            baseFare = 15;
                            perMileRate = distanceInMiles <= 25 ? 2.0 : 3.5;
                            break;
                        default:
                            baseFare = 0;
                            perMileRate = 0;
                    }
    
                    let calculatedPrice = Math.round(calculatePrice(distanceInMiles, baseFare, perMileRate));
                    if (returnOption) {
                        calculatedPrice *= 2;
                    }
    
                    setDistance({
                        distance: `${distanceInMiles.toFixed(2)} miles`,
                        duration: distanceInfo.duration.text
                    });
                    setPrice(calculatedPrice);
    
                } else {
                    console.error('Distance Matrix API error:', distanceInfo.status);
                    setErrorMessage('Error, Please check all fields are correctly entered.');
                    setDistance(null);
                    setPrice(null);
                }
            } else {
                console.error('Distance Matrix API error:', response.data.status);
                setErrorMessage('Error, Please check all fields are correctly entered.');
                setDistance(null);
                setPrice(null);
            }
        } catch (error) {
            console.error('Error fetching distance:', error);
            setErrorMessage('Error, Please check all fields are correctly entered.');
            setDistance(null);
            setPrice(null);
        } finally {
            setLoading(false); // Set loading to false after the API call
            console.log(loading)
        }
    };
    
    const handleCalculateDistance = (event) => {
        event.preventDefault();
        if (!address1 || !address2) {
            setErrorMessage('Please enter both pick-up and drop-off addresses.');
        } else {
            fetchDistance(address1, address2);
        }
    };

    const handleSelection = () => {
        setGeneralTripData({ start: address1, destination: address2, car: vehicleType, price: price, isReturn: returnOption });
    };

    useEffect(() => {
        if (address1 && address2) {
            fetchDistance(address1, address2);
        }
    }, [vehicleType, returnOption]);

    useEffect(() => {
        handleSelection();
    }, [address1, address2, vehicleType, price, returnOption]);

    return (
        <div>
            <form className="max-w-lg mx-auto" onSubmit={handleCalculateDistance}>
                <div className="grid md:grid-cols-2 text-center">
                    <div className='p-2'>
                    <Label htmlFor="address1" value="Pick-up from:" className="text-gray-900 font-medium text-md" />
                    <TextInput
                        id="address1"
                        type="text"
                        ref={refAddress1}
                        placeholder="Enter a location..."
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        required
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    </div>
                    <div className='p-2'>
                    <Label htmlFor="address2" value="Drop-off to:" className="mb-2 text-gray-900 font-medium text-md" />
                    <TextInput
                        id="address2"
                        type="text"
                        ref={refAddress2}
                        placeholder="Enter a location..."
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        required
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <div className='text-center flex flex-row'>
                    <label htmlFor="returnOption" className="mb-1 p-2 text-sm md:text-lg font-medium text-gray-900">
                        Return:
                    </label>
                    <div className="p-2">
                        <Checkbox
                            id="returnOption"
                            checked={returnOption}
                            onChange={(e) => setReturnOption(e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                    </div>
                    </div>
                </div>

                {errorMessage && (
                    <Alert color="failure" className="mb-6">
                        <span>{errorMessage}</span>
                    </Alert>
                )}

                {(vehicleType || distance) && (
                    <div className="mb-6">
                        {address1 && address2 &&(
                        <>
                            <div className="text-center font-semibold text-gray-700">
                                Selected Trip with {vehicleType.toUpperCase()} and
                                {returnOption ? " With Return" : " Without Return"}:
                            </div>
                            <div className="text-center text-lg font-bold text-green-500">
                                Total price: £{price}
                            </div>
                        </>
                        )}

                        {distance && (
                            <div className="mt-4">
                                <p className="text-lg font-semibold">Distance and Duration:</p>
                                <p>Distance: {distance.distance}</p>
                                <p>Duration: {distance.duration}</p>
                            </div>
                        )}

                        {vehicleType && (
                            <div className="flex items-start mt-4">
                                <MdInfo className="text-gray-400 mr-2" size={32} />
                                <p className="text-gray-500 text-xs font-normal">
                                    Price includes all relevant charges including ULEZ, Congestion charges, Toll roads, 
                                    and other relevant fees.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </form>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                {Object.keys(vehicleData).map((vehicle) => (
                    <div
                        key={vehicle}
                        className={`border-2 p-4 cursor-pointer rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                            vehicleType === vehicle ? 'border-green-500 shadow-lg bg-gray-200' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setVehicleType(vehicle)}
                    >
                        <img
                            src={vehicleData[vehicle].image}
                            alt={`${vehicle} vehicle`}
                            className="w-full md:h-32 object-contain mb-4 rounded-md" 
                        />
                        <div className="text-center">
                            <p className="font-bold">{vehicle.toUpperCase()}</p>
                                <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2 mt-2 text-lg">
                            <MdOutlinePerson className="mr-1 text-xl text-gray-800" /> {vehicleData[vehicle].capacity.passengers}
                            <MdLuggage className="ml-4 mr-1 text-xl text-gray-800" /> {vehicleData[vehicle].capacity.suitcases}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingForm;
