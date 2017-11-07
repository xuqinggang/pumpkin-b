import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Form, { FormItem } from 'components/Form/index';
import Input from 'components/Input/index';
import UploadHeader from '../Coms/UploadHeader/index';
import NoteWord from '../Coms/NoteWord/index';
import HouseFloor from './Coms/HouseFloor/index';
import KeeperInfo from './Coms/KeeperInfo/index';
import RentalType from './Coms/RentalType/index';
import HouseType from './Coms/HouseType/index';
import VillageInfo from './Coms/VillageInfo/index';
import './style.less';

class HouseUpload extends BaseComponent {
    render() {
        const clsPrefix = 'c-house-upload';
        const clsItem = `${clsPrefix}--item`;
        const clsInput = `${clsPrefix}--input`;

        return (
            <div className={clsPrefix}>
                <UploadHeader>基本信息</UploadHeader>
                <Form>

                    <FormItem
                        label="房源地址"
                        className={clsItem}
                    >
                        <div>
                            <Input className={clsInput} />
                            <NoteWord>栋</NoteWord>
                            <Input className={clsInput} />
                            <NoteWord>单元</NoteWord>
                            <Input className={clsInput} />
                            <NoteWord>号</NoteWord>
                        </div>
                    </FormItem>
                    <HouseFloor />
                    <VillageInfo />
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
