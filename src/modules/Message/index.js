import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import SnackBar from 'components/SnackBar/index';
import { hideMessage } from './actions';

class Message extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleTimeout');
    }
    handleTimeout() {
        this.props.dispatch(hideMessage());
    }
    render() {
        return (
            <SnackBar
                hide={this.props.hide}
                onTimeout={this.handleTimeout}
            >
                {this.props.text}
            </SnackBar>
        );
    }
}

export default connect(
    state => ({
        hide: state.message.hide,
        text: state.message.text,
    }),
)(Message);
