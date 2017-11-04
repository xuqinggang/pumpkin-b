import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import Select from 'components/Select/index';
import Input from 'components/Input/index';
import NoteWord from '../Coms/NoteWord/index';
import HouseIntro from '../Coms/HouseIntro/index';
import HouseTag from '../Coms/RoomTag/index';
import PriceInput from '../Coms/PriceInput/index';
import './style.less';

class SingleRoomInfo extends BaseComponent {
    getChildContext() {
        return { index: this.props.index };
    }
    render() {
        const clsPrefix = 'c-house-info';
        const clsItem = `${clsPrefix}--item`;
        const clsSelect = `${clsPrefix}--select`;

        return (
            <div className={clsPrefix}>
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
                        <div style={{ marginBottom: '-30px' }}>
                            <PriceInput
                                label="月付价"
                                name="month"
                            />
                            <PriceInput
                                label="季付价"
                                name="season"
                            />
                            <PriceInput
                                label="半年价"
                                name="halfYear"
                            />
                            <PriceInput
                                label="年付价"
                                name="year"
                            />
                        </div>

                    </FormItem>
                    <HouseTag index={this.props.index} />
                    <FormItem
                        label="房源介绍"
                        className={clsItem}
                    >
                        <HouseIntro />
                    </FormItem>
                </Form>
            </div>
        );
    }
}

SingleRoomInfo.propTypes = {
    index: 0,
};

SingleRoomInfo.defaultProps = {
    index: PropTypes.number,
};

SingleRoomInfo.childContextTypes = {
    index: PropTypes.number,
};

export default SingleRoomInfo;
