import React from 'react';

function PatientView(props) {
    const patient = props.patient;
    return (
        <div>
            {patient ? (<span>{patient.userDetail.name}</span>) : null}
        </div>
    );
}
export default PatientView;