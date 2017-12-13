import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import Input from 'components/Input/index';
import Checkbox from 'components/Checkbox/index';
import { adjustNumStr } from 'utils';
import NoteWord from '../../../coms/NoteWord/index';
import { changeRoomPrice } from '../../actions';
import { hideValidateError } from '../../../actions';
import { validateSubItemPrice, validateItemPrice } from '../../../coms/ValidateData';
import './style.less';

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

        this.resetError = () => ({
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
        });
        this.state = {
            values,
            error: this.resetError(),
        };

        this.defaultDepositValue = '0';
        this.autoBind('handleChange', 'handleBlur', 'handleCheckChange');
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
        const error = validateSubItemPrice(value, name);
        // 只修改对应表单数据error
        // 只显示checked表单的错误信息
        this.setState({
            error: this.state.values.checked
                ? {
                    ...this.state.error,
                    ...(error.error ? { error: true } : {}),
                    sub: {
                        ...this.state.error.sub,
                        [name]: {
                            ...error,
                        },
                    },
                }
                : this.resetError(),
        });

        let newValue = value;
        // 非法string 置空，押金置0
        if (error.error) {
            newValue = name === 'deposit' ? this.defaultDepositValue : '';
        } else {
            newValue = adjustNumStr(value);
        }
        this.props.dispatch(changeRoomPrice(this.props.roomId, {
            priceType: this.props.name,
            values: {
                ...this.state.values,
                [name]: newValue,
            },
        }));
    }
    handleCheckChange({ name, checked }) {
        const val = {
            ...this.state.values,
            ...(checked ? { deposit: this.defaultDepositValue } : {}),
            checked,
        };
        this.props.dispatch(changeRoomPrice(this.props.roomId, {
            priceType: name,
            values: val,
        }));

        // 改变状态
        this.setState({
            values: val,
            error: (
                checked
                ? validateItemPrice(val, this.props.name)
                : this.resetError()
            ),
        });
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
        const clsPrefix = 'c-price-input';

        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__disabled`]: !this.state.checked,
        });
        return (
            <Form
                layout="horizontal"
                className={cls}
            >
                <Checkbox
                    name={this.props.name}
                    className={`${clsPrefix}--checkbox`}
                    onChange={this.handleCheckChange}
                    checked={this.state.values.checked}
                    disabled={this.props.name === 'season'}
                >{this.props.label}</Checkbox>
                <FormItem
                    label="租金"
                    labelType="minor"
                    disabled={!this.props.values.checked}
                    error={this.state.error.sub[this.names[0]]}
                >
                    <Input
                        name={this.names[0]}
                        value={values[this.names[0]]}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={this.state.error.sub[this.names[0]].error}
                        disabled={!this.props.values.checked}
                    />
                    <NoteWord>元／月</NoteWord>
                </FormItem>
                <FormItem
                    label="押金"
                    labelType="minor"
                    disabled={!this.props.values.checked}
                >
                    <Input
                        name={this.names[1]}
                        value={values[this.names[1]]}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        disabled={!this.props.values.checked}
                    />
                    <NoteWord>元</NoteWord>
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
