import axios from "axios/index";

const API_URL = process.env.REACT_APP_API_URL;

export function getFilteredDoctors() {
    let promise = axios.get(`${API_URL}/users/doctors`);
    return {
        type: 'GET_FILTERED_DOCTORS',
        payload: promise
    };
}

export function editFilteredDoctors(filteredDoctors) {
    return {
        type: 'EDIT_FILTERED_DOCTORS',
        payload: filteredDoctors
    };
}