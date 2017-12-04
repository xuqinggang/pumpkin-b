import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import BaseComponent from 'components/BaseComponent/index';
import { passportStatus } from 'modules/Passport/actions';

export default function checkAuthenticated(PageComponent) {
    class AuthenticatedRoute extends BaseComponent {
        componentDidMount() {
            this.props.dispatch(passportStatus());
        }
        render() {
            const { location } = this.props;
            if (this.props.onlineStatus === 'ON' && location.pathname === '/login') {
                return <Redirect to="/house-manage" />;
            }
            if (this.props.onlineStatus === 'OFF' && location.pathname !== '/login') {
                return <Redirect to="/login" />;
            }
            if (this.props.onlineStatus === 'UNSET') {
                return null;
            }
            return <PageComponent {...this.props} />;
        }
    }
    return connect(
        state => ({
            onlineStatus: state.passport.onlineStatus,
        }),
    )(withRouter(AuthenticatedRoute));
}
