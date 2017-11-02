import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import RadioGroup from 'components/Radio/index';
import SearchSelect from 'components/SearchSelect/index';
import Select from 'components/Select/index';
import Input from 'components/Input/index';
import UploadButton from '../Coms/UploadButton/index';
import UploadHeader from '../Coms/UploadHeader/index';
import NoteWord from '../Coms/NoteWord/index';
import KeeperImage from '../Coms/KeeperImage/index';
import './style.less';

class HouseUpload extends BaseComponent {
    render() {
        const clsPrefix = 'c-house-upload';
        const clsItem = `${clsPrefix}--item`;
        const clsSubItem = `${clsPrefix}--sub-item`;
        const clsInput = `${clsPrefix}--input`;
        const clsSelect = `${clsPrefix}--select`;

        return (
            <div className={clsPrefix}>
                <UploadHeader>基本信息</UploadHeader>
                <Form>
                    <FormItem
                        label="选择小区"
                        className={clsItem}
                        error={{ isError: true, message: '小区名称不得为空   or   系统暂无该小区，请仔细核对名称或联系客服' }}
                    >
                        <SearchSelect
                            className={clsInput}
                            options={[
                                {
                                    value: 101,
                                    text: '双榆树',
                                },
                                {
                                    value: 102,
                                    text: '双榆树小',
                                },
                                {
                                    value: 103,
                                    text: '双榆树小区',
                                },
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        label="房源地址"
                        className={clsItem}
                    >
                        <div>
                            <Input className={clsInput} />
                            <NoteWord>栋</NoteWord>
                            <Input className={clsInput} />
                            <NoteWord>单元</NoteWord>
                            <Input className={clsInput} />
                            <NoteWord>号</NoteWord>
                        </div>
                    </FormItem>
                    <FormItem
                        label="房源楼层"
                        className={clsItem}
                    >
                        <div>
                            <NoteWord first>第</NoteWord>
                            <Input className={clsInput} />
                            <NoteWord>层／共</NoteWord>
                            <Input className={clsInput} />
                            <NoteWord>层</NoteWord>
                        </div>
                    </FormItem>
                    <FormItem
                        label="房源户型"
                        className={clsItem}
                    >
                        <div>
                            <Select
                                className={`${clsInput} ${clsSelect}`}
                                options={[{
                                    value: 0,
                                    text: '0室',
                                }, {
                                    value: 1,
                                    text: '1室',
                                }, {
                                    value: 2,
                                    text: '2室',
                                }]}
                            />
                            <Select
                                className={`${clsInput} ${clsSelect}`}
                                options={[{
                                    value: 0,
                                    text: '0厅',
                                }, {
                                    value: 1,
                                    text: '1厅',
                                }, {
                                    value: 2,
                                    text: '2厅',
                                }]}
                            />
                            <Select
                                className={`${clsInput} ${clsSelect}`}
                                options={[{
                                    value: 0,
                                    text: '0卫',
                                }, {
                                    value: 1,
                                    text: '1卫',
                                }, {
                                    value: 2,
                                    text: '2卫',
                                }]}
                            />
                        </div>
                    </FormItem>
                    <FormItem
                        label="出租方式"
                        className={clsItem}
                    >
                        <RadioGroup
                            layout="horizontal"
                            options={[
                                {
                                    value: 0,
                                    text: '整租',
                                },
                                {
                                    value: 1,
                                    text: '合租',
                                },
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        label="管家信息"
                        className={`${clsItem} ${clsPrefix}--keeper-info`}
                        layout="top"
                    >
                        <div>
                            <FormItem
                                label="姓名"
                                labelType="minor"
                                className={clsSubItem}
                            >
                                <Input className={clsInput} />
                            </FormItem>
                            <FormItem
                                label="电话"
                                labelType="minor"
                                className={clsSubItem}
                            >
                                <Input className={clsInput} />
                            </FormItem>
                        </div>
                        <KeeperImage />
                    </FormItem>
                    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                        <UploadButton>下一步</UploadButton>
                    </div>
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
