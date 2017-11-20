import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import { FormItem } from 'components/Form/index';
import NoteWord from '../../../coms/NoteWord/index';
import { setHouseFloor } from '../../actions';
import { hideValidateError } from '../../../actions';
import { validateBaseInfo, itemError } from '../../../coms/ValidateData';

class HouseFloor extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: false,
                message: '',
                sub: {
                    curFloor: itemError({ type: 'curFloor' }),
                    totalFloor: itemError({ type: 'totalFloor' }),
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
        this.props.dispatch(setHouseFloor({ name, value }));
        this.props.dispatch(hideValidateError({ pageType: 'baseInfo' }));
    }
    handleBlur({ name, value }) {
        const error = validateBaseInfo.houseFloor({
            ...this.props.houseFloor,
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
            this.props.dispatch(setHouseFloor({ name, value: '' }));
        }
    }
    render() {
        const clsPrefix = 'c-house-floor';
        const { curFloor, totalFloor } = this.props.houseFloor;
        const { error } = this.state;
        return (
            <FormItem
                label="房源楼层"
                className={clsPrefix}
            >
                <div>
                    <NoteWord first>第</NoteWord>
                    <Input
                        name="curFloor"
                        value={curFloor}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={error.sub.curFloor.error}
                    />
                    <NoteWord>层／共</NoteWord>
                    <Input
                        name="totalFloor"
                        value={totalFloor}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={error.sub.totalFloor.error}
                    />
                    <NoteWord>层</NoteWord>
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
                curFloor: itemError({ type: 'curFloor' }),
                totalFloor: itemError({ type: 'totalFloor' }),
            },
        };
        const baseInfoError = state.houseUpload.validateError.baseInfo;
        if (baseInfoError && baseInfoError.type === 'houseFloor') {
            error = baseInfoError;
        }
        return {
            error,
            houseFloor: state.houseUpload.baseInfo.houseFloor,
        };
    },
)(HouseFloor);
