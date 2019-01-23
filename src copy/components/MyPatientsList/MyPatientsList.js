import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDoctors} from "../../actions/doctors.action";
import PatientView from "./PatientView/PatientView";


class MyPatientsList extends Component {

    componentDidMount() {
        this.props.getDoctors();
    }

    render() {
        console.log(this.props.doctors);
        console.log(this.props.doctor);
        return (
            <div>
                <h3>Your Patient List</h3>
                <ul className="list-group">
                    {this.props.doctor && this.props.doctor.doctorDetail.patients.map((patient) => {
                        return (
                            <PatientView patient={patient} />
                        )
                    })}
                </ul>
            </div>
        )
    }
}


function mapStateToProps({doctors}, componentProps) {
    const doctor = doctors && doctors.length > 0 ?  doctors.find(d => {
        return d.id === +componentProps.match.params.id;
    }): null;
    return {
        doctors,
        doctor
    }
}

export default connect(mapStateToProps, {getDoctors})(MyPatientsList);
