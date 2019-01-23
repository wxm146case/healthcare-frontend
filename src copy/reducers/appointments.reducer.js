export default function(oldAppointments = null, action) {
    // return new products state based on action
    switch (action.type) {
        case 'ADD_APPOINTMENT':
            return oldAppointments;
        case 'GET_APPOINTMENTS':
            return action.payload.data;
        default:
            // unknown action type should no update products
            return oldAppointments;
    }
}