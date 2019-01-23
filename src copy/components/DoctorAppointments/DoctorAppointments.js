import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAppointments} from '../../actions/appointments.action';
import AppointmentNav from "../AppointmentNav/AppointmentNav";
import {Route, Switch} from "react-router";
import DoctorAppointmentRequests from "./DoctorAppointmentRequests/DoctorAppointmentRequests";
import DoctorNewAppointments from "./DoctorNewAppointments/DoctorNewAppointments";
import DoctorOngoingAppointments from "./DoctorOngoingAppointments/DoctorOngoingAppointments";



class DoctorAppointments extends Component{

    componentDidMount() {
        this.props.getAppointments();
    }

    render() {
        return (
            <div>
                <aside>
                    <AppointmentNav />
                </aside>
                <div>
                    <Switch>
                        <Route path="/doctorAppointments/new-requests" component={DoctorAppointmentRequests} />
                        <Route path="/doctorAppointments/new-appointments" component={DoctorNewAppointments} />
                        <Route path="/doctorAppointments/ongoing-appointments" component={DoctorOngoingAppointments} />
                    </Switch>
                </div>
            </div>
        );
    }

}

function mapStateToProps({appointments}) {
    return {
        appointments
    }
}

export default connect(mapStateToProps, {getAppointments})(DoctorAppointments);