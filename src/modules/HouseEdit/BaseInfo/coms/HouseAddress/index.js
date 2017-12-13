import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import { FormItem } from 'components/Form/index';
import { adjustNumStr } from 'utils';
import NoteWord from '../../../coms/NoteWord/index';
import { setHouseAddress } from '../../actions';
import { validateBaseInfo, itemError } from '../../../coms/ValidateData';
import { hideValidateError } from '../../../actions';

class HouseAddress extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: false,
                message: '',
                sub: {
                    buildNo: itemError({ type: 'buildNo' }),
                    houseNo: itemError({ type: 'houseNo' }),
                },
            },
        };
        this.autoBind('handleChange', 'handleBlur');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error.error !== this.props.error.error && nextProps.error.error) {
            this.setState({
                error: {
                    ...nextProps.error,
                },
            });
        }
    }
    handleChange({ name, value }) {
        this.setState({
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
        this.props.dispatch(setHouseAddress({
            name,
            value,
        }));
        this.props.dispatch(hideValidateError({ pageType: 'baseInfo' }));
    }
    handleBlur({ name, value }) {
        const error = validateBaseInfo.houseAddress({
            ...this.props.houseAddress,
            [name]: value,
        });
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
            this.props.dispatch(setHouseAddress({ name, value: '' }));
        } else {
            // 调整数字
            this.props.dispatch(setHouseAddress({ name, value: adjustNumStr(value) }));
        }
    }
    render() {
        const clsPrefix = 'c-house-address';
        const { buildNo, unitNo, houseNo } = this.props.houseAddress;
        const { error } = this.state;
        return (
            <FormItem
                label="房源地址"
                className={clsPrefix}
            >
                <div>
                    <Input
                        name="buildNo"
                        value={buildNo}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={error.sub.buildNo.error}

                    />
                    <NoteWord>栋</NoteWord>
                    <Input
                        name="unitNo"
                        value={unitNo}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                    <NoteWord>单元</NoteWord>
                    <Input
                        name="houseNo"
                        value={houseNo}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={error.sub.houseNo.error}
                    />
                    <NoteWord>号</NoteWord>
                </div>
            </FormItem>
        );
    }
}

export default connect(
    (state) => {
        let error = {
            error: false,
            message: '',
            sub: {
                buildNo: itemError({ type: 'buildNo' }),
                houseNo: itemError({ type: 'houseNo' }),
            },
        };
        const baseInfoError = state.houseUpload.validateError.baseInfo;
        if (baseInfoError && baseInfoError.type === 'houseAddress') {
            error = baseInfoError;
        }
        return {
            error,
            houseAddress: state.houseUpload.baseInfo.houseAddress,
        };
    },
)(HouseAddress);
