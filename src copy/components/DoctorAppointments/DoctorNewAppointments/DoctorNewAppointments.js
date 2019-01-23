import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {getAppointments} from "../../../actions/appointments.action";


class DoctorNewAppointments extends Component{

    componentDidMount() {
        if (!this.props.appointments) {
            this.props.getAppointments();
        }
    }

    render() {
        console.log(this.props.appointments);
        return (
            <div>
                <img className="d-block mx-auto mb-4" src="//www.mayoclinic.org/UniversalNav/Styles/img/logo.png" alt="" width="72"
                     height="72" />
                <h4 className="text-center">Your Following Appointments</h4>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th>Time</th>
                        <th>Patient Name</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (this.props.appointments) ? (this.props.appointments.length > 0) && this.props.appointments.map((appointment, index) => {
                            if (appointment.status === 'approved') {
                                return (
                                    <tr key={index}>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.patient_name}</td>
                                        <td>{appointment.status}</td>
                                        <td>
                                            <Link to={`/view-appointment/${appointment.id}`}>Detail</Link>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        }) : (<p>Loading...</p>)
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

function mapStateToProps({appointments}) {
    return {
        appointments
    }
}

export default connect(mapStateToProps, {getAppointments})(DoctorNewAppointments);