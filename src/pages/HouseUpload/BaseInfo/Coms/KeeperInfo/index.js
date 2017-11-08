import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import Form, { FormItem } from 'components/Form/index';
import KeeperImage from '../KeeperImage/index';
import { setKeeperInfo } from '../../actions';

class KeeperInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleChange');
    }
    handleChange({ name, value }) {
        this.props.dispatch(setKeeperInfo({ name, value }));
    }
    render() {
        const clsPrefix = 'c-keeper-info';
        const {
            name,
            phone,
        } = this.props.keeperInfo;
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
                    >
                        <Input
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                        />
                    </FormItem>
                    <FormItem
                        label="电话"
                        labelType="minor"
                    >
                        <Input
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                        />
                    </FormItem>
                </Form>
                <KeeperImage />
            </FormItem>
        );
    }
}

export default connect(
    state => ({
        keeperInfo: state.houseUpload.baseInfo.keeperInfo,
    }),
)(KeeperInfo);
