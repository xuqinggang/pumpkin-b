import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import Form, { FormItem } from 'components/Form/index';
import NoteWord from '../../../coms/NoteWord/index';
import { setHouseAddress } from '../../actions';
import { validateBaseInfo, itemError } from '../../../coms/ValidateData';
import { hideValidateError } from '../../../actions';
import './style.less';

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
        this.maxInputLimit = 10;
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
                    <Form layout="horizontal">
                        <FormItem
                            labelType="minor"
                            error={error.sub.buildNo}
                        >
                            <Input
                                name="buildNo"
                                value={buildNo}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                error={error.sub.buildNo.error}
                                maxLengthLimit={this.maxInputLimit}
                            />
                            <NoteWord className={`${clsPrefix}--word`}>栋</NoteWord>
                        </FormItem>
                        <FormItem
                            labelType="minor"
                            error={error.sub.unitNo}
                        >
                            <Input
                                name="unitNo"
                                value={unitNo}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                maxLengthLimit={this.maxInputLimit}
                            />
                            <NoteWord className={`${clsPrefix}--word`}>单元</NoteWord>
                        </FormItem>
                        <FormItem
                            labelType="minor"
                            error={error.sub.houseNo}
                        >
                            <Input
                                name="houseNo"
                                value={houseNo}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                error={error.sub.houseNo.error}
                                maxLengthLimit={this.maxInputLimit}
                            />
                            <NoteWord className={`${clsPrefix}--word`}>号</NoteWord>
                        </FormItem>
                    </Form>
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
