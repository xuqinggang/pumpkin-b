import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import { splitArrayWithIndex } from 'utils/index';
import { showStatusChangeDialog } from '../HouseManageList/actions';
import './style.less';

class RoomStatusManage extends BaseComponent {
    constructor(props) {
        super(props);
        this.operates = [
            {
                type: 'published',
                text: '发布',
            }, {
                type: 'occupied',
                text: '入住',
            }, {
                type: 'offline',
                text: '下架',
            }, {
                type: 'delete',
                text: '删除',
            },
        ];
        this.statusMapOperates = {
            undetermined: {
                text: '待发布',
                operates: splitArrayWithIndex(this.operates, 0, 2, 3),
            },
            published: {
                text: '已发布',
                operates: splitArrayWithIndex(this.operates, 1, 2),
            },
            occupied: {
                text: '已入住',
                operates: splitArrayWithIndex(this.operates, 2, 3),
            },
            offline: {
                text: '已下架',
                operates: splitArrayWithIndex(this.operates, 0, 3),
            },
        };

        this.autoBind('handleClick');
    }
    handleClick(type) {
        return () => {
            this.props.dispatch(showStatusChangeDialog(type, ({ value }) => {
                // TODO: 针对不同的type发送请求
                axios.put(`/v1/rentUnits/${this.props.renUnitId}/houseStatus?status=${type.toUpperCase()}`)
                .then((res) => {
                    console.log(res);
                })
                .catch((e) => {
                    console.log(e);
                });

                console.log(type);
                console.log(value);
            }));
        };
    }
    render() {
        const clsPreix = 'm-room-status-manage';
        const cls = classNames(clsPreix, {
            [`${clsPreix}__${this.props.status}`]: true,
        });
        const curOperates = this.statusMapOperates[this.props.status];
        return (
            <div className={cls}>
                <div className={`${clsPreix}--title`}>{this.props.title}</div>
                <div className={`${clsPreix}--status`}>
                    <i className={`${clsPreix}--indicator`} />
                    <span>{curOperates.text}</span>
                </div>
                <div className={`${clsPreix}--operate`}>
                    {
                        curOperates.operates.map(item => (
                            <button
                                key={item.text}
                                className={`${clsPreix}--btn`}
                                onClick={this.handleClick(item.type)}
                            >{item.text}</button>
                        ))
                    }
                </div>
            </div>
        );
    }
}

RoomStatusManage.defaultProps = {
    title: '',
    status: 'published',
    renUnitId: 0,
};

RoomStatusManage.propTypes = {
    title: PropTypes.string,
    renUnitId: PropTypes.number,
    status: PropTypes.oneOf(['published', 'occupied', 'offline', 'undetermined']),
};

export default connect()(RoomStatusManage);
