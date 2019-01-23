import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function(ExistingComponent) {

    class WrapperHOCComponent extends Component{

        constructor(props) {
            super(props);
            this.state = {};
        }

        static getDerivedStateFromProps(props, state) {
            if (props.loggedIn.profiles[0].type === 'ROLE_DOCTOR') {
                return state;
            } else {
                alert('you are not a doctor')
                props.history.push('/login');
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