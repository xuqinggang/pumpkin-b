import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import UploadHeader from '../../../coms/UploadHeader/index';
import Equipment from '../../Coms/Equipment/index';
import ScrollFix from '../../Coms/ScrollFix/index';
import './style.less';

class EquipContain extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            equipList: [],
        };
    }
    componentDidMount() {
        // 占位
        this.scrollPlaceHolder.style.height = `${this.scrollFix.getClientHeight()}px`;
    }
    componentDidUpdate() {
        // 占位
        this.scrollPlaceHolder.style.height = `${this.scrollFix.getClientHeight()}px`;
    }
    render() {
        const clsPrefix = 'c-equip-contain';
        return (
            <div ref={this.storeRef('scrollPlaceHolder')}>
                <ScrollFix className={clsPrefix} ref={this.storeRef('scrollFix')}>
                    <UploadHeader>{this.props.title}</UploadHeader>
                    {
                        this.props.allDeploys.map(item => (
                            <div key={item.value} className={`${clsPrefix}--equipment`}>
                                <Equipment value={item.value} />
                            </div>
                        ))
                    }
                </ScrollFix>
            </div>
        );
    }
}

EquipContain.defaultProps = {
    title: '',
};
EquipContain.propTypes = {
    title: PropTypes.string,
};

export default connect(
    state => ({
        allDeploys: state.houseUpload.roomDeploys.allDeploys,
    }),
)(EquipContain);
