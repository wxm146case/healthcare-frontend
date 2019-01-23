export default function(oldDoctors = null, action) {
    // return new products state based on action
    switch (action.type) {
            case 'GET_DOCTORS':
            return action.payload.data;
        default:
            // unknown action type should no update products
            return oldDoctors;
    }
}