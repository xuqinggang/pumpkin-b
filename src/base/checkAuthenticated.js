import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import BaseComponent from 'components/BaseComponent/index';
import { passportStatus } from 'modules/Passport/actions';

export default function checkAuthenticated(PageComponent) {
    class AuthenticatedRoute extends BaseComponent {
        componentDidMount() {
            this.props.dispatch(passportStatus());
        }
        render() {
            return (
                this.props.isOnline
                ? <PageComponent {...this.props} />
                : <Redirect to="/login" />
            );
        }
    }
    return connect(
        state => ({
            isOnline: state.passport.isOnline,
        }),
    )(AuthenticatedRoute);
}
