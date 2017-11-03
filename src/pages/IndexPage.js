// import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import fetchTestData from '../actions';
import MainLayout from '../layouts/MainLayout';

class IndexPage extends Component {
    static fetchData(store) {
        return store.dispatch(fetchTestData());
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (!window.__INITIAL_STATE__) {
            dispatch(fetchTestData());
        }
    }

    render() {
        return (
            <MainLayout>
                <div className="">
                    index
                </div>
            </MainLayout>
        );
    }
}

IndexPage.defaultProps = {};

IndexPage.propTypes = {};

export default connect()(IndexPage);
