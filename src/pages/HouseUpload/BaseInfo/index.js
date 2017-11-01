import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import { Radio } from 'components/Radio/index';
import SearchSelect from 'components/SearchSelect/index';
import Input from 'components/Input/index';
import UploadHeader from '../Coms/UploadHeader/index';
import './style.less';

class HouseUpload extends BaseComponent {
    render() {
        const clsPrefix = 'c-house-upload';
        const clsInput = `${clsPrefix}--input`;

        return (
            <div className={clsPrefix}>
                <UploadHeader>基本信息</UploadHeader>
                <Form>
                    <FormItem
                        label="选择小区"
                        error={{ isError: true, message: '小区名称不得为空   or   系统暂无该小区，请仔细核对名称或联系客服' }}
                    >
                        <SearchSelect className={clsInput} />
                    </FormItem>
                    <FormItem
                        label="房源地址"
                    >
                        <div>
                            <Input className={clsInput} />
                            <span>栋</span>
                            <Input className={clsInput} />
                            <span>单元</span>
                            <Input className={clsInput} />
                            <span>号</span>
                        </div>
                    </FormItem>
                    <FormItem
                        label="房源楼层"
                    >
                        <div>
                            <span>第</span>
                            <Input className={clsInput} />
                            <span>层／共</span>
                            <Input className={clsInput} />
                            <span>层</span>
                        </div>
                    </FormItem>
                    <FormItem
                        label="出租方式"
                    >
                        <div>
                            <Radio>整租</Radio>
                            <Radio>合租</Radio>
                        </div>
                    </FormItem>
                    <FormItem
                        label="管家信息"
                    >
                        <div>
                            <FormItem
                                label="姓名"
                            >
                                <Input className={clsInput} />
                            </FormItem>
                            <FormItem
                                label="电话"
                            >
                                <Input className={clsInput} />
                            </FormItem>
                        </div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

HouseUpload.propTypes = {
    children: PropTypes.node,
};

HouseUpload.defaultProps = {
    children: null,
};

export default HouseUpload;
