import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Pager from 'components/Pager/index';
import { fetchHouseManageList } from '../HouseManageList/actions';

class HouseManageListPager extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handlePageChange');
    }
    handlePageChange(num) {
        this.props.dispatch(fetchHouseManageList({
            ...this.props.filter,
            curPage: num,
        }));
    }
    render() {
        const {
            curPage,
            totalPage,
        } = this.props;
        return (
            <div>
                {
                    totalPage > 1 ?
                        <Pager
                            curPage={curPage}
                            totalPage={totalPage}
                            onChange={this.handlePageChange}
                        />
                        : null
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        filter: state.houseManage.filter,
        curPage: state.houseManage.filter.curPage,
        totalPage: state.houseManage.filter.totalPage,
    }),
)(HouseManageListPager);
