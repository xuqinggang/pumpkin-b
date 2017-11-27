import { connect } from 'react-redux';
import axios from 'axios';
import BaseComponent from 'components/BaseComponent/index';
import Checkbox from 'components/Checkbox/index';
import Select from 'components/Select/index';
import { fetchHouseManageList } from '../HouseManageList/actions';
import './style.less';

class HouseManageFilter extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            villageOptions: [],
        };
        this.defaultVillageOption = {
            value: 'ALL',
            text: '全部小区',
            blank: true,
        };
        this.autoBind(
            'fetchVillageList',
            'handleChangeSortByTime',
            'handleFilterBy',
        );
    }
    fetchVillageList() {
        axios.get('/v1/blocks')
        .then((res) => {
            const villageList = res.data.data;
            const villageOptions = villageList.map(item => ({
                text: item.name,
                value: item.blockId,
            }));
            this.setState({
                villageOptions,
            });
        });
    }
    handleChangeSortByTime({ checked }) {
        this.props.dispatch(fetchHouseManageList({
            ...this.props.filter,
            isSortByTime: checked,
        }));
    }
    handleFilterBy({ name, select }) {
        this.props.dispatch(fetchHouseManageList({
            ...this.props.filter,
            [name]: select.value,
        }));
    }
    componentDidMount() {
        this.fetchVillageList();
    }
    render() {
        const clsPrefix = 'm-house-manage-filter';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--left`}>
                    <Checkbox
                        className={`${clsPrefix}--time-order`}
                        checked={this.props.isSortByTime}
                        onChange={this.handleChangeSortByTime}
                    >按时间展示</Checkbox>
                </div>
                <div className={`${clsPrefix}--right`}>
                    <Select
                        value={this.props.village}
                        name="village"
                        defaultText="所属小区"
                        options={[this.defaultVillageOption].concat(this.state.villageOptions)}
                        onChange={this.handleFilterBy}
                    />
                    <Select
                        name="rentalType"
                        defaultText="出租方式"
                        value={this.props.rentalType}
                        onChange={this.handleFilterBy}
                        options={[
                            {
                                value: 'ALL',
                                text: '所有方式',
                                blank: true,
                            }, {
                                value: 'WHOLE',
                                text: '整租',
                            }, {
                                value: 'SHARED',
                                text: '合租',
                            },
                        ]}
                    />
                    <Select
                        name="roomStatus"
                        defaultText="房间状态"
                        value={this.props.roomStatus}
                        onChange={this.handleFilterBy}
                        options={[
                            {
                                value: 'ALL',
                                text: '所有状态',
                                blank: true,
                            }, {
                                value: 'PUBLISHED',
                                text: '已发布',
                            }, {
                                value: 'OCCUPIED',
                                text: '已入住',
                            }, {
                                value: 'OFFLINE',
                                text: '已下架',
                            }, {
                                value: 'FINISHED',
                                text: '待发布',
                            },
                        ]}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        const {
            isSortByTime,
            village,
            rentalType,
            roomStatus,
        } = state.houseManage.filter;
        const filter = state.houseManage.filter;
        return {
            isSortByTime,
            village,
            rentalType,
            roomStatus,
            filter,
        };
    },
)(HouseManageFilter);
