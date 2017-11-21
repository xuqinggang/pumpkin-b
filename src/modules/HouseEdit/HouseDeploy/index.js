import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { DnDContext } from 'components/DnD/index';
import EquipContain from './Modules/EquipContain/index';
import ChamberDeploy from './Modules/ChamberDeploy/index';

class HouseDeploy extends BaseComponent {
    constructor(props) {
        super(props);
        this.names = ['rooms', 'saloons', 'toilets', 'kitchens'];
    }
    render() {
        return (
            <DnDContext>
                <div>
                    <EquipContain title={this.props.title} />
                    {
                        this.names.map(nameItem => (
                            this.props.chamberInfo[nameItem].map((item, index) => (
                                <ChamberDeploy
                                    key={`${nameItem}${index}`}
                                    name={nameItem}
                                    index={index}
                                    suffix={this.props.chamberInfo[nameItem].length !== 1}
                                />
                            ))
                        ))
                    }
                </div>
            </DnDContext>
        );
    }
}

export default connect(
    (state) => {
        const chamberInfo = state.houseUpload.chamberInfo;
        return {
            chamberInfo,
        };
    },
)(HouseDeploy);
