import React from 'react';
import moxios from 'moxios';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux';
import ReduxPromise from "redux-promise";
import rootReducer from "../reducers/root.reducer";
import {BrowserRouter} from 'react-router-dom';
import {mount} from "enzyme";
import DoctorAppointmentRequests
    from "../components/DoctorAppointments/DoctorAppointmentRequests/DoctorAppointmentRequests";


describe('appointments integration test', () => {

    beforeEach(() => {
        moxios.install();
        moxios.stubRequest('http://localhost:8080/appointments', {
            status: 200,
            response: [
                {time: '01/01/2018', previous_diagnosis: 'test1', reason: 'test1', note: 'test1', status: 'pending', prescription: 'test1'},
                {time: '02/02/2018', previous_diagnosis: 'test2', reason: 'test2', note: 'test2', status: 'pending', prescription: 'test2'}
            ]
        });
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('should load appointments to redux store and display in  DoctorAppintmentRequests component', () => {
        const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
        const warpper = mount(
            <Provider store={createStoreWithMiddleware(rootReducer)}>
                <BrowserRouter>
                    <DoctorAppointmentRequests />
                </BrowserRouter>
            </Provider>
        );
        // wait for asynchronous request to finish
        moxios.wait(() => {
            // ajax is done
            warpper.update(); // forceUpdate
            expect(warpper.find('tbody tr')).toHaveLength(2);
            warpper.unmount();
        });
    });

})