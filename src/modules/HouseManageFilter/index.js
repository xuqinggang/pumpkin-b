import BaseComponent from 'components/BaseComponent/index';
import Checkbox from 'components/Checkbox/index';
import Select from 'components/Select/index';
import './style.less';

class HouseManageFilter extends BaseComponent {
    render() {
        const clsPrefix = 'm-house-manage-filter';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--left`}>
                    <Checkbox className={`${clsPrefix}--time-order`}>按时间展示</Checkbox>
                </div>
                <div className={`${clsPrefix}--right`}>
                    <Select
                        name="village"
                        defaultText="所属小区"
                        options={[
                            {
                                value: 0,
                                text: '全部小区',
                                blank: true,
                            }, {
                                value: 1,
                                text: '小区a',
                            },
                        ]}
                    />
                    <Select
                        name="rentalType"
                        defaultText="出租方式"
                        options={[
                            {
                                value: 'ALL',
                                text: '所有方式',
                                blank: true,
                            }, {
                                value: 'WHOLE',
                                text: '整租',
                            }, {
                                value: 'SHARE',
                                text: '合租',
                            },
                        ]}
                    />
                    <Select
                        name="roomStatus"
                        defaultText="房间状态"
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

export default HouseManageFilter;
