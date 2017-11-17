import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Arrow from 'components/Arrow/index';
import RoomStatusManage from 'modules/RoomStatusManage/index';
import { expandSingleNum } from 'utils/index';
import './style.less';

class HouseStatusManage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };
        this.autoBind('handleSwitchExpand');
    }
    handleSwitchExpand() {
        this.setState({
            expand: !this.state.expand,
        });
    }
    render() {
        const clsPrefix = 'm-house-status-manage';
        const rooms = [1, 2, 3, 4, 5, 7, 8];
        return (
            <div className={clsPrefix}>
                <i className={`${clsPrefix}--indicator`} />
                <div className={`${clsPrefix}--info`}>
                    <div className={`${clsPrefix}--info--title`}>
                        <span className={`${clsPrefix}--info--name`}>双榆树的一个小区</span>
                        <button className={`${clsPrefix}--info--edit`}>编辑</button>
                    </div>
                    <div className={`${clsPrefix}--address`}>
                        <div>1栋101单元</div>
                        <div>1012号</div>
                    </div>
                </div>
                <div
                    className={
                        classNames(`${clsPrefix}--rooms`, {
                            [`${clsPrefix}--rooms__expand`]: this.state.expand,
                        })}
                    ref={this.storeRef('roomsWrap')}
                >
                    {
                        rooms.map((item, index) => (
                            <div className={`${clsPrefix}--rooms-unit`}>
                                {
                                    index % 5 === 0
                                        ? null
                                        : <i className={`${clsPrefix}--rooms-indicator`} />
                                }
                                <RoomStatusManage title={expandSingleNum(index + 1)} />
                            </div>
                        ))
                    }
                </div>
                {
                    rooms.length > 5
                    ? <Arrow down={this.state.expand} className={`${clsPrefix}--arrow`} onClick={this.handleSwitchExpand} />
                    : null
                }
            </div>
        );
    }
}

HouseStatusManage.propTypes = {
    rooms: PropTypes.arrayOf({}),
};

export default HouseStatusManage;
