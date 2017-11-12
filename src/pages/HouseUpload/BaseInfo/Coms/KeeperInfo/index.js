import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import Form, { FormItem } from 'components/Form/index';
import KeeperImage from '../KeeperImage/index';
import { setKeeperInfo } from '../../actions';
import { hideValidateError } from '../../../actions';
import { validateBaseInfo, itemError } from '../../../Coms/ValidateData';

class KeeperInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: false,
                message: '',
                sub: {
                    name: itemError({ type: 'name' }),
                    phone: itemError({ type: 'phone' }),
                    imgUrl: itemError({ type: 'imgUrl' }),
                },
            },
        };
        this.autoBind('handleChange', 'handleBlur');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error.error) {
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
        this.props.dispatch(setKeeperInfo({ name, value }));
        this.props.dispatch(hideValidateError({ pageType: 'baseInfo' }));

    }
    handleBlur({ name, value }) {
        const error = validateBaseInfo.keeperInfo({
            ...this.props.keeperInfo,
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
    }
    render() {
        debugger
        const clsPrefix = 'c-keeper-info';
        const {
            name,
            phone,
            imgUrl,
        } = this.props.keeperInfo;
        const { error } = this.state;
        console.log(error);
        return (
            <FormItem
                label="管家信息"
                className={clsPrefix}
                layout="top"
            >
                <Form layout="horizontal">
                    <FormItem
                        label="姓名"
                        labelType="minor"
                        error={error.sub.name}
                    >
                        <Input
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                    </FormItem>
                    <FormItem
                        label="电话"
                        labelType="minor"
                        error={error.sub.phone}
                    >
                        <Input
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                    </FormItem>
                </Form>
                <KeeperImage
                    name="imgUrl"
                    value={imgUrl}
                    error={error.sub.imgUrl}
                    onChange={this.handleChange}
                />
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
                name: itemError({ type: 'name' }),
                phone: itemError({ type: 'phone' }),
                imgUrl: itemError({ type: 'imgUrl' }),
            },
        };
        const baseInfoError = state.houseUpload.validateError.baseInfo;
        if (baseInfoError && baseInfoError.type === 'keeperInfo') {
            error = baseInfoError;
        }
        return {
            error,
            keeperInfo: state.houseUpload.baseInfo.keeperInfo,
        };
    },
)(KeeperInfo);
