import { useState } from "react";
import { Tabs, Accordion, Spinner, Button, Modal } from "flowbite-react";
import { MdLocalTaxi, MdAirplanemodeActive, MdCheckCircle } from "react-icons/md"; 
import AirportBookingSys from "./airportBookingSys";
import BookingForm from "./passengerInfo";
import BookingConfirmation from "./bookingConfirmation";
import GeneralBookingSys from "./generalBookingSys";
import sendEmail from "./tripEmail"; 

function BookingModal() {
    const [openModal, setOpenModal] = useState(true); // Automatically open the modal
    const [activeTab, setActiveTab] = useState(''); // Initialize with an empty string
    const [airportData, setAirportData] = useState({
        airport: "",
        car: "",
        direction: "",
        price: "",
        isReturn: false
    });
    const [generalTripData, setGeneralTripData] = useState({
        start: "",
        destination: "",
        car: "",
        price: "",
        isReturn: false
    });
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        address: "",
        ddate: "",
        rdate: "",
        dtime: "",
        rtime: "",
        email: "",
        phone: "",
        flightNo: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Formatting Departure Date and Time
    const departureTextDate = `${formData.ddate}T${formData.dtime}`;
    const departureDate = new Date(departureTextDate);
    const formattedDepartureDate = departureDate.toLocaleDateString('en-GB', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Formatting Return Date and Time if available
    let formattedReturnDate = 'Not Selected';
    if (formData.rdate && formData.rtime) {
        const returnTextDate = `${formData.rdate}T${formData.rtime}`;
        const returnDate = new Date(returnTextDate);
        formattedReturnDate = returnDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const handleSuccess = (response) => {
        setLoading(false);
        setSuccessMessage("Booking confirmed successfully! Please check your email for confirmation details.");
        setShowSuccessModal(true);
    };

    const handleError = (error) => {
        setLoading(false);
        setErrorMessage("Ensure all fields are accurately completed");
    };

    const handleBooking = async (source) => {
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        // Update activeTab before calling sendEmail
        setActiveTab(source);

        await sendEmail(formData, airportData, generalTripData, source, handleSuccess, handleError);
    };

    return (
        <>
            {/* Automatically open the modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="bg-gray-100">
                    <h1 className="text-2xl p-2">Complete your Booking</h1>
                </Modal.Header>
                <Modal.Body>
                    <Tabs aria-label="Booking Tabs" variant="fullWidth">
                        <Tabs.Item active={activeTab === 'airport'} title="Airport" icon={MdAirplanemodeActive}>
                            <Accordion className="border-none">
                                <Accordion.Panel>
                                    <Accordion.Title className="bg-white hover:bg-gray-100 text-lg">Select an Airport</Accordion.Title>
                                    <Accordion.Content className="bg-gray-50">
                                        <AirportBookingSys setAirportData={setAirportData} />
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title className="bg-white hover:bg-gray-100 text-lg">Enter your details</Accordion.Title>
                                    <Accordion.Content className="bg-gray-50">
                                        <BookingForm setFormData={setFormData} formData={formData} airportData={airportData} generalTripData={generalTripData}/>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title className="bg-white hover:bg-gray-100 text-lg">Confirmation</Accordion.Title>
                                    <Accordion.Content className="bg-gray-50">
                                        <div className="flex flex-col items-center">
                                            <BookingConfirmation formData={formData} airportData={airportData} generalTripData={generalTripData}/>
                                            <Button onClick={() => handleBooking('airport')} className="mt-4" gradientDuoTone="cyanToBlue">
                                                Confirm Booking
                                            </Button>
                                            <h3 className="text-md font-semibold text-gray-000 text-center p-4">Booking Cancellations and changes</h3>
                                                <p className="text-gray-600 text-sm text-center">You have the right to cancel your booking up to 24 hours before the booking time. No questions asked just inform us via email or phone. To cancel or change any bookings, you must contact our customer service team. 
                                                    A booking can be changed in advance by giving up to 24 hours’ notice prior to the transfer time. Changes to booking time and date requested less than 24 hours before the booking time is subject to availability and will incur a £10 admin fee.
                                                </p>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </Tabs.Item>

                        <Tabs.Item active={activeTab === 'general'} title="General" icon={MdLocalTaxi}>
                            <Accordion className="border-none">
                                <Accordion.Panel>
                                    <Accordion.Title className="bg-white hover:bg-gray-100 text-lg">Get a Quote</Accordion.Title>
                                    <Accordion.Content className="bg-gray-50">
                                        <GeneralBookingSys setGeneralTripData={setGeneralTripData} />
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title className="bg-white hover:bg-gray-100 text-lg">Enter your details</Accordion.Title>
                                    <Accordion.Content className="bg-gray-50">
                                        <BookingForm setFormData={setFormData} formData={formData} airportData={airportData} generalTripData={generalTripData}/>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title className="bg-white hover:bg-gray-100 text-lg">Confirmation</Accordion.Title>
                                    <Accordion.Content className="bg-gray-50">
                                        <div className="flex flex-col items-center">
                                            <BookingConfirmation formData={formData} airportData={airportData} generalTripData={generalTripData}/>
                                            <Button onClick={() => handleBooking('general')} className="mt-4">
                                                Confirm Booking
                                            </Button>
                                            <h3 className="text-md font-semibold text-gray-000 text-center p-4">Booking Cancellations and changes</h3>
                                                <p className="text-gray-600 text-sm text-center">You have the right to cancel your booking up to 24 hours before the booking time. No questions asked just inform us via email or phone. To cancel or change any bookings, you must contact our customer service team. 
                                                    A booking can be changed in advance by giving up to 24 hours’ notice prior to the transfer time. Changes to booking time and date requested less than 24 hours before the booking time is subject to availability and will incur a £10 admin fee.
                                                </p>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </Tabs.Item>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    {loading && <Spinner />}
                    {successMessage && <p className="text-green-500 mr-2">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </Modal.Footer>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onClose={() => {
                setShowSuccessModal(false);
                window.location.reload(); // Reload the page when modal closes
            }}>
                <Modal.Header className="bg-green-100 border-b border-green-300">
                    <div className="flex items-center">
                        <MdCheckCircle className="text-green-500 text-4xl mr-3" />
                        <h1 className="text-2xl font-semibold text-green-800">Booking Successful</h1>
                    </div>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p className="text-lg text-gray-700">
                        Your booking has been confirmed successfully! You will receive a confirmation email shortly.
                    </p>
                    <BookingConfirmation formData={formData} airportData={airportData} generalTripData={generalTripData}/>
                </Modal.Body>
                <Modal.Footer className="flex justify-center">
                    <Button color="green" onClick={() => {
                        setShowSuccessModal(false);
                        window.location.reload(); // Reload the page when modal closes
                    }}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BookingModal;
