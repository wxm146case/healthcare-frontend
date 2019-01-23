import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import AuthReducer from './auth.reducer';
import AppointmentsReducer from './appointments.reducer';
import DoctorsReducer from './doctors.reducer';
import FilteredDoctorsReducer from './filteredDoctor.reducer'
import CommentsReducer from './comments.reducer'

const rootReducer = combineReducers({
    form: FormReducer,
    loggedIn: AuthReducer,
    appointments: AppointmentsReducer,
    doctors: DoctorsReducer,
    filteredDoctors: FilteredDoctorsReducer,
    comments: CommentsReducer,
});
export default rootReducer;