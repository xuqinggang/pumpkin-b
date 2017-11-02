import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import Select from 'components/Select/index';
import Input from 'components/Input/index';
import Textarea from 'components/Textarea/index';
import Tag, { TagAdd, TagPlaceholder } from 'components/Tag/index';
import UploadButton from '../Coms/UploadButton/index';
import UploadHeader from '../Coms/UploadHeader/index';
import NoteWord from '../Coms/NoteWord/index';
import KeeperImage from '../Coms/KeeperImage/index';
import './style.less';

class HouseUpload extends BaseComponent {
    render() {
        const clsPrefix = 'c-house-info';
        const clsItem = `${clsPrefix}--item`;
        const clsSubItem = `${clsPrefix}--sub-item`;
        const clsInput = `${clsPrefix}--input`;
        const clsSelect = `${clsPrefix}--select`;

        return (
            <div className={clsPrefix}>
                <UploadHeader>房间信息</UploadHeader>
                <Form>
                    <FormItem
                        label="房间面积"
                        className={clsItem}
                    >
                        <Input
                            className={clsInput}
                        />
                        <NoteWord>平米</NoteWord>
                    </FormItem>
                    <FormItem
                        label="房源朝向"
                        className={clsItem}
                    >
                        <Select
                            className={`${clsInput} ${clsSelect}`}
                            value={2}
                            options={[{
                                value: 0,
                                text: '朝东',
                            }, {
                                value: 1,
                                text: '朝南',
                            }, {
                                value: 2,
                                text: '朝西',
                            }, {
                                value: 3,
                                text: '朝北',
                            }, {
                                value: 4,
                                text: '朝东北',
                            }, {
                                value: 5,
                                text: '朝东南',
                            }, {
                                value: 6,
                                text: '朝西北',
                            }, {
                                value: 7,
                                text: '朝西南',
                            }, {
                                value: 8,
                                text: '东西',
                            }, {
                                value: 9,
                                text: '南北',
                            }]}
                        />
                    </FormItem>
                    <FormItem
                        label="价格信息"
                        className={clsItem}
                        layout="top"
                    >
                        <div>
                            <FormItem
                                label="月付价"
                                labelType="minor"
                                className={clsSubItem}
                            >
                                <Input />
                                <NoteWord>元／月</NoteWord>
                            </FormItem>
                            <FormItem
                                label="季付价"
                                labelType="minor"
                                className={clsSubItem}
                            >
                                <Input />
                                <NoteWord>元／月</NoteWord>
                            </FormItem>
                            <FormItem
                                label="半年价"
                                labelType="minor"
                                className={clsSubItem}
                            >
                                <Input />
                                <NoteWord>元／月</NoteWord>
                            </FormItem>
                            <FormItem
                                label="整年价"
                                labelType="minor"
                                className={clsSubItem}
                            >
                                <Input />
                                <NoteWord>元／月</NoteWord>
                            </FormItem>
                        </div>

                    </FormItem>
                    <FormItem
                        label="房源标签"
                        className={clsItem}
                    >
                        <div>
                            <div>
                                <TagPlaceholder active />
                                <TagPlaceholder />
                                <TagPlaceholder />
                                <TagPlaceholder />
                            </div>
                            <div>
                                <Tag>首次出租</Tag>
                                <Tag>集体供暖</Tag>
                                <Tag>独立供暖</Tag>
                                <Tag>有电梯</Tag>
                                <Tag>独立阳台</Tag>
                                <Tag>独立卫生间</Tag>
                                <TagAdd />
                            </div>
                        </div>

                    </FormItem>
                    <FormItem
                        label="房源介绍"
                        className={clsItem}
                    >
                        <Textarea />
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
                        <KeeperImage error />
                    </FormItem>
                    <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                        <UploadButton>下一步</UploadButton>
                    </div>
                </Form>
                <Tag status="active" erasable>自定义</Tag>
                <TagAdd />
                <TagPlaceholder active />
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
