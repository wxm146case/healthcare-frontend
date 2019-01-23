import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../actions/auth.action";
import './SignUp.css'
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

class SignUp extends Component {

    onSubmit = (user) => {
        const UserInfo = {
            username: user.username,
            password: user.password,
            userDetail:  {
                name: user.first_name + ' ' + user.last_name,
                phone: user.phone,
                email: user.email,
                address1: user.address1,
                address2: user.address2,
                city: user.city,
                state: user.state,
                zip: user.zip,
            }
        };

        axios.post(`${API_URL}/users`, UserInfo)
            .then((res) => {
                console.log(res);
                if(res.data.success) {
                    alert('register successfully!');
                    this.props.history.push('/login');
                } else {
                    alert(res.data.message);
                }
            })
    };

    renderField(field) {
        return (
            <div className="form-group">
                <label>
                    {field.label}
                    <input
                        type={field.type}
                        name={field.input.name}
                        className="form-control"
                        {...field.input}
                        required
                    />
                </label>
                <p className="text-danger">{field.meta.error}</p>
            </div>
        )
    }

    renderOptionalField(field) {
        return (
            <div className="form-group">
                <label>
                    {field.label}
                    <input
                        type={field.type}
                        name={field.name}
                        className="form-control"
                        {...field.input}
                    />
                </label>
                <p className="text-danger">{field.meta.error}</p>
            </div>
        )
    }


    render() {
        return (
            <div>
                <div id="mayo-wrapper-plain">
                    <img border="0" src="//www.mayoclinic.org/UniversalNav/Styles/img/logo.png" alt="Mayo Clinic"/>
                </div>
                <div id="idm_main">
                    <h1>Create your account</h1>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field
                            name="username"
                            label="Username:"
                            type="text"
                            component={this.renderField}
                        />
                        <Field
                            name="password"
                            label="Password:"
                            type="password"
                            component={this.renderField}
                        />
                        <Field
                            name="confirmed_password"
                            label="Confirm Password:"
                            type="password"
                            component={this.renderField}
                        />
                        <h3>Enter patient information</h3>
                        <Field
                            name="first_name"
                            label="Legal First Name:"
                            type="text"
                            component={this.renderField}
                        />
                        <Field
                            name="last_name"
                            label="Legal Last Name:"
                            type="text"
                            component={this.renderField}
                        />
                        <div>
                            <Field
                                name="email"
                                label="Email Address:"
                                type="text"
                                component={this.renderField}
                            />
                            <div className="item_sub_text">
                                Please supply a valid email address (for example, johndoe@isp.com).
                                We send a confirmation email to this address. You can change your contact email at any time.
                            </div>
                        </div>
                        <Field
                            name="phone"
                            label="Phone:"
                            type="number"
                            component={this.renderField}
                        />
                        <Field
                            name="address1"
                            label="Address1:"
                            type="text"
                            component={this.renderField}
                        />
                        <Field
                            name="address2"
                            label="Address2(optional):"
                            type="text"
                            component={this.renderOptionalField}
                        />
                        <Field
                            name="state"
                            label="State:"
                            type="text"
                            component={this.renderField}
                        />
                        <Field
                            name="city"
                            label="City:"
                            type="text"
                            component={this.renderField}
                        />
                        <Field
                            name="zip"
                            label="Zipcode:"
                            type="text"
                            component={this.renderField}
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

function validate(data) {
    let errors = {};


    if(data.confirmed_password !== data.password) {
        errors.confirmed_password = 'Password and Confirm Password don\'t match';
    }

    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(data.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        initialValues: {
            email:'x@gmail.com'
        }
    }
}

export default connect(mapStateToProps, {login})(
    reduxForm({
        form: 'SignUpForm',
        validate
    })(SignUp)
);