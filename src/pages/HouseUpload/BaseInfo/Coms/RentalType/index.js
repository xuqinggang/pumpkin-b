import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import RadioGroup from 'components/Radio/index';
import { switchRentalType } from '../../actions';

class RentalType extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleChange');
    }
    handleChange({ value }) {
        this.props.dispatch(switchRentalType(value));
    }
    render() {
        const clsPrefix = 'c-rental-type';
        return (
            <FormItem
                label="出租方式"
                className={clsPrefix}
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
    state => ({
        value: state.houseUpload.baseInfo.rentalType,
    }),
)(RentalType);
