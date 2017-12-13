import React from 'react';
import axios from 'axios';
import BaseComponent from 'components/BaseComponent/index';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import './less/global.less';

axios.defaults.baseURL = '/api/';

class App extends BaseComponent {
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

export default App;
