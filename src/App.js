import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import './less/global.less';

function App(props) {
    return (
        <div>
            {renderRoutes(props.route.routes)}
        </div>
    );
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
