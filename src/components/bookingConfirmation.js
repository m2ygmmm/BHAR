import React from 'react';
import { Card } from 'flowbite-react';

function BookingConfirmation({ formData, airportData, generalTripData }) {

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

    let content;
    if (generalTripData.start) {
      content = (
        <p className="text-gray-600 p-1 capitalize">
          <strong>{generalTripData.car}</strong> from <strong>{generalTripData.start}</strong> to <strong>{generalTripData.destination}</strong>
        </p>
      );
    } else {
      content = (
        <p className="text-gray-600 p-1 capitalize">
          <strong>{airportData.car}</strong> {airportData.direction}: <strong>{airportData.airport}</strong>
        </p>
      );
    }

    return (
      <div className="bg-gray-50">
        <h3 className="text-lg mb-4 text-gray-600 text-center">Please review your details before confirming your booking.</h3>
        <Card className="border-0 border-gray-200 rounded-none mb-2">
          <div className="flex flex-col">
            <p className="text-gray-600 p-1"><strong>Name:</strong> {formData.fname || '...'} {formData.lname}</p>
            <p className="text-gray-600 p-1"><strong>Email:</strong> {formData.email || '...'}</p>
            <p className="text-gray-600 p-1 border-b-2"><strong>Phone:</strong> {formData.phone || '...'}</p>
          </div>
        </Card>
        <Card className="border-0 border-gray-200 rounded-none">
          <div className="flex flex-col">
            {content}
            <p className="text-gray-600 p-1 capitalize">
              <strong>Departing On:</strong> {formattedDepartureDate}
            </p>
            <p className="text-gray-600 p-1 capitalize">
              <strong>Returning On:</strong> {formattedReturnDate}
            </p>
            <p className="text-gray-600 p-1 capitalize">
              <strong>Address:</strong> {formData.address || '...'}
            </p>
            <p className="text-gray-600 p-1 text-2xl border-b-2">
              <strong>Total: £{airportData.price || generalTripData.price || 'Price to be confirmed'}</strong>
            </p>
          </div>
        </Card>

        {formData.message && (
          <Card className="border-0 border-gray-200 rounded-none">
            <h3 className="text-xl font-semibold text-gray-000 text-center">Additional Notes</h3>
            <p className="text-gray-600">{formData.message}</p>
          </Card>
        )}
      </div>
    );
}

export default BookingConfirmation;
