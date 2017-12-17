import React from 'react';
import PropTypes from 'prop-types';
import { valueType } from 'base/types';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import RoomArea from './coms/RoomArea/index';
import RoomBrief from './coms/RoomBrief/index';
import RoomTag from './coms/RoomTag/index';
import RoomHeader from './coms/RoomHeader/index';
import PriceInput from './coms/PriceInput/index';
import RoomDirect from './coms/RoomDirect/index';
import './style.less';

class SingleRoomInfo extends BaseComponent {
    getChildContext() {
        return { roomId: this.props.roomId };
    }
    componentDidMount() {
        this.singleRoom.scrollIntoView();
    }
    render() {
        const clsPrefix = 'c-house-info';
        const clsItem = `${clsPrefix}--item`;

        return (
            <div
                className={clsPrefix}
                ref={this.storeRef('singleRoom')}
            >
                {
                    this.props.showHeader
                    ? (
                        <RoomHeader
                            roomId={this.props.roomId}
                            onDel={this.props.onDel}
                        />
                    )
                    : null
                }
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
                                label="季付价"
                                name="season"
                            />
                            <PriceInput
                                label="月付价"
                                name="month"
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
    roomId: valueType.isRequired,
    onDel: PropTypes.func,
    showHeader: PropTypes.bool,
};

SingleRoomInfo.defaultProps = {
    roomId: valueType,
    onDel: () => {},
    showHeader: true,
};

SingleRoomInfo.childContextTypes = {
    roomId: valueType,
};

export default SingleRoomInfo;
