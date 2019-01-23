export default function(oldFilteredDoctors = null, action) {
    switch (action.type) {
        case 'GET_FILTERED_DOCTORS':
            return action.payload.data;
        case 'EDIT_FILTERED_DOCTORS':
            return action.payload;
        default:
            return oldFilteredDoctors;
    }
}