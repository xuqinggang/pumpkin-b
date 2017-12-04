import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { withRouter } from 'react-router';
import { passportStatus } from 'modules/Passport/actions';

export default function checkAuthenticated(PageComponent) {
    class AuthenticatedRoute extends BaseComponent {
        componentDidMount() {
            let onLine = () => {};
            if (window.location.pathname === '/login') {
                onLine = () => {
                    this.props.history.replace({
                        pathname: '/house-manage',
                    });
                };
            }
            this.props.dispatch(passportStatus({
                onLine,
                offLine: () => {
                    this.props.history.replace({
                        pathname: '/login',
                    });
                },
            }));
        }
        render() {
            return (
                <PageComponent {...this.props} />
            );
        }
    }
    return connect()(withRouter(AuthenticatedRoute));
}
