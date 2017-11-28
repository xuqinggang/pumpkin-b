import React from 'react';
import BaseComponent from 'components/BaseComponent/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { passportStatus } from 'modules/Passport/actions';
import { renderRoutes } from 'react-router-config';

import './less/global.less';

class App extends BaseComponent {
    componentDidMount() {
        let onLine = () => {};
        if (window.location.pathname === '/login') {
            onLine = () => {
                this.props.history.push({
                    pathname: '/house-manage',
                });
            };
        }
        this.props.dispatch(passportStatus({
            onLine,
            offLine: () => {
                this.props.history.push({
                    pathname: '/login',
                });
            },
        }));
    }
    render() {
        return (
            <div>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}

App.defaultProps = {
    route: {},
};
App.propTypes = {
    route: PropTypes.shape({
        routes: PropTypes.array,
    }),
};

export default withRouter(connect()(App));
