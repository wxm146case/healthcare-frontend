import React, {Component} from 'react';
import  './AppointmentPage.css';
import {Link} from "react-router-dom";

export default class AppointmentPage extends Component {
    render() {
        return (
            <div id="main">
                <div className="page-header">
                    <h1>Appointments at Mayo Clinic</h1>
                </div>
                <div className="placeholder">
                </div>
                <div id="main-content" role="main">
                    <div className="row">
                        <p>
                            Mayo Clinic works with hundreds of insurance companies and is an in-network provider for millions of people.
                            In most cases, Mayo Clinic doesn't require a physician referral. Some insurers require referrals,
                            or may have additional requirements for certain medical care. All appointments are prioritized on the basis of medical need,
                            and the team members who will care for you or your family have the expertise and skills to provide the best care possible.
                        </p>
                    </div>
                    <div className="col">
                        <div className="contentbox">
                            <h2>Telephone Request</h2>
                            <h3>Mayo Clinic in Arizona</h3>
                            <ul>
                                <li>800-446-2279 (toll-free)</li>
                                <li>8 a.m. to 5 p.m. Mountain Standard Time, Monday through Friday</li>
                            </ul>
                            <h3>Mayo Clinic in Florida</h3>
                            <ul>
                                <li>904-953-0853</li>
                                <li>8 a.m. to 5 p.m. Eastern time, Monday through Friday</li>
                            </ul>
                            <h3>Mayo Clinic in Minnesota</h3>
                            <ul>
                                <li>507-538-3270</li>
                                <li>7 a.m. to 6 p.m. Central time, Monday through Friday</li>
                            </ul>
                            <h3>Mayo Clinic Children's Center</h3>
                            <ul>
                                <li>855-MAYO-KID (855-629-6543, toll-free)</li>
                                <li>7 a.m. to 6 p.m. Central time, Monday through Friday</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="contentbox">
                            <h2>Online Request</h2>
                            <p>Request an appointment using our secure online form.
                                Our goal is to contact you by phone within three business days to review your medical and financial information.
                            </p>
                            <Link to="/requestAppointment">
                                <button type="button" className="btn btn-primary btn-lg active">Request Appointment</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="contentbox">
                                <h2>Questions about appointments?</h2>
                                <Link to="/questions">
                                    See the list of frequently asked questions
                                </Link>
                            </div>
                        </div>
                        <div className="col">
                            <div className="contentbox">
                                <h2>Referring a patient</h2>
                                <p>
                                    Physicians may refer a patient or arrange a
                                    consultation by phone or use Mayo Clinic's
                                    online services for referring physicians
                                </p>
                                <Link to="/refer">
                                    Find out more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}