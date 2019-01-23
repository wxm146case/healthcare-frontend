import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAppointments} from '../../actions/appointments.action';
import axios from "axios/index";
import "./ViewAppointment.css"

const API_URL = process.env.REACT_APP_API_URL;

class ViewAppointment extends Component{

    constructor(props) {
        super(props);
        this.state = {
            editContent: ''
        }
    }

    componentDidMount() {
        // load data
        this.props.getAppointments();
    }

    handleFinish = () => {
        axios.put(`${API_URL}/close-appointment`, this.props.appointment)
            .then((res) => {
                if (res.data.success) {
                    this.props.getAppointments();
                    alert('Finish Appointment Success');
                    this.props.history.push('/doctorAppointments/new-appointments');
                } else {
                    alert('request failed');
                }
            })
    };

    handleCancel = () => {
        axios.delete(`${API_URL}/appointments/${this.props.appointment.id}`)
            .then((res) => {
                if (res.data.success) {
                    if (JSON.parse(localStorage.getItem('user')).profiles[0].type === 'ROLE_PATIENT') {
                        this.props.getAppointments();
                        alert('Cancel Appointment Success');
                        this.props.history.push('/patientAppointments');
                    } else {
                        this.props.getAppointments();
                        alert('Cancel Appointment Success');
                        this.props.history.push('/doctorAppointments/new-appointments');
                    }

                } else {
                    alert('Cancel failed');
                }
            })
    };

    handleBack = () => {
        if (JSON.parse(localStorage.getItem('user')).profiles[0].type === 'ROLE_PATIENT') {
            this.props.history.push('/patientAppointments');
        } else {
            this.props.history.push('/doctorAppointments/new-requests');
        }
    };

    handleInputChange= (event) => {
        this.setState({
            editContent: event.target.value
        });
    };

    handleEdit= () => {
        this.props.appointment.prescription = this.state.editContent;
        axios.put(`${API_URL}/appointments`, this.props.appointment, {withCredentials: true})
            .then((res) => {
                if (res.data.success) {
                    alert('Add Prescription Success');
                    this.props.getAppointments();

                } else {
                    alert('request failed');
                }
            });
    };

    render() {
        const role = JSON.parse(localStorage.getItem('user')).profiles[0].type === 'ROLE_DOCTOR';
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Appointment</h3>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <h4 className="list-group-item-heading">Time</h4>
                        <p className="list-group-item-text">{this.props.appointment? this.props.appointment.time : null}</p>
                    </li>
                    <li className="list-group-item">
                        <h4 className="list-group-item-heading">Doctor</h4>
                        <p className="list-group-item-text">{this.props.appointment? this.props.appointment.doctor_name : null}</p>
                    </li>

                    <li className="list-group-item">
                        <h4 className="list-group-item-heading">Previous Diagnosis</h4>
                        <p className="list-group-item-text">{this.props.appointment? this.props.appointment.previous_diagnosis : null}</p>
                    </li>
                    <li className="list-group-item">
                        <h4 className="list-group-item-heading">Reason</h4>
                        <p className="list-group-item-text">{this.props.appointment? this.props.appointment.reason : null}</p>
                    </li>
                    <li className="list-group-item">
                        <h4 className="list-group-item-heading">Note</h4>
                        <p className="list-group-item-text">{this.props.appointment? this.props.appointment.note : null}</p>
                    </li>
                    {this.props.appointment && this.props.appointment.status === 'ongoing' ? (
                        <li className="list-group-item">
                            <h4 className="list-group-item-heading">Prescription</h4>
                            <p className="list-group-item-text">{this.props.appointment? this.props.appointment.prescription
                                : null}</p>
                        </li>
                    ) : (null)}

                    {role && this.props.appointment && this.props.appointment.status === 'ongoing'  ? (
                        <div>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#prescriptionModal"
                                    data-whatever="@mdo">Edit the prescription
                            </button>
                            <div className="modal fade" id="prescriptionModal" tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Prescription</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="message-text" className="col-form-label">Edit the prescription:</label>
                                                    <textarea className="form-control" id="message-text" onChange={this.handleInputChange}/>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                            </button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleEdit}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (null)}

                </ul>

                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary" onClick={this.handleBack}>Back</button>
                    </div>

                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-danger" data-toggle="modal"
                                data-target="#cancelModal">
                            Cancel this appointment
                        </button>
                        <div className="modal fade" id="cancelModal" tabIndex="-1" role="dialog"
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
                                        Are you sure to cancel this appointment?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleCancel}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {localStorage.getItem('user') && this.props.appointment && this.props.appointment.status === 'approved' &&  JSON.parse(localStorage.getItem('user')).profiles[0].type === 'ROLE_DOCTOR' ? (
                        (
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-success" data-toggle="modal"
                                        data-target="#finishModal">
                                    Finish this appointment
                                </button>
                                <div className="modal fade" id="finishModal" tabIndex="-1" role="dialog"
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
                                                Are you sure to finish this appointment?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-dismiss="modal">Close
                                                </button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                                        onClick={this.handleFinish}>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (
                        null
                    )}
                </div>
            </div>

        );
    }

}

function mapStateToProps({appointments}, componentProps) {
    const appointment = appointments && appointments.length > 0 ?  appointments.find(a => {
        return a.id === +componentProps.match.params.id;
    }): null;
    return {
        appointment
    }
}

export default connect(mapStateToProps, {getAppointments})(ViewAppointment);