import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import SearchSelect from 'components/SearchSelect/index';
import { throttle } from 'utils/index';
import { setVillageInfo } from '../../actions';
import { validateBaseInfo } from '../../../coms/ValidateData';
import { hideValidateError } from '../../../actions';

class VillageInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: false,
                message: '',
            },
            selectNote: {
                hide: true,
                text: '',
            },
            options: [],
        };
        this.autoBind('handleSelect', 'handleSearch', 'handleBlur', 'fetchSearch');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error.error !== this.props.error.error && nextProps.error.error) {
            this.setState({
                error: {
                    ...nextProps.error,
                },
            });
        }
    }
    fetchSearch(text) {
        // 当无搜索内容，不发送请求
        // 将提示和选项重置
        if (text === '') {
            this.setState({
                selectNote: {
                    hide: true,
                    text: '',
                },
                options: [],
            });
            return;
        }
        axios.get('/v1/common/blockSearch', {
            params: {
                keyword: text,
                cityId: 1,
            },
        })
        .then((res) => {
            if (res.data.code === 200) {
                const blocks = res.data.data.blocks;
                this.setState({
                    options: blocks.map(item => ({
                        value: item.id,
                        text: item.name,
                    })),
                    selectNote: {
                        hide: blocks.length > 0,
                        text: '未找到该小区',
                    },
                });
            }
        })
        .catch(() => {
            // 清空
            this.setState({
                options: [],
            });
        });
    }
    handleSearch({ search }) {
        this.setState({
            error: {
                error: false,
                message: '',
            },
        });
        this.props.dispatch(setVillageInfo(search));
        this.props.dispatch(hideValidateError({ pageType: 'baseInfo' }));
        this.throttleSearch(search.text);
    }
    handleBlur({ search }) {
        const error = validateBaseInfo.village(search);
        this.setState({
            error: {
                ...error,
            },
        });
    }
    componentDidMount() {
        this.throttleSearch = throttle(this.fetchSearch, 200);
    }
    render() {
        const clsPrefix = 'c-village-info';
        return (
            <FormItem
                label="选择小区"
                className={clsPrefix}
                error={this.state.error}
            >
                <SearchSelect
                    search={this.props.search}
                    onChange={this.handleSearch}
                    options={this.state.options}
                    onBlur={this.handleBlur}
                    placeholder="输入小区名称搜索..."
                    error={this.state.error.error}
                    selectNote={this.state.selectNote}
                />
            </FormItem>
        );
    }
}

export default connect(
    (state) => {
        let error = {
            error: false,
            message: '',
        };
        const baseInfoError = state.houseUpload.validateError.baseInfo;
        if (baseInfoError && baseInfoError.type === 'village') {
            error = baseInfoError;
        }
        return {
            error,
            search: state.houseUpload.baseInfo.village,
        };
    },
)(VillageInfo);
