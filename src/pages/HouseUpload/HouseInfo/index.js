import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import Select from 'components/Select/index';
import Input from 'components/Input/index';
import Tag, { TagAdd, TagPlaceholder } from 'components/Tag/index';
import UploadButton from '../Coms/UploadButton/index';
import UploadHeader from '../Coms/UploadHeader/index';
import NoteWord from '../Coms/NoteWord/index';
import HouseIntro from '../Coms/HouseIntro/index';
import PriceInput from '../Coms/PriceInput/index';
import './style.less';

class HouseUpload extends BaseComponent {
    render() {
        const clsPrefix = 'c-house-info';
        const clsItem = `${clsPrefix}--item`;
        const clsSelect = `${clsPrefix}--select`;

        return (
            <div className={clsPrefix}>
                <UploadHeader>房间信息</UploadHeader>
                <Form>
                    <FormItem
                        label="房间面积"
                        className={clsItem}
                    >
                        <Input />
                        <NoteWord>平米</NoteWord>
                    </FormItem>
                    <FormItem
                        label="房源朝向"
                        className={clsItem}
                    >
                        <Select
                            className={clsSelect}
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
                            <PriceInput
                                label="月付价"
                                name="month"
                            />
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
                        <HouseIntro />
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
