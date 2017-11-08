import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Form from 'components/Form/index';
import UploadHeader from '../Coms/UploadHeader/index';
import HouseFloor from './Coms/HouseFloor/index';
import HouseAddress from './Coms/HouseAddress/index';
import KeeperInfo from './Coms/KeeperInfo/index';
import RentalType from './Coms/RentalType/index';
import HouseType from './Coms/HouseType/index';
import VillageInfo from './Coms/VillageInfo/index';
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
