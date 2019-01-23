import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function getComments(id) {
    let promise = axios.get(`${API_URL}/comments/${id}`);
    console.log('invoke get action');

    return {
        type: 'GET_COMMENTS',
        payload: promise
    };
}

export function addComment(comment, id, callback) {
    let promise = axios.post(`${API_URL}/comments/${id}`, comment)
        .then(res => {
            callback(res);
            return {
                comment: comment,
                success: res.data.success
            };
        });
    return {
        type: 'ADD_COMMENT',
        payload: promise
    };

}