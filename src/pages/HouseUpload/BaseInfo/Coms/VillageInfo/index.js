import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import SearchSelect from 'components/SearchSelect/index';
import { setVillageInfo } from '../../actions';

class VillageInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                isError: false,
                message: '',
            },
            options: [
                {
                    value: 101,
                    text: '双榆树',
                },
                {
                    value: 102,
                    text: '双榆树小',
                },
                {
                    value: 103,
                    text: '双榆树小区',
                },
            ],
        };
        this.autoBind('handleSelect', 'handleSearch');
    }
    handleSearch({ search }) {
        this.props.dispatch(setVillageInfo(search));
        this.setState({
            options: [
                {
                    value: 101,
                    text: '双榆树',
                },
            ],
        });
    }
    render() {
        const clsPrefix = 'c-village-info';
        return (
            <FormItem
                label="选择小区"
                className={clsPrefix}
                error={{ isError: this.state.error.isError, message: '小区名称不得为空   or   系统暂无该小区，请仔细核对名称或联系客服' }}
            >
                <SearchSelect
                    search={this.props.search}
                    onChange={this.handleSearch}
                    options={this.state.options}
                />
            </FormItem>
        );
    }
}

export default connect(
    state => ({
        search: state.houseUpload.baseInfo.village,
    }),
)(VillageInfo);
