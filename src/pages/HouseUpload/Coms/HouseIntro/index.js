import React from 'react';
import BaseComponent from 'components/BaseComponent/index';
import Textarea from 'components/Textarea/index';
import PropTypes from 'prop-types';
import './style.less';

const validValue = (value) => {
    const maxLength = 500;
    return value.substr(0, maxLength);
};

class HouseIntro extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: validValue(props.value),
        };
        this.autoBind('handleChange');
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            value: validValue(nextProps.value),
        });
    }
    handleChange({ value }) {
        const val = validValue(value);
        this.setState({ value: val });
        this.props.onChange({ value: val, name: this.props.name });
    }
    render() {
        const clsPrefix = 'c-house-intro';
        return (
            <div className={clsPrefix}>
                <Textarea
                    value={this.state.value}
                    onChange={this.handleChange}
                    error={this.props.error}
                    placeholder="请输入房源介绍（最多500字）"
                    className={`${clsPrefix}--textarea`}
                />
            </div>
        );
    }
}

HouseIntro.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
};

HouseIntro.defaultProps = {
    name: '',
    value: '',
    onChange: () => {},
    error: false,
};

export default HouseIntro;
