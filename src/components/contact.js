import React, { useState } from 'react';
import { Button, TextInput, Textarea, Spinner, Alert } from 'flowbite-react';
import emailjs from '@emailjs/browser';

function ContactSection() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, message } = formData;

    if (!email || !name || !message) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    const serviceID = "service_d8as4fo";
    const templateID = "template_82k6r6i";
    const publicKey = 'LT5n5FgPmI-ism-w_';

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        setSuccess(true);
        setLoading(false);
        setFormData({ email: '', name: '', message: '' }); // Reset form fields
      })
      .catch((error) => {
        console.log('Error:', error);
        setSuccess(false);
        setLoading(false);
      });
  };

  return (
    <section id="Contact" className="flex flex-col items-center p-4">
      <h1 className="text-center text-4xl font-lato p-4 font-bold">Contact Us</h1>
      <h1 className="text-center text-2xl font-lato p-4 font-bold">Have a question?</h1>
      <hr className="w-64 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10" />
      <p className="text-center p-6 font-lato text-lg font-medium">
        Feel free to send us any inquiries, and our team will respond within 24 hours.
      </p>
      <p className="text-center p-6 font-lato text-lg font-medium">
        Alternatively, you can email us at <a href="mailto:info@bhairportruns.co.uk" className="text-blue-500 underline">info@bhairportruns.co.uk</a>.
      </p>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto w-full">
        <div className="mb-5 p-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-center md:text-left font-lato">Your email</label>
          <TextInput
            id="email"
            type="email"
            placeholder="name@name.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-2.5"
          />
        </div>
        <div className="mb-5 p-2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-center md:text-left font-lato">Your Name</label>
          <TextInput
            id="name"
            type="text"
            placeholder="John Smith"
            required
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2.5"
          />
        </div>
        <div className="mb-5 p-2">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 text-center md:text-left font-lato">Your message</label>
          <Textarea
            id="message"
            rows="4"
            placeholder="Enter your message..."
            required
            value={formData.message}
            onChange={handleChange}
            className="block w-full p-2.5"
          />
        </div>
        <div className="flex flex-row gap-4">
          <Button
            type="submit"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={loading}
            gradientDuoTone="cyanToBlue"
          >
            Submit
          </Button>
          {loading && <Spinner aria-label="Loading..." className="text-gray-200 fill-blue-600" size="lg" />}
        </div>
        {success && (
          <Alert color="success" className="p-4 my-4 text-sm">
            <span className="font-medium">Thank you!</span> We will get in touch with you as soon as possible.
          </Alert>
        )}
        {error && (
          <Alert color="failure" className="p-4 my-4 text-sm">
            <span className="font-medium">Warning!</span> Please ensure the form has been filled out correctly.
          </Alert>
        )}
      </form>
      <h3 className="text-md font-semibold text-gray-000 text-center p-4">Booking Cancellations and changes</h3>
        <p className="text-gray-600 text-sm max-w-3xl text-center">You have the right to cancel your booking up to 24 hours before the booking time. No questions asked just inform us via email or phone. To cancel or change any bookings, you must contact our customer service team. 
          A booking can be changed in advance by giving up to 24 hours’ notice prior to the transfer time. Changes to booking time and date requested less than 24 hours before the booking time is subject to availability and will incur a £10 admin fee.
        </p>
    </section>
  );
}

export default ContactSection;
