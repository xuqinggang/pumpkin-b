import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import Form, { FormItem } from 'components/Form/index';
import KeeperImage from '../KeeperImage/index';

class KeeperInfo extends BaseComponent {
    render() {
        const clsPrefix = 'c-keeper-info';
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
                        <Input />
                    </FormItem>
                    <FormItem
                        label="电话"
                        labelType="minor"
                    >
                        <Input />
                    </FormItem>
                </Form>
                <KeeperImage error />
            </FormItem>
        );
    }
}

export default connect(
    state => ({
        search: state.houseUpload.baseInfo.village,
    }),
)(KeeperInfo);
