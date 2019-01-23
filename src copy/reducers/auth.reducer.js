import {LOGIN, LOGOUT} from '../actions/auth.action';

export default function(state = null, action) {
    let res;
    switch (action.type) {
        case LOGIN:
            res = action.payload.data;
            if (res.success) {
                console.log(res.user);
                return res.user;
            } else {
                return null;
            }
        case LOGOUT:
        res = action.payload.data;
        if (res && res.success) {
            return null;
        } else {
            return state;
        }
        default:
            // any action will be sent to all the reducers.
            // only reducer which can handle the action should update its state.
            // other reducers should keep its state UNCHANGED!!!
            return state;
    }
}