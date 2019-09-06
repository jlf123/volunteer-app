import axios from 'axios';
import { BASE_API } from '../config';

export const queryForEvents = async query => {
    const { data } = await axios.get(`${BASE_API}/events`);
    return data;
};

export const volunteerForEvent = async (event, volunteer) => {
    let options = {
        eventID: event.value
    };
    if (volunteer.value) {
        options.volunteerID = volunteer.value;
    } else {
        // incase someone enter's their first and middle name, just join those into
        // the first name
        const names = volunteer.split(' ');
        options.volunteerFirstName = names
            .splice(0, names.length - 1)
            .join(' ');
        options.volunteerLastName = names[0];
    }
    axios.post(`${BASE_API}/signin`, options);
};
