import emailjs from '@emailjs/browser';

async function sendEmail(formData, airportData, generalTripData, source, onSuccess, onError) {
    const prepareParams = () => {

        let params;

        if (source === 'airport' && airportData && airportData.airport) {
            params = {
                end_address_modal: airportData.direction === "To Airport" ? `${airportData.airport} Airport` : formData.address,
                start_address_modal: airportData.direction === "To Airport" ? formData.address : `${airportData.airport} Airport`,
                start_time_modal: formData.ddate && formData.dtime ? `${formData.ddate} At ${formData.dtime}` : null,
                return_time_modal: airportData.isReturn ? (formData.rdate && formData.rtime ? `${formData.rdate} At ${formData.rtime}` : null) : "Not Included",
                floating_first_name: formData.fname,
                floating_last_name: formData.lname,
                floating_email: formData.email,
                floating_phone: formData.phone,
                flight_no: formData.flightNo || "Not Included",
                message: formData.message || 'Not Included',
                vehicleType: airportData.car,
                finalPrice: `£${airportData.price}`
            };
        } else if (source === 'general' && generalTripData && generalTripData.start) {
            params = {
                start_address_modal: generalTripData.start,
                end_address_modal: generalTripData.destination,
                start_time_modal: formData.ddate && formData.dtime ? `${formData.ddate} At ${formData.dtime}` : null,
                return_time_modal: generalTripData.isReturn ? (formData.rdate && formData.rtime ? `${formData.rdate} At ${formData.rtime}` : null) : "Not Included",
                floating_first_name: formData.fname,
                floating_last_name: formData.lname,
                floating_email: formData.email,
                floating_phone: formData.phone,
                flight_no: formData.flightNo || "Not Included",
                message: formData.message || 'Not Included',
                vehicleType: generalTripData.car,
                finalPrice: `£${generalTripData.price}`
            };
        } else {
            return { error: 'No valid data available to send.' };
        }

        const requiredFields = [
            'start_address_modal',
            'end_address_modal',
            'start_time_modal',
            'floating_first_name',
            'floating_last_name',
            'floating_email',
            'floating_phone'
        ];

        const missingFields = requiredFields.filter(field => !params[field]);
        if (params.return_time_modal === "Not Included" || params.return_time_modal) {
            if (!params.start_time_modal || !params.return_time_modal) {
                missingFields.push('return_time_modal');
            }
        }

        if (missingFields.length) {
            return { error: `Missing or incomplete data for fields: ${missingFields.join(', ')}` };
        }

        return params;
    };

    const preparedParams = prepareParams();

    if (preparedParams.error) {
        console.error('Error:', preparedParams.error);
        if (onError) {
            onError(new Error(preparedParams.error));
        }
        return;
    }

    try {
        const res = await emailjs.send("service_s8tl4is", "template_wensyzw", preparedParams, {
            publicKey: 'Pyq_1JoPM7LlFbU3U'
        });
        if (onSuccess) {
            onSuccess(res);
        }
    } catch (err) {
        console.error('Email send error:', err);
        if (onError) {
            onError(err);
        }
    }
}

export default sendEmail;
