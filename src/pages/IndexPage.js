// import PropTypes from 'prop-types';
import { Component } from 'react';
import { Redirect } from 'react-router';

class IndexPage extends Component {
    render() {
        return (
            <Redirect to="/house-manage" />
        );
    }
}

export default IndexPage;
