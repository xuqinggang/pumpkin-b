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
                        name="toilet"
                        options={[
                            {
                                value: 0,
                                text: '全部小区',
                            }, {
                                value: 1,
                                text: '小区a',
                            },
                        ]}
                    />
                    <Select
                        name="toilet"
                        options={[
                            {
                                value: 0,
                                text: '全部小区',
                            }, {
                                value: 1,
                                text: '小区a',
                            },
                        ]}
                    />
                    <Select
                        name="toilet"
                        options={[
                            {
                                value: 0,
                                text: '全部小区',
                            }, {
                                value: 1,
                                text: '小区a',
                            },
                        ]}
                    />
                </div>
            </div>
        );
    }
}

export default HouseManageFilter;
