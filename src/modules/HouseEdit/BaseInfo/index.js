import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import Form from 'components/Form/index';
import UploadHeader from '../coms/UploadHeader/index';
import HouseFloor from './coms/HouseFloor/index';
import HouseAddress from './coms/HouseAddress/index';
import KeeperInfo from './coms/KeeperInfo/index';
import RentalType from './coms/RentalType/index';
import HouseType from './coms/HouseType/index';
import VillageInfo from './coms/VillageInfo/index';
import './style.less';

class HouseUpload extends BaseComponent {
    render() {
        const clsPrefix = 'c-house-upload';

        return (
            <div className={clsPrefix}>
                <UploadHeader>{this.props.title}</UploadHeader>
                <Form>
                    <VillageInfo />
                    <HouseAddress />
                    <HouseFloor />
                    <HouseType />
                    <RentalType />
                    <KeeperInfo />
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
