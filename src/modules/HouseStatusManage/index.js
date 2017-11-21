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
        this.autoBind('handleSwitchExpand', 'handleEdit');
    }
    handleSwitchExpand() {
        this.setState({
            expand: !this.state.expand,
        });
    }
    handleEdit() {
        this.props.onEdit({ houseId: this.props.houseId });
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
                        <button
                            className={`${clsPrefix}--info--edit`}
                            onClick={this.handleEdit}
                        >编辑</button>
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
                            <div
                                key={index}
                                className={`${clsPrefix}--rooms-unit`}
                            >
                                {
                                    index % 5 === 0
                                        ? null
                                        : <i className={`${clsPrefix}--rooms-indicator`} />
                                }
                                <RoomStatusManage
                                    renUnitId={/* todo */11}
                                    title={expandSingleNum(index + 1)}
                                />
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
    houseId: PropTypes.number.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.shape()),
    onEdit: PropTypes.func,
};

HouseStatusManage.defaultProps = {
    rooms: [],
    onEdit: () => {},
};

export default HouseStatusManage;
