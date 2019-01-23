import {getAppointments} from "../appointments.action";

describe('products action creator', () => {
    it('should have a getProducts action creator which returns an action', () => {
        expect(getAppointments).toBeDefined();
        const action = getAppointments();
        expect(action.type).toBe('GET_APPOINTMENTS');
        expect(action.payload).toBeInstanceOf(Promise);
    })
});