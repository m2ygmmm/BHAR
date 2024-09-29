import React, { useState, useEffect } from "react";
import { Select } from "flowbite-react";
import { MdLuggage, MdOutlinePerson, MdInfo } from "react-icons/md";

// Define vehicle data including images and capacities
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
            suitcases: 3
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

const bookingTable = {
    Gatwick: {
        "Departing from": {
            saloon: 60,
            estate: 70,
            MPV: 80,
            executive: 80
        },
        "Arriving to": {
            saloon: 65,
            estate: 75,
            MPV: 85,
            executive: 85
        }
    },
    Heathrow: {
        "Departing from": {
            saloon: 120,
            estate: 130,
            MPV: 150,
            executive: 150
        },
        "Arriving to": {
            saloon: 125,
            estate: 135,
            MPV: 155,
            executive: 155
        }
    },
    Luton: {
        "Departing from": {
            saloon: 170,
            estate: 190,
            MPV: 220,
            executive: 220
        },
        "Arriving to": {
            saloon: 175,
            estate: 195,
            MPV: 225,
            executive: 225
        }
    },
    Stansted: {
        "Departing from": {
            saloon: 170,
            estate: 190,
            MPV: 220,
            executive: 220
        },
        "Arriving to": {
            saloon: 175,
            estate: 195,
            MPV: 225,
            executive: 225
        }
    }
};

function AirportBookingSys({ setAirportData }) {
    const [selectedAirport, setSelectedAirport] = useState("Gatwick");
    const [selectedDirection, setSelectedDirection] = useState("Departing from");
    const [selectedCar, setSelectedCar] = useState(null);
    const [returnOption, setReturnOption] = useState(false);

    const handleAirportSelect = (event) => {
        setSelectedAirport(event.target.value);
    };

    const handleDirectionSelect = (event) => {
        setSelectedDirection(event.target.value);
    };

    const handleCarSelect = (car) => {
        setSelectedCar(car);
    };

    const handleReturnOptionChange = (e) => {
        setReturnOption(e.target.checked);
    };

    const handleSelection = () => {
        setAirportData({
            airport: selectedAirport,
            car: selectedCar,
            direction: selectedDirection,
            price: calculatePrice(),
            isReturn: returnOption
        });
    };

    const calculatePrice = () => {
        if (!selectedAirport || !selectedDirection || !selectedCar) return 0;

        const airportBooking = bookingTable[selectedAirport];
        if (!airportBooking || !airportBooking[selectedDirection]) return 0;

        let price = airportBooking[selectedDirection][selectedCar] || 0;
        if (returnOption) {
            const returnDirection = selectedDirection === "Departing from" ? "Arriving to" : "Departing from";
            price += (airportBooking[returnDirection] || {})[selectedCar] || 0;
        }
        return price;
    };

    useEffect(() => {
        handleSelection();
    }, [selectedAirport, selectedDirection, selectedCar, returnOption]);

    const capitalized = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    return (
        <div>
            <div className="grid md:grid-cols-3 md:mb-4 gap-2">
            <div className="relative">
                    <label htmlFor="directionSelect" className="text-center block mb-1 text-md md:text-lg font-medium text-gray-900">
                        Direction:
                    </label>
                    <Select
                        id="directionSelect"
                        value={selectedDirection}
                        onChange={handleDirectionSelect}
                        className="w-full bg-gray-100 border-gray-300 rounded-md"
                    >
                        <option value="Departing">Departing from</option>
                        <option value="Arriving">Arriving to</option>
                    </Select>
                </div>

                <div className="relative">
                    <label htmlFor="airportSelect" className="text-center block mb-1 text-md md:text-lg font-medium text-gray-900">
                        Airport:
                    </label>
                    <Select
                        id="airportSelect"
                        value={selectedAirport}
                        onChange={handleAirportSelect}
                        className="w-full bg-gray-100 border-gray-300 rounded-md"
                    >
                        {Object.keys(bookingTable).map((airport) => (
                            <option key={airport} value={airport}>
                                {airport}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="flex flex-row items-center justify-center">
                    <label htmlFor="returnOption" className="mb-1 p-2 text-sm md:text-lg font-medium text-gray-900">
                        Return:
                    </label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="returnOption"
                            checked={returnOption}
                            onChange={handleReturnOptionChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>

            {selectedCar && (
                <div className="border-2 border-gray-300 p-4 mb-6 rounded-lg bg-gray-50">
                    <div className="text-center text-xl font-bold text-green-500">Total price: £{calculatePrice()}</div>
                    <div className="text-center font-semibold text-gray-700">
                        {selectedDirection}  {selectedAirport} - {capitalized(selectedCar)}
                        {returnOption ? " With Return" : " Without Return"}
                    </div>
                    <div className="flex items-start mt-4">
                        <MdInfo className="text-gray-400 mr-2" size={32} />
                        <p className="text-gray-500 text-xs font-normal">
                            Price includes all relevant charges including ULEZ, Congestion charges, Toll roads,
                            and airport drop-off fees. Includes Meet and Greet fee where selected.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {Object.keys(vehicleData).map((car) => (
                    <div
                        key={car}
                        onClick={() => handleCarSelect(car)}
                        className={`border-2 p-4 cursor-pointer rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                            selectedCar === car ? "border-green-500 shadow-lg bg-gray-200" : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                        <img src={vehicleData[car].image} alt={car} className="w-full md:h-32 object-contain mb-4 rounded-md" />
                        <div className="text-center">
                            <p className="font-bold">{car.toUpperCase()}</p>
                            <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2 mt-2 text-lg">
                                <MdOutlinePerson className="mr-1 text-xl text-gray-800" /> {vehicleData[car].capacity.passengers}
                                <MdLuggage className="ml-4 mr-1 text-xl text-gray-800" /> {vehicleData[car].capacity.suitcases}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AirportBookingSys;