import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import RoomArea from './coms/RoomArea/index';
import RoomBrief from './coms/RoomBrief/index';
import RoomTag from './coms/RoomTag/index';
import PriceInput from './coms/PriceInput/index';
import RoomDirect from './coms/RoomDirect/index';
import './style.less';

class SingleRoomInfo extends BaseComponent {
    getChildContext() {
        return { roomId: this.props.roomId };
    }
    render() {
        const clsPrefix = 'c-house-info';
        const clsItem = `${clsPrefix}--item`;

        return (
            <div className={clsPrefix}>
                <RoomArea />
                <Form>
                    <FormItem
                        label="房源朝向"
                        className={clsItem}
                    >
                        <RoomDirect />
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
                    <RoomTag />
                    <FormItem
                        label="房源介绍"
                        className={clsItem}
                    >
                        <RoomBrief />
                    </FormItem>
                </Form>
            </div>
        );
    }
}

SingleRoomInfo.propTypes = {
    roomId: PropTypes.number.isRequired,
};

SingleRoomInfo.defaultProps = {
    roomId: PropTypes.number,
};

SingleRoomInfo.childContextTypes = {
    roomId: PropTypes.number,
};

export default SingleRoomInfo;
