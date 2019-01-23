import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAppointments} from '../../actions/appointments.action';
import {Link} from "react-router-dom";

class PatientAppointments extends Component{

    componentDidMount() {
        if (!this.props.appointments) {
            this.props.getAppointments();
        }
    }

    render() {
        return (
            <div>
                <img className="d-block mx-auto mb-4" src="//www.mayoclinic.org/UniversalNav/Styles/img/logo.png" alt="" width="72"
                     height="72" />
                <h4 className="text-center">Your pending appointment requests</h4>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.appointments ? this.props.appointments.length > 0 && this.props.appointments.map((appointment, index) => {
                            if (appointment.status === 'pending') {
                                return (
                                    <tr key={index}>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.doctor_name}</td>
                                        <td>{appointment.status}</td>
                                        <td>
                                            <Link to={`/view-appointment/${appointment.id}`}>Detail</Link>
                                        </td>

                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        }) : (<h3>Loading...be Patient!</h3>)
                    }
                    </tbody>
                </table>
                <div style={{height:'50px'}}/>
                <h4 className="text-center">Your upcoming appointments</h4>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.appointments && this.props.appointments.length > 0 && this.props.appointments.map((appointment, index) => {
                            if (appointment.status === 'approved') {
                                return (
                                    <tr key={index}>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.doctor_name}</td>
                                        <td>{appointment.status}</td>
                                        <td>
                                            <Link to={`/view-appointment/${appointment.id}`}>Detail</Link>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        })
                    }
                    </tbody>
                </table>
                <div style={{height:'50px'}}/>
                <h4 className="text-center">Your ongoing appointments</h4>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.appointments ? this.props.appointments.length> 0 && this.props.appointments.map((appointment, index) => {
                            if (appointment.status === 'ongoing') {
                                return (
                                    <tr key={index}>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.doctor_name}</td>
                                        <td>{appointment.status}</td>
                                        <td>
                                            <Link to={`/view-appointment/${appointment.id}`}>Detail</Link>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        }) : <p>loading...</p>
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

export default connect(mapStateToProps, {getAppointments})(PatientAppointments);