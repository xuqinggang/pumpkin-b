import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Input from 'components/Input/index';
import { FormItem } from 'components/Form/index';
import NoteWord from '../../../Coms/NoteWord/index';
import { setHouseFloor } from '../../actions';

class HouseFloor extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                curFloor: {
                    error: false,
                },
                totalFloor: {
                    error: false,
                },
            },
        };
        this.autoBind('handleChange', 'handleBlur');
    }
    handleChange({ name, value }) {
        this.setState({
            error: {
                ...this.state.error,
                [name]: {
                    error: false,
                },
            },
        });

        this.props.dispatch(setHouseFloor({ name, value }));
    }
    handleBlur({ name, value }) {
        let processValue = value;
        if (isNaN(Number(value))) {
            processValue = '';
        }
        if (!processValue) {
            this.setState({
                error: {
                    ...this.state.error,
                    [name]: {
                        error: true,
                    },
                },
            });
        }
        this.props.dispatch(setHouseFloor({ name, value: processValue }));
    }
    render() {
        const clsPrefix = 'c-house-floor';
        const { curFloor, totalFloor } = this.props.houseFloor;
        const { error } = this.state;
        return (
            <FormItem
                label="房源楼层"
                className={clsPrefix}
            >
                <div>
                    <NoteWord first>第</NoteWord>
                    <Input
                        name="curFloor"
                        value={curFloor}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={error.curFloor.error}
                    />
                    <NoteWord>层／共</NoteWord>
                    <Input
                        name="totalFloor"
                        value={totalFloor}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        error={error.totalFloor.error}
                    />
                    <NoteWord>层</NoteWord>
                </div>
            </FormItem>
        );
    }
}

export default connect(
    state => ({
        houseFloor: state.houseUpload.baseInfo.houseFloor,
    }),
)(HouseFloor);
