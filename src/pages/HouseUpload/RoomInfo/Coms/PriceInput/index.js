import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import Input from 'components/Input/index';
import NoteWord from '../../../Coms/NoteWord/index';
import { changeRoomPrice } from '../../actions';

const defaultValues = (names) => {
    const values = {};
    names.forEach((item) => {
        values[item] = '';
    });
    return values;
};

class PriceInput extends BaseComponent {
    constructor(props) {
        super(props);
        this.names = ['price', 'deposit'];
        const values = props.values || defaultValues(this.names);
        this.state = {
            values,
            expand: false,
        };
        this.autoBind('handleChange', 'handleBlur');
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            values: nextProps.values,
        });
    }
    handleBlur({ name }) {
        switch (name) {
        case this.names[0]: {
            if (this.state.values[name] && !this.state.expand) {
                const val = {
                    ...this.state.values,
                    [this.names[1]]: this.state.values[name],
                };
                this.setState({
                    expand: true,
                    values: val,
                });

                this.props.dispatch(changeRoomPrice(this.props.index, {
                    priceType: this.props.name,
                    values: val,
                }));
            }
            break;
        }
        default:
        }
    }
    handleChange({ name, value }) {
        const val = {
            ...this.state.values,
            [name]: value,
        };
        this.setState({
            values: val,
        });
        this.props.dispatch(changeRoomPrice(this.props.index, {
            priceType: this.props.name,
            values: val,
        }));
    }
    render() {
        const { values } = this.state;
        return (
            <Form
                layout="horizontal"
            >
                <FormItem
                    label={this.props.label}
                    labelType="minor"
                >
                    <Input
                        name={this.names[0]}
                        value={values[this.names[0]]}
                        type="number"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                    <NoteWord>元／月</NoteWord>
                </FormItem>
                <FormItem
                    label="押金"
                    labelType="minor"
                    style={!this.state.expand ? { display: 'none' } : null}
                >
                    <Input
                        name={this.names[1]}
                        value={values[this.names[1]]}
                        type="number"
                        onChange={this.handleChange}
                    />
                    <NoteWord>元／月</NoteWord>
                </FormItem>
            </Form>
        );
    }
}

PriceInput.defaultProps = {
    name: '',
    label: '',
};

PriceInput.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
};

export default ConnectContextToProps(connect(
    (state, props) => {
        const values = state.houseUpload.roomInfo[props.index].priceInfo[props.name];
        return {
            values,
        };
    },
)(PriceInput), {
    index: PropTypes.number,
});
