import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import AlertDialog from 'components/AlertDialog/index';
import { hideAlert } from './actions';

class Message extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }
    handleClick() {
        this.props.dispatch(hideAlert());
        if (this.props.alert.onClick) {
            this.props.alert.onClick();
        }
    }
    render() {
        const alert = this.props.alert;
        return (
            <AlertDialog
                hide={alert.hide}
                onConfirm={this.handleClick}
            >
                {this.props.alert.text}
            </AlertDialog>
        );
    }
}

export default connect(
    state => ({
        alert: state.alert,
    }),
)(Message);
