import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import Input from 'components/Input/index';
import NoteWord from '../../../Coms/NoteWord/index';
import { changeRoomPrice } from '../../actions';
import { hideValidateError } from '../../../actions';
import { validateRoomInfo } from '../../../Coms/ValidateData';

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
            error: {
                error: false,
                message: '',
                sub: {
                    price: {
                        error: false,
                        message: '',
                    },
                    deposit: {
                        error: false,
                        message: '',
                    },
                },
            },
        };
        this.autoBind('handleChange', 'handleBlur');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.values !== this.props.values) {
            this.setState({
                values: nextProps.values,
            });
        }
        if (nextProps.error.error !== this.props.error.error && nextProps.error.error) {
            this.setState({
                error: nextProps.error,
            });
        }
    }
    handleBlur({ name, value }) {
        // 错误校验
        const error = validateRoomInfo.priceInfo({
            ...this.state.values,
            [name]: value,
        }, { priceType: this.props.name });
        // 只修改对应表单数据error
        this.setState({
            error: {
                ...this.state.error,
                error: error.error,
                sub: {
                    ...this.state.error.sub,
                    [name]: {
                        ...error.sub[name],
                    },
                },
            },
        });
        // 非法string 置空
        if (error.sub[name].error) {
            this.props.dispatch(changeRoomPrice(this.props.roomId, {
                priceType: this.props.name,
                values: {
                    ...this.state.values,
                    [name]: '',
                },
            }));
            return;
        }

        switch (name) {
        case this.names[0]: {
            if (!this.state.expand) {
                const val = {
                    ...this.state.values,
                    [this.names[1]]: this.state.values[name],
                };
                this.setState({
                    expand: true,
                    values: val,
                    error: {
                        ...this.state.error,
                        sub: {
                            ...this.state.error.sub,
                            [this.names[1]]: {
                                error: false,
                            },
                        },
                    },
                });

                this.props.dispatch(changeRoomPrice(this.props.roomId, {
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
            error: {
                ...this.state.error,
                sub: {
                    ...this.state.error.sub,
                    [name]: {
                        error: false,
                    },
                },
            },
        });

        this.props.dispatch(changeRoomPrice(this.props.roomId, {
            priceType: this.props.name,
            values: val,
        }));
        this.props.dispatch(hideValidateError({ pageType: 'roomInfo' }));
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
                    error={this.props.name === 'season' ? this.state.error.sub[this.names[0]] : { error: false }}
                >
                    <Input
                        name={this.names[0]}
                        value={values[this.names[0]]}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                    <NoteWord>元／月</NoteWord>
                </FormItem>
                <FormItem
                    label="押金"
                    labelType="minor"
                    style={!this.state.expand ? { display: 'none' } : null}
                    error={this.props.name === 'season' ? this.state.error.sub[this.names[1]] : { error: false }}
                >
                    <Input
                        name={this.names[1]}
                        value={values[this.names[1]]}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
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
        const roomInfo = state.houseUpload.roomInfo;
        const roomIds = roomInfo.map(item => (item.roomId));

        let error = {
            error: false,
            sub: {
                price: {
                    error: false,
                    message: '',
                },
                deposit: {
                    error: false,
                    message: '',
                },
            },
        };
        const roomInfoError = state.houseUpload.validateError.roomInfo;
        if (roomInfoError &&
            roomInfoError.roomId === props.roomId &&
            roomInfoError.type === 'priceInfo' &&
            roomInfoError.sub[props.name]) {
            error = roomInfoError.sub[props.name];
        }

        const values = roomInfo[roomIds.indexOf(props.roomId)].priceInfo[props.name];
        return {
            error,
            values,
        };
    },
)(PriceInput), {
    roomId: PropTypes.number,
});
