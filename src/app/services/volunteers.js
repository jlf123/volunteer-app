import axios from 'axios';
import { BASE_API } from '../config';
import moment from 'moment';

export const queryForVolunteers = async query => {
    const { data } = await axios.get(`${BASE_API}/volunteers`);
    return data;
};

export const signVolunteerOut = async volunteerID => {
    axios.post(`${BASE_API}/signout`, {
        params: {
            timestamp: moment().format(),
            volunteerID
        }
    });
};
