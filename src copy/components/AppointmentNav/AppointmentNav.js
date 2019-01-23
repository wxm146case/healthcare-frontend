import React, {Component} from 'react';
import {Link} from "react-router-dom";



class AppointmentNav extends Component {


    render() {
        return (
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link" to="/doctorAppointments/new-requests">New Request</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/doctorAppointments/new-appointments">Following Appointments</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/doctorAppointments/ongoing-appointments">Ongoing Appointments</Link>
                </li>
            </ul>
        )
    }
}


export default AppointmentNav;