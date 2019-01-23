import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-bootstrap'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/alert';
import 'popper.js';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import ReduxPromise from 'redux-promise';
import rootReducer from "./reducers/root.reducer";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import Login from "./components/Login/Login";
import PatientAppointments from "./components/PatientAppointments/PatientAppointments";
import ViewAppointment from "./components/ViewAppointment/ViewAppointment";
import AppointmentPage from "./components/AppointmentPage/AppointmentPage";
import SignUp from "./components/SignUp/SignUp";
import RequestAppointment from "./components/RequestAppointment/RequestAppointment";
import DoctorAppointments from "./components/DoctorAppointments/DoctorAppointments";
import DoctorsList from "./components/DoctorsList/DoctorsList";
import Home from "./components/Home/Home";
import ViewDoctor from "./components/VIiewDoctor/ViewDoctor";
import auth from './components/auth.hoc';
import Locations from "./components/Locations/Locations";
import ArizonaLocation from "./components/Locations/LocationsMap/ArizonaLocation";
import FloridaLocation from "./components/Locations/LocationsMap/FloridaLocation";
import MinnesotaLocation from "./components/Locations/LocationsMap/MinnesotaLocation";
import MyPatientsList from "./components/MyPatientsList/MyPatientsList";
import Chatroom from "./components/Chatroom/Chatroom";



const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/locations/arizona' component={ArizonaLocation} />
                    <Route path='/locations/florida' component={FloridaLocation} />
                    <Route path='/locations/minnesota' component={MinnesotaLocation} />
                    <Route path='/locations' component={Locations} />
                    <Route path='/doctors' component={DoctorsList} />
                    <Route path='/chatroom/:doctorID' component={Chatroom} />
                    <Route path='/my-patients/:id' component={MyPatientsList} />
                    <Route path='/view-doctor/:id' component={ViewDoctor} />
                    <Route path='/patientAppointments' component={auth(PatientAppointments)} />
                    <Route path='/doctorAppointments' component={auth(DoctorAppointments)} />
                    <Route path='/appointment' component={AppointmentPage} />
                    <Route path='/requestAppointment/:id' component={auth(RequestAppointment)} />
                    <Route path='/requestAppointment' component={auth(RequestAppointment)} />
                    <Route path='/view-appointment/:id' component={auth(ViewAppointment)} />
                    <Route path='/signup' component={SignUp} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
