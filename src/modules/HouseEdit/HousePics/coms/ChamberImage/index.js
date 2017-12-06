import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormItem } from 'components/Form/index';
import BaseComponent from 'components/BaseComponent/index';
import AddImage from '../AddImage/index';
import { uploadPics, removePics } from '../../actions';
import { hideValidateError } from '../../../actions';
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

const setTitle = (roomType, cur, suffix) => {
    if (roomType === 'kitchens') {
        return roomNameMap[roomType];
    }
    if (roomType === 'rooms' || roomType === 'saloons' || roomType === 'toilets') {
        if (!suffix) {
            return roomNameMap[roomType];
        }
        return `${roomNameMap[roomType]} ${notSingleNum(cur + 1)}`;
    }
};

class ChamberImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.names = ['rooms', 'saloons', 'toilets', 'kitchens'];
        this.state = {
            error: {
                error: false,
                message: '',
            },
        };
        this.autoBind('handleAddImage', 'handleDelImage');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error.error !== this.props.error.error && nextProps.error.error) {
            this.setState({
                error: {
                    ...nextProps.error,
                },
            });
        }
    }
    handleAddImage({ name, coords, value }) {
        this.setState({
            error: {
                error: false,
                message: '',
            },
        });
        this.props.dispatch(hideValidateError({ pageType: 'housePics' }));
        this.props.dispatch(uploadPics(name, coords, value));
    }
    handleDelImage({ name, coords }) {
        this.props.dispatch(removePics(name, coords));
    }
    render() {
        const clsPrefix = 'c-chamber-image';
        const { name, index, pics, suffix } = this.props;

        return (
            <FormItem
                label={setTitle(
                    name,
                    index,
                    suffix)}
                className={clsPrefix}
                error={this.state.error}
                layout="top"
            >
                <div className={`${clsPrefix}--wrap`}>
                    {
                        pics.map((picItem, picIndex) => (
                            <AddImage
                                key={`${name}${index}${picIndex}`}
                                name={name}
                                coords={[index, picIndex]}
                                onDel={this.handleDelImage}
                                imgUrl={picItem}
                            />
                        ))
                    }
                    {
                        pics.length >= 5
                            ? null
                            : (
                                <AddImage
                                    name={name}
                                    coords={[index, null]} // for add
                                    forAdd
                                    onAdd={this.handleAddImage}
                                >
                                    <div>{`上传${setTitle(
                                        name,
                                        index,
                                        suffix)}照片`}</div>
                                    <div>{
                                        (this.props.rentalType === 0 &&
                                            name === 'rooms' &&
                                            index === 0 &&
                                            pics.length === 0
                                        ) ||
                                        (this.props.rentalType === 1 &&
                                            name === 'rooms' &&
                                            pics.length === 0
                                        ) ? '第一张图片将作为App的头图' : null
                                    }</div>
                                </AddImage>
                            )
                    }
                </div>
            </FormItem>
        );
    }
}

ChamberImage.defaultProps = {
    name: '',
    index: -1,
    pics: [],
    suffix: false,
};
ChamberImage.propTypes = {
    name: PropTypes.string,
    index: PropTypes.number,
    suffix: PropTypes.bool,
    pics: PropTypes.arrayOf(PropTypes.string),
};

export default connect(
    (state, props) => {
        const {
            name,
            index,
        } = props;
        const pics = state.houseUpload.chamberInfo[name][index].picUrls;

        let error = {
            error: false,
            message: '',
        };
        const housePicsError = state.houseUpload.validateError.housePics;

        if (housePicsError &&
            housePicsError.type === name &&
            housePicsError.chamberIndex === index) {
            error = housePicsError;
        }

        const rentalType = state.houseUpload.baseInfo.rentalType;
        return {
            error,
            pics,
            rentalType,
        };
    },
)(ChamberImage);
