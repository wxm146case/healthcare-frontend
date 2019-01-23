import axios from "axios/index";

const API_URL = process.env.REACT_APP_API_URL;

export function getDoctors() {
    let promise = axios.get(`${API_URL}/users/doctors`);

    return {
        type: 'GET_DOCTORS',
        payload: promise
    };
}