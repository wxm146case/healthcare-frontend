import AppointmentReducer from '../appointments.reducer'

describe('appointments reducer', () => {
    it('should handle GET_APPOINTMENTS action', () => {
        const appointment = [{time: '01/01/2018', previous_diagnosis: 'test', reason: 'test', note: 'test', status: 'test', prescription: 'test'}];
        const action = {
            type: 'GET_APPOINTMENTS',
            payload: {
                data: appointment
            }
        };
        let newState = AppointmentReducer(null, action);
        expect(newState).toStrictEqual(appointment);
    });
});

