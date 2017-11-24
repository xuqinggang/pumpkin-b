import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import Arrow from 'components/Arrow/index';
import RoomStatusManage from 'modules/RoomStatusManage/index';
import { houseType } from 'base/types';
import { expandSingleNum } from 'utils/index';
import './style.less';

class HouseStatusManage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };
        this.autoBind('handleSwitchExpand', 'handleEdit', 'handleDelete');
    }
    getChildContext() {
        return { houseId: this.props.house.id };
    }
    handleSwitchExpand() {
        this.setState({
            expand: !this.state.expand,
        });
    }
    handleEdit() {
        this.props.onEdit({ houseId: this.props.house.id });
    }
    handleDelete() {
        this.props.onDelete({ houseId: this.props.house.id });
    }
    render() {
        const clsPrefix = 'm-house-status-manage';
        const cls = classNames(clsPrefix, {});
        const {
            block,
            houseAddress,
            rentUnits,
            rentalType,
        } = this.props.house;
        return (
            <div className={cls}>
                <i className={`${clsPrefix}--indicator`} />
                <div className={`${clsPrefix}--info`}>
                    <div className={`${clsPrefix}--info--title`}>
                        <span className={`${clsPrefix}--info--name`}>
                            {block.name}
                        </span>
                        <button
                            className={`${clsPrefix}--info--edit`}
                            onClick={this.handleEdit}
                        >编辑</button>
                        <button
                            className={`${clsPrefix}--info--delete`}
                            onClick={this.handleDelete}
                        >删除</button>
                    </div>
                    <div className={`${clsPrefix}--address`}>
                        <div>
                            {houseAddress.buildNo}栋{houseAddress.unitNo === null ? '' : `${houseAddress.unitNo}单元`}
                        </div>
                        <div>{houseAddress.houseNo}号</div>
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
                        rentUnits.map((item, index) => (
                            <div
                                key={item.id}
                                className={`${clsPrefix}--rooms-unit`}
                            >
                                <RoomStatusManage
                                    renUnit={item}
                                    rentalType={rentalType}
                                    title={rentalType === 'SHARED' ? expandSingleNum(index + 1) : '整租'}
                                />
                                {
                                    index % 5 === 4
                                        ? null
                                        : <i className={`${clsPrefix}--rooms-indicator`} />
                                }
                            </div>
                        ))
                    }
                </div>
                {
                    rentUnits.length > 5
                    ? <Arrow down={this.state.expand} className={`${clsPrefix}--arrow`} onClick={this.handleSwitchExpand} />
                    : null
                }
            </div>
        );
    }
}

HouseStatusManage.propTypes = {
    house: houseType.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

HouseStatusManage.defaultProps = {
    onEdit: () => {},
    onDelete: () => {},
};
HouseStatusManage.childContextTypes = {
    houseId: PropTypes.number,
};
export default HouseStatusManage;
