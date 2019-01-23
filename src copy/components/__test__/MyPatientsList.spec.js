import React from "react";
import {mount, render, shallow} from "enzyme";
import MyPatientsList from "../MyPatientsList/MyPatientsList";
import configureStore from 'redux-mock-store'
import PatientView from "../MyPatientsList/PatientView/PatientView";


const initialState = {doctors: {}};

const mockStore = configureStore();

let store = mockStore(initialState);


describe('MyPatientsList component', () => {
    it('should render an unordered list', () => {
        const warpper = render(<MyPatientsList store={store} />);
        expect(warpper._root[0].name).toBe('div');
    });

    // it('should display 1 PatientView components when it receives 1 patient', () => {
    //     const state = {doctor : {
    //             doctorDetail: {
    //                 patients : [{
    //                     userDetail: {
    //                         name: 'allen'
    //                     }
    //                 }]
    //             }
    //         }};
    //
    //     store = mockStore(state);
    //     const warpper = shallow(<MyPatientsList store={store} />); // DOM tree
    //     expect(warpper.find(PatientView)).toHaveLength(1);
    //     warpper.unmount();
    // });


});




