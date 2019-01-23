import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function addAppointment(appointment, callback) {
    let promise = axios.post(`${API_URL}/appointments`, appointment, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                success: res.data.success
            };
        });
    return {
        type: 'ADD_APPOINTMENT',
        payload: promise
    };

}

export function getAppointments() {
    let promise = axios.get(`${API_URL}/appointments`, {withCredentials: true});

    return {
        type: 'GET_APPOINTMENTS',
        payload: promise
    };
}