import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import SearchSelect from 'components/SearchSelect/index';
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
        this.autoBind('handleSelect', 'handleSearch', 'handleBlur');
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
    handleSearch({ search }) {
        this.setState({
            error: {
                error: false,
                message: '',
            },
        });
        this.props.dispatch(setVillageInfo(search));
        this.props.dispatch(hideValidateError({ pageType: 'baseInfo' }));
        this.setState({
            options: [
                {
                    value: 101,
                    text: '双榆树',
                },
            ],
        });
    }
    handleBlur({ search }) {
        const error = validateBaseInfo.village(search);
        this.setState({
            error: {
                ...error,
            },
        });
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
