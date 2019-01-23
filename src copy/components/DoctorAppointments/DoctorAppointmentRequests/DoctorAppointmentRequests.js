import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {getAppointments} from "../../../actions/appointments.action";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


class DoctorAppointmentRequests extends Component{

    constructor(props) {
        super(props);
        this.state = {
            appointment: null
        }
    }

    componentDidMount() {
        if (!this.props.appointments) {
            this.props.getAppointments();
        }
    }

    handleAccept = (appointment) => {
        axios.put(`${API_URL}/approve-appointment`, appointment)
            .then((res) => {
                if (res.data.success) {
                    this.props.getAppointments();
                    alert('Accept Appointment Success')
                } else {
                    alert('request failed');
                }
        })
    };

    handleDecline = (id) => {
        axios.delete(`${API_URL}/appointments/${id}`)
            .then((res) => {
                if (res.data.success) {
                    this.props.getAppointments();
                    alert('Decline Appointment Success')
                } else {
                    alert('request failed');
                }
            })
    };

    render() {
        return (
            <div>
                <img className="d-block mx-auto mb-4" src="//www.mayoclinic.org/UniversalNav/Styles/img/logo.png" alt="" width="72"
                     height="72" />
                <h4 className="text-center">Your New requests</h4>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Time</th>
                        <th>Patient Name</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (this.props.appointments) ? (this.props.appointments.length > 0) && this.props.appointments.map((appointment, index) => {

                            if (appointment.status === 'pending') {

                                console.log(typeof appointment.time);

                                return (
                                    <tr key={index}>
                                        <td>{appointment.time}</td>
                                        <td>{appointment.patient_name}</td>
                                        <td>{appointment.status}</td>
                                        <td>
                                            <Link to={`/view-appointment/${appointment.id}`}>Detail</Link>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-outline-success" data-toggle="modal"
                                                    data-target="#acceptModal">
                                                Accept
                                            </button>
                                            <div className="modal fade" id="acceptModal" tabIndex="-1" role="dialog"
                                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Confirm</h5>
                                                            <button type="button" className="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            Are you sure to accept this appointment?
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-dismiss="modal">Close
                                                            </button>
                                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.handleAccept(appointment)}>
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-outline-danger" data-toggle="modal"
                                                          data-target="#declineModal">
                                            Decline
                                            </button>
                                            <div className="modal fade" id="declineModal" tabIndex="-1" role="dialog"
                                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Confirm</h5>
                                                            <button type="button" className="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            Are you sure to decline this appointment?
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-dismiss="modal">Close
                                                            </button>
                                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.handleDecline(appointment.id)}>
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        }) : (<h3>Loading.........</h3>)
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

export default connect(mapStateToProps, {getAppointments})(DoctorAppointmentRequests);