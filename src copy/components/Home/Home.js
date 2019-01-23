import React, {Component} from 'react';
import {getDoctors} from "../../actions/doctors.action";
import {getFilteredDoctors} from "../../actions/filteredDoctors.action";
import {connect} from "react-redux";
import {getAppointments} from "../../actions/appointments.action";
import "./Home.css"
import {Link} from "react-router-dom";


class Home extends Component {

    componentDidMount() {
        if(!this.props.doctors) {
            this.props.getDoctors();
        }
        if(!this.props.filteredDoctors) {
            this.props.getFilteredDoctors();
        }
        if(!this.props.appointments) {
            this.props.getAppointments();
        }
    }

    render() {
        console.log(this.props.filteredDoctors)
        return (
            <div>
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className=""/>
                        <li data-target="#myCarousel" data-slide-to="1" className=""/>
                        <li data-target="#myCarousel" data-slide-to="2" className="active"/>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item">
                            <img className="first-slide"
                                 src="https://s3.amazonaws.com/msi-wma-static/hospital+back1.jpg"
                                 alt="First slide" />
                            <div className="container">
                                <div className="carousel-caption text-left">
                                    <h1>Patient Online Services</h1>
                                    <h5 style={{color: "white"}}>An easier way to a healthier you: See your records and results
                                        as fast as your clinician does.
                                        Manage your appointments
                                        with updated schedules and instructions.</h5>
                                    <p><Link to="/signup" className="btn btn-lg btn-primary" href="#" role="button">Sign up today</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="second-slide"
                                 src="https://s3.amazonaws.com/msi-wma-static/hospital+back2.jpeg"
                                 alt="Second slide" />
                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Appointments at Mayo Clinic</h1>
                                    <h5>Mayo Clinic works with hundreds of insurance companies and is an in-network provider for millions of people. </h5>
                                    <p><Link to="/requestAppointment" className="btn btn-lg btn-primary" href="#" role="button">Request an appointment</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img className="third-slide"
                                 src="https://s3.amazonaws.com/msi-wma-static/hospital+back3.jpg"
                                 alt="Third slide" />
                            <div className="container">
                                <div className="carousel-caption text-right">
                                    <h1>Access Anytime Anywhere.</h1>
                                    <h5>Find your way to the best care</h5>
                                    <p><Link to="/locations" className="btn btn-lg btn-primary" href="#" role="button"> Get directions</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>

        )
    }
}

function mapStateToProps({doctors, filteredDoctors, appointments}) {
    return {
        doctors,
        filteredDoctors,
        appointments
    }
}

export default connect(mapStateToProps, {getDoctors, getFilteredDoctors, getAppointments})(Home);
