import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function(ExistingComponent) {

    class WrapperHOCComponent extends Component{

        constructor(props) {
            super(props);
            this.state = {};
        }

        static getDerivedStateFromProps(props, state) {
            if (localStorage.getItem('user')) {
                return state;
            } else {
                props.history.push('/login'); // redirect user to login page.
                return state;
            }
        }

        render() {
            return (
                <ExistingComponent {...this.props} />
            );
        }
    }

    function mapStateToProps({loggedIn}) {
        return {loggedIn};
    }

    return connect(mapStateToProps)(WrapperHOCComponent);
}