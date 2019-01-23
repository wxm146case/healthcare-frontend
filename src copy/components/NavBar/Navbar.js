import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from '../../actions/auth.action';
import { withRouter } from "react-router-dom";


class Navbar extends Component {

    handleLogout = () => {
        this.props.logout((res) => {
            if(res.data && res.data.success) {
                localStorage.removeItem('user');
                alert('logout successfully !!')
                this.props.history.push('/');
            }
        });
    }

    render() {
        return (
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <img className="my-0 mr-md-auto font-weight-normal" src="//www.mayoclinic.org/UniversalNav/Styles/img/logo.png" alt=""/>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <Link className="p-2 text-dark" to="/">Home</Link>
                        <Link className="p-2 text-dark" to="/doctors">Find A Doctor</Link>
                        <Link className="p-2 text-dark" to="/appointment">Appointment</Link>
                        <Link className="p-2 text-dark" to="/locations">Locations & Directions</Link>
                    </nav>

                    {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).profiles[0].type === 'ROLE_PATIENT' ? (
                        <div className="dropdown">
                            <div className="btn btn-secondary dropdown-toggle" role="button"
                                 id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hello! {JSON.parse(localStorage.getItem('user')).userDetail.name}
                            </div>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link className="dropdown-item" to="/">My Profile</Link>
                                <Link className="dropdown-item" to="/patientAppointments">My Appointments</Link>
                                <button className="dropdown-item" onClick={this.handleLogout}>Log out</button>
                            </div>
                        </div>
                        ) : (
                        null
                    ) }

                    {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).profiles[0].type === 'ROLE_DOCTOR' ? (
                        <div className="dropdown">
                            <div className="btn btn-secondary dropdown-toggle" role="button"
                                 id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hello! {JSON.parse(localStorage.getItem('user')).userDetail.name}
                            </div>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link className="dropdown-item" to={`/chatroom/${JSON.parse(localStorage.getItem('user')).id}`}>My ChatRoom</Link>
                                <Link className="dropdown-item" to={`/my-patients/${JSON.parse(localStorage.getItem('user')).id}`}>My Patients List</Link>
                                <Link className="dropdown-item" to="/doctorAppointments/new-requests">My Appointments</Link>
                                <button type="submit" className="dropdown-item" onClick={this.handleLogout}>Log out</button>
                            </div>
                        </div>
                    ) : (
                        null
                    ) }


                    {(!localStorage.getItem('user')) ?
                        (
                            <div>
                                <Link className="btn btn-outline-primary" to="/login">Log in</Link>
                                <Link className="btn btn-outline-primary" to="/signup">Sign up</Link>
                            </div>
                        )
                     : (null)
                    }
                </div>
            </header>
        )
    }
}

function mapStateToProps({loggedIn}) {
    return {
        loggedIn
    }
}

export default connect(mapStateToProps, {logout})(withRouter(Navbar));