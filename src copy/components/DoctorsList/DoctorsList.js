import React, {Component} from 'react';
import './DoctorsList.css'
import {Link} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {getDoctors} from "../../actions/doctors.action";
import {editFilteredDoctors, getFilteredDoctors} from "../../actions/filteredDoctors.action";

class DoctorsList extends Component {

    componentDidMount() {
        if(!this.props.doctors) {
            // if products are not loaded, load products...
            this.props.getDoctors();
        }
        if(!this.props.filteredDoctors) {
            // if products are not loaded, load products...
            this.props.getFilteredDoctors();
        }
    }

    onSubmit = (info) => {
        let newDoctorList = this.props.filteredDoctors.filter((doctor) => {
            if (info.location === 'all') {
                return ((doctor.userDetail.name.indexOf(info.name) + 1) && (doctor.doctorDetail.department.indexOf(info.department)) + 1);
            } else {
                return ((doctor.userDetail.name.indexOf(info.name)+1) && (doctor.doctorDetail.department.indexOf(info.department)+1) &&
                    doctor.doctorDetail.location === info.location);
            }
        });
        this.props.editFilteredDoctors(newDoctorList);
    };

    handleReset = () => {
        this.props.editFilteredDoctors(this.props.doctors);
    };

    renderField = (field) => {
        return (
            <div className="input-group mb-3 form-group">
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon1">{field.label}</span>
                </div>
                <input type={field.input.type}  placeholder={field.input.label} name={field.input.name} {...field.input}
                       aria-describedby="basic-addon1" />
            </div>

        )
    };

    renderSelector = (field) => {
        return (
            <div className="input-group mb-3">
                <label>
                    {field.label}
                    <select className="custom-select custom-select-lg mb-3" name={field.input.name} {...field.input}>
                        <option value= "all" defaultValue>All</option>
                        <option value="Phoenix/Scottsdale,Arizona">Phoenix/Scottsdale,Arizona</option>
                        <option value="Jacksonville,Florida">Jacksonville,Florida</option>
                        <option value="Rochester,Minnesota">Rochester,Minnesota</option>
                    </select>
                </label>
            </div>
        )
    };


    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <section className="jumbotron text-center">
                        <div className="container">
                            <h1 className="jumbotron-heading">Narrow your search</h1>
                            <p className="lead text-muted">Our find a doctor tool assists you in choosing from our diverse pool of health specialists.
                            </p>

                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field
                                    name="name"
                                    label="Search Name:"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    name="department"
                                    label="Search Department:"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    name="location"
                                    label="Search Location:"
                                    type="text"
                                    component={this.renderSelector}
                                />
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="submit" className="btn btn-info">Search</button>
                                    <button type="button" className="btn btn-light" onClick={this.handleReset}>Reset</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
                <div className="col-8">
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <h3 className="text-center alert-primary">Doctors and Medical Staff</h3>
                            <ul className="list-group list-group-flush">
                                {this.props.filteredDoctors ? this.props.filteredDoctors.map((doctor) => {
                                    return (
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="list-item-search list-pad-bottom">
                                                        <h2 className="list-item-search lede">
                                                            {doctor.userDetail.name}
                                                        </h2>

                                                        <div className="list-item-search__right">
                                                            <Link className="list-item-search__image"  to={`/view-doctor/${doctor.id}`}>
                                                                <img className="list-item-search__image" alt=""
                                                                     src={doctor.doctorDetail.photo} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <h4 className="list-item-search__heading">Doctor ID:</h4>
                                                    <p className="list-item-search__list">{doctor.id}</p>
                                                    <h4 className="list-item-search__heading">LANGUAGE:</h4>
                                                    <p className="list-item-search__list">{doctor.doctorDetail.language}</p>
                                                    <Link className="btn btn-outline-success" to={`/requestAppointment/${doctor.id}`}>
                                                            Request an appointment
                                                    </Link>

                                                </div>
                                                <div className="col-4">
                                                    <Link className="list-item-search__call" to="/doctors">
                                                        {doctor.userDetail.phone}
                                                    </Link>
                                                    <div className="list-item-search__left">
                                                        <h4 className="list-item-search__heading">DEPARTMENT:</h4>
                                                        <ul className="list-item-search__list">
                                                            <li>{doctor.doctorDetail.department}</li>
                                                        </ul>
                                                        <h4 className="list-item-search__heading">TYPE OF DOCTOR:</h4>
                                                        <ul className="list-item-search__list">
                                                            <li>{doctor.doctorDetail.type}</li>
                                                        </ul>
                                                        <h4 className="list-item-search__heading">LOCATION::</h4>
                                                        <ul className="list-item-search__list">
                                                            <li>{doctor.doctorDetail.location}</li>
                                                        </ul>
                                                        <ul>
                                                            {doctor.doctorDetail.status === 'on' ? (
                                                                <Link className="btn btn-outline-warning" to={`/chatroom/${doctor.id}`}>
                                                                    Online now! Start a chat
                                                                </Link>
                                                            ) : null}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) : (<p>loading...</p>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({doctors, filteredDoctors}) {
    return {
        doctors,
        filteredDoctors,
        initialValues: {
            location:'all',
            department: '',
            name: ''
        }
    }
}

export default connect(mapStateToProps, {getDoctors, getFilteredDoctors, editFilteredDoctors})(
    reduxForm({
        form: 'FilterForm',
    })(DoctorsList)
);

