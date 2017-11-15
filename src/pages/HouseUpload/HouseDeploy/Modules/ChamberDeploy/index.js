import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import ChamberHeader from '../../Coms/ChamberHeader';
import Equipment from '../../Coms/Equipment/index';
import DeployContain from '../../Coms/DeployContain/index';
import { addDeploys, removeDeploys } from '../../actions';
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

class ChamberDeploy extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleDrop', 'handleDelEquipment');
    }
    handleDrop(value) {
        const {
            name,
            index,
        } = this.props;
        this.props.dispatch(addDeploys(name, [index, null], value));
    }
    handleDelEquipment(deployIndex) {
        const {
            name,
            index,
        } = this.props;
        return () => {
            this.props.dispatch(removeDeploys(name, [index, deployIndex]));
        };
    }
    render() {
        const clsPrefix = 'c-chamber-deploy';
        const {
            name,
            index,
            deploys,
            suffix,
        } = this.props;
        return (
            <div
                className={clsPrefix}
            >
                <ChamberHeader>{setTitle(name, index, suffix)}</ChamberHeader>
                <DeployContain
                    onDrop={this.handleDrop}
                >
                    {
                        deploys.map((item, deployIndex) => (
                            <div
                                key={deployIndex}
                                className={`${clsPrefix}--equipment`}
                            >
                                <Equipment
                                    value={item}
                                    onDel={this.handleDelEquipment(deployIndex)}
                                />
                            </div>
                        ))
                    }
                </DeployContain>
            </div>
        );
    }
}


export default connect(
    (state, props) => {
        const {
            name,
            index,
        } = props;
        const deploys = state.houseUpload.chamberInfo[name][index].deploys;
        return {
            deploys,
        };
    },
)(ChamberDeploy);
