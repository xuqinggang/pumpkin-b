import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import UploadHeader from '../../../Coms/UploadHeader/index';
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
    fetchEquipList() {
        const equipList = ['BED', 'TABLE', 'QUEENBED'];
        this.setState({
            equipList,
        });
    }
    componentDidMount() {
        this.fetchEquipList();
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
                        this.state.equipList.map(item => (
                            <div key={item} className={`${clsPrefix}--equipment`}>
                                <Equipment value={item} />
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

export default EquipContain;
