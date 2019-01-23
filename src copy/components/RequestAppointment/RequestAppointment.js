import React, {Component} from 'react';
import './RequestAppointment.css'
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";
import {addAppointment, getAppointments} from "../../actions/appointments.action";
import {getDoctors} from "../../actions/doctors.action";
import {getFilteredDoctors} from "../../actions/filteredDoctors.action";

class RequestAppointments extends Component {

    componentDidMount() {
        if(!this.props.doctors) {
            this.props.getDoctors();
        }
        if(!this.props.filteredDoctors) {
            this.props.getFilteredDoctors();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: '',
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    submitHandler = (appointment) => {
        console.log(appointment);
        appointment.time = this.state.selectedDate;
        appointment.status = 'pending';
        console.log(appointment);
        this.props.addAppointment(appointment, (res) => {
            if (res.data && res.data.success) {
                this.props.getAppointments();
                alert('Request Appointment Successfully!');
                this.props.history.push('/');
            } else {
                alert(res.message);
            }
        })
    };

    handleChange(date) {
        let time_append = ' AM';
        let hours = date.getHours();
        if (date.getHours() >= 12) {
            time_append = ' PM';
            if (hours > 12) {
                hours -= 12;
            }
        }
        let format_date = (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear()) + ', ' + (hours) + ':';
        if (date.getMinutes() === 0) {
            format_date += '00'
        } else {
            format_date += date.getMinutes();
        }
        format_date += time_append;
        this.setState({
            selectedDate: format_date,
            startDate: date
        });
    }

    renderField(field) {
        return (
            <div className="form-group">
                <label>
                    <h6>{field.label}</h6>
                    <input
                        type={field.type}
                        className="form-control"
                        name={field.input.name}
                        {...field.input}
                        required
                    />
                </label>
            </div>
        );
    }

    renderBoxInput(field) {
        return (
            <div className="form-group">
                <label>
                    <h6>{field.label}</h6>
                    <textarea
                        size="300"
                        type={field.type}
                        name={field.name}
                        className="form-control"
                        aria-label="With textarea"
                        {...field.input}
                    />
                </label>
            </div>
        )
    }

    renderRequiredBoxInput(field) {
        return (
            <div className="form-group">
                <label>
                    <h6>{field.label}</h6>
                    <textarea
                        type={field.type}
                        name={field.name}
                        className="form-control"
                        aria-label="With textarea"
                        {...field.input}
                        required
                    />
                </label>
            </div>
        )
    }


    render() {
        return (
            <div className="container">
                <div className="py-5">
                    <img className="d-block mx-auto mb-4" src="//www.mayoclinic.org/UniversalNav/Styles/img/logo.png" alt="" width="72"
                         height="72" />
                        <h2 className="text-center">Request an appointment</h2>
                    <p className="lead">
                        Complete the form below to request an appointment at Mayo Clinic.
                        An appointment representative will contact you within three business days to review
                        your medical information before an appointment may be offered.
                    </p>
                    <p className="lead">
                        If you are having a medical emergency, call 911 or emergency medical help.
                        The team members who will care for you or your family have the expertise and skills to provide the best care possible.
                    </p>
                    <h5 className="head-text">All fields are required unless marked optional.</h5>
                    <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                        <div>
                            <h4 className="head-text">Choose A Doctor</h4>
                            <div className="col-4">
                                <Field
                                    name="doctor_department"
                                    label="Doctor Department"
                                    type="text"
                                    component={this.renderField}
                                />
                            </div>
                            <div className="col-4">
                                <Field
                                    name="doctor_name"
                                    label="Doctor Name"
                                    type="text"
                                    component={this.renderField}
                                />
                            </div>
                            <div className="col-4">
                                <Field
                                    name="doctor_id"
                                    label="Doctor ID"
                                    type="number"
                                    component={this.renderField}
                                />
                            </div>
                        </div>
                        <div>
                            <h4 className="head-text">Appointment Details</h4>
                        </div>
                        <h6>Select the date</h6>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                        <Field
                            name="previous_diagnosis"
                            label="Previous diagnosis(optional)"
                            type="text"
                            component={this.renderBoxInput}
                            className="diagnosis_input"
                        />
                        <Field
                            name="reason"
                            label="Reason for Appointment"
                            type="text"
                            component={this.renderRequiredBoxInput}
                            className="diagnosis_input"
                        />
                        <Field
                            name="note"
                            label="Additional information"
                            type="text"
                            component={this.renderRequiredBoxInput}
                            className="diagnosis_input"
                        />
                        <button className="btn btn-primary" type="submit">Submit</button>
                        <Link to="./">
                            <button className="btn btn-primary">Cancel</button>
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({doctors},componentProps) {
    const doctor = doctors ? doctors && doctors.find(d => {
        return d.id === +componentProps.match.params.id;
    }): null;
    if (doctor) {
        return {
            initialValues: {
                doctor_department: doctor.doctorDetail.department,
                doctor_name: doctor.userDetail.name,
                doctor_id: doctor.id
            },
            doctor
        }
    } else {
        return {
            doctor
        };
    }

}

export default connect(mapStateToProps, {getAppointments, addAppointment, getDoctors, getFilteredDoctors})(
    reduxForm({
        form: 'RequestAppointmentForm'
    })(RequestAppointments)
);