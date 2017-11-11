import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import RadioGroup from 'components/Radio/index';
import { switchRentalType } from '../../actions';
import { hideValidateError } from '../../../actions';

class RentalType extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: false,
                message: '',
            },
        };
        this.autoBind('handleChange');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error.error) {
            this.setState({
                error: {
                    ...nextProps.error,
                },
            });
        }
    }
    handleChange({ value }) {
        this.setState({
            error: {
                ...this.state.error,
                error: false,
            },
        });
        this.props.dispatch(switchRentalType(value));
        this.props.dispatch(hideValidateError({ pageType: 'baseInfo' }));
    }
    render() {
        const clsPrefix = 'c-rental-type';
        return (
            <FormItem
                label="出租方式"
                className={clsPrefix}
                error={this.state.error}
            >
                <RadioGroup
                    layout="horizontal"
                    options={[
                        {
                            value: 0,
                            text: '整租',
                        },
                        {
                            value: 1,
                            text: '合租',
                        },
                    ]}
                    value={this.props.value}
                    onChange={this.handleChange}
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
        if (baseInfoError && baseInfoError.type === 'rentalType') {
            error = baseInfoError;
        }
        return {
            error,
            value: state.houseUpload.baseInfo.rentalType,
        };
    },
)(RentalType);
