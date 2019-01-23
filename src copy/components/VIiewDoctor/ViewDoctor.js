import React, {Component} from 'react';
import {getDoctors} from "../../actions/doctors.action";
import {connect} from "react-redux";
import {getFilteredDoctors} from "../../actions/filteredDoctors.action";
import StarRatingComponent from 'react-star-rating-component';
import './ViewDoctor.css'
import {Link} from "react-router-dom";
import {addComment, getComments} from "../../actions/comment.action";

class ViewDoctor extends Component {

    componentDidMount() {
        if(!this.props.doctors) {
            this.props.getDoctors();
        }
        if(!this.props.filteredDoctors) {
            this.props.getFilteredDoctors();
        }

        this.props.getComments(this.props.id);
    }

    constructor(props) {
        super(props);

        this.state = {
            rating: 5,
            comment: '',
        };
    }

    onStarClick(nextValue) {
        this.setState({rating: nextValue});
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({
            comment: value
        });
    };

    handleSubmit = () => {
        const comment = {
            patient_name: JSON.parse(localStorage.getItem('user')).userDetail.name,
            point: this.state.rating,
            content: this.state.comment,
            doctor_id: this.props.id,
        };
        this.props.addComment(comment, this.props.id, (res) => {
            if (res.data && res.data.success) {
                this.props.getDoctors();
                alert('Submit Your Comment Successfully!');
            } else {
                alert(res.message);
            }
        });
        console.log(this.props.comments);
    };


    render() {
        if (this.props.doctor) {
            return (
                <div>
                    <h1>{this.props.doctor.userDetail.name}</h1>
                    <div className="row">
                        <div className="col">
                            <img alt="" src={this.props.doctor.doctorDetail.photo}
                                 className="header--bio__photo" />
                            <div className="doctor_rate">
                                <h5>Doctor Rate</h5>
                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    starCount={5}
                                    value={this.props.doctor.doctorDetail.rate}
                                />
                                <p>{this.props.doctor.doctorDetail.rate} out of 5</p>
                                <p>{this.props.doctor.doctorDetail.reviews_number} comments</p>
                            </div>
                        </div>
                        <div className="col">
                            <h4 className="list-item-search__heading">DEPARTMENT:</h4>
                            <ul className="list-item-search__list">
                                <li>{this.props.doctor.doctorDetail.department}</li>
                            </ul>
                            <h4 className="list-item-search__heading">PRIMARY LOCATION:</h4>
                            <ul className="list-item-search__list">
                                <li>{this.props.doctor.doctorDetail.location}</li>
                            </ul>
                            <h4 className="list-item-search__heading">TYPR OF DOCTOR:</h4>
                            <ul className="list-item-search__list">
                                <li>{this.props.doctor.doctorDetail.type}</li>
                            </ul>
                            <h4 className="list-item-search__heading">Language:</h4>
                            <ul className="list-item-search__list">
                                <li>{this.props.doctor.doctorDetail.language}</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h4>Call: </h4>
                            <h5 className="phone_h5">{this.props.doctor.userDetail.phone}</h5>
                            <Link to={`/requestAppointment/${this.props.doctor.id}`}>
                                <button type="button" className="btn btn-outline-success">Request an appointment</button>
                            </Link>
                        </div>
                    </div>

                    {localStorage.getItem('user') ? (<div>
                        <div className="row">
                            <div className="col">
                                <h5>How many points you want to give?</h5>
                            </div>
                            <div className="col">
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={this.state.rating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                                <p>
                                    <span className="badge badge-warning">{this.state.rating} Points</span>
                                </p>
                            </div>
                            <div className="col">
                            </div>


                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Your comment</span>
                            </div>
                            <textarea className="form-control" aria-label="With textarea" onChange={this.handleInputChange} />
                        </div>
                        <div className="button-div">
                            <button type="button" className="btn btn-secondary comment" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>) : (null)}

                    <div className="doctor_space"/>
                    <div>
                        <h2>Others Comments</h2>
                        <ul className="list-group">
                            {this.props.comments.map((comment) => {
                                return (
                                    <li className="list-group-item">
                                        <h5>{comment.patient_name}</h5>
                                        <p>{comment.content}</p>
                                        <StarRatingComponent
                                            name="rate2"
                                            editing={false}
                                            starCount={5}
                                            value={comment.point}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <p>loading...</p>
            )
        }

    }
}

function mapStateToProps({doctors, comments},componentProps) {
    const id = +componentProps.match.params.id;
    const doctor = doctors ? doctors.find(d => {
        return d.id === id;
    }): null;

    return {
        doctor,
        comments,
        id

    }
}

export default connect(mapStateToProps, {getDoctors, getFilteredDoctors, getComments, addComment})(ViewDoctor)