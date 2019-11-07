import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default function (ComposedComponent) {

    class RequireAuth extends Component {

        state = {
            isAuthenticated: false
        }

        // Push to login route if not authenticated on mount
        componentWillMount() {
            if (Cookies.get('token')) {
                const jwtDecode = require('jwt-decode');
                const decoded = jwtDecode(Cookies.get('token'));
                if (decoded.exp > (new Date() / 1000)) {
                    this.setState({
                        isAuthenticated: true
                    })

                }
                else {
                    this.props.history.push("/account/login");
                }
            }
        }

        // Push to login route if not authenticated on update
        componentWillUpdate(nextProps) {
        }

        // Otherwise render the original component
        render() {
            { console.log(this.state) }
            return <ComposedComponent {...this.props} />
        }

    }

    return RequireAuth

}