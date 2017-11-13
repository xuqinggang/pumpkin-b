import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form, { FormItem } from 'components/Form/index';
import BaseComponent from 'components/BaseComponent/index';
import RoomImage from './Coms/RoomImage/index';
import UploadHeader from '../Coms/UploadHeader/index';
import './style.less';

const notSingleNum = (num) => {
    if (num >= 0 && num <= 9) {
        return `0${num}`;
    }
    return `${num}`;
};

const roomNameMap = {
    rooms: '卧室',
    saloons: '客厅',
    toilets: '卫生间',
    kitchens: '厨房',
};

const setTitle = (roomType, cur, total) => {
    if (roomType === 'kitchens') {
        return roomNameMap[roomType];
    }
    if (roomType === 'rooms' || roomType === 'saloons' || roomType === 'toilets') {
        if (total === 1) {
            return roomNameMap[roomType];
        }
        return `${roomNameMap[roomType]} ${notSingleNum(cur + 1)}`;
    }
};

class HousePics extends BaseComponent {
    constructor(props) {
        super(props);
        this.names = ['rooms', 'saloons', 'toilets', 'kitchens'];
    }
    handleAddRoom() {
        this.setState({
            editing: this.props.roomNum,
        });
    }
    render() {
        const clsPrefix = 'c-house-pics';

        return (
            <div className={clsPrefix}>
                <UploadHeader>{this.props.title}</UploadHeader>
                <Form>
                    {
                        this.names.map(nameItem => (
                            this.props.housePics[nameItem].map((item, index) => (
                                <FormItem
                                    key={`${nameItem}${index}`}
                                    label={setTitle(
                                        nameItem,
                                        index,
                                        this.props.housePics[nameItem].length)}
                                >
                                    {
                                        item.picUrls.map((picItem, picIndex) => (
                                            <RoomImage
                                                key={`${nameItem}${index}${picIndex}`}
                                                name={nameItem}
                                                coords={[index, picIndex]}
                                            />
                                        ))
                                    }
                                    {
                                        <RoomImage
                                            name={nameItem}
                                            coords={[index, null]} // for add
                                            forAdd
                                        >
                                            {`上传${setTitle(
                                                nameItem,
                                                index,
                                                this.props.housePics[nameItem].length)}照片`}
                                        </RoomImage>
                                    }
                                </FormItem>
                            ))
                        ))
                    }
                </Form>
            </div>
        );
    }
}

HousePics.propTypes = {
    children: PropTypes.node,
};

HousePics.defaultProps = {
    children: null,
};

export default connect(
    (state) => {
        const housePics = state.houseUpload.housePics;
        return {
            housePics,
        };
    },
)(HousePics);
