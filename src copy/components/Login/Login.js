import React, {Component} from 'react';
import {login} from '../../actions/auth.action';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import './Login.css';
import {Link} from "react-router-dom";



class Login extends Component {

    onSubmit = (user) => {
        console.log(user);
        this.props.login(user, (res) => {

            if(res.data.success) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                console.log(res.data.user);
                this.props.history.push('/');
            } else {
                alert(res.data.message);
            }

        });
    }


    renderField(field) {
        return (
            <div className="form-group">
                <label>
                    {field.label}
                    <input
                        type={field.type}
                        name={field.name}
                        className="form-control"
                        {...field.input}
                        required
                    />
                </label>
                <p className="text-danger">{field.meta.error}</p>
            </div>
        )
    }



    render() {
        return (
            <div id="login" className="login-form">
                <div className="text-center">
                    <form className="form-signin" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <img className="mb-4" src="//www.mayoclinic.org/UniversalNav/Styles/img/logo.png" alt="Mayo Clinic" width="72" height="72" />
                        <h1 className="h3 mb-3 font-weight-normal">Please Login Your Account</h1>
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
                        <Link to='/signup'>
                            <p>Create your account?</p>
                        </Link>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
                        <p className="mt-5 mb-3 text-muted">© 2018-2019</p>
                    </form>
                </div>
            </div>

        )
    }
}

function validate(data) {
    let errors = {};

    if(data.username === '') {
        errors.username = 'Username can\'t be empty';
    }

    if(data.password === '') {
        errors.password = 'Password can\'t be empty';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        initialValues: {
            username:'admin',
            password:'adminpass'
        }
    }
}

export default connect(mapStateToProps, {login})(
    reduxForm({
        form: 'LoginForm',
        validate
    })(Login)
);
