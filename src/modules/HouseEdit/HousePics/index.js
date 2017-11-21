import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'components/Form/index';
import BaseComponent from 'components/BaseComponent/index';
import ChamberImage from './coms/ChamberImage/index';
import UploadHeader from '../coms/UploadHeader/index';

class HousePics extends BaseComponent {
    constructor(props) {
        super(props);
        this.names = ['rooms', 'saloons', 'toilets', 'kitchens'];
    }
    render() {
        const clsPrefix = 'c-house-pics';

        return (
            <div className={clsPrefix}>
                <UploadHeader>{this.props.title}</UploadHeader>
                <Form>
                    {
                        this.names.map(nameItem => (
                            this.props.chamberInfo[nameItem].map((item, index) => (
                                <ChamberImage
                                    key={`${nameItem}${index}`}
                                    name={nameItem}
                                    index={index}
                                    suffix={this.props.chamberInfo[nameItem].length !== 0}
                                />
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
        const chamberInfo = state.houseUpload.chamberInfo;
        return {
            chamberInfo,
        };
    },
)(HousePics);
