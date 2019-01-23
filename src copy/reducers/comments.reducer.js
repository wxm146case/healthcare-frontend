export default function(oldComments = [], action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...oldComments, action.payload.comment];
        case 'GET_COMMENTS':
            return action.payload.data;
        default:
            return oldComments;
    }
}