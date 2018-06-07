/* @flow */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
    
};

class Auth extends Component<Props> {
    componentWillMount() {
        localStorage.setItem('token', this.props.match.params.token);
        localStorage.setItem('refresh', this.props.match.params.refresh);
    }

    render() {
        return <Redirect to="/home" />;
    }
}

export default Auth;
