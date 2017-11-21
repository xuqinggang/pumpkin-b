import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class Arrow extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }
    handleClick() {
        this.props.onClick();
    }
    render() {
        const clsPrefix = 'c-arrow';
        const cls = classNames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__down`]: !!this.props.down,
        });
        return (
            <div
                role="button"
                tabIndex={0}
                className={cls}
                onClick={this.handleClick}
            >
                <i className={`${clsPrefix}--indicator`} />
            </div>
        );
    }
}

Arrow.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
};

Arrow.defaultProps = {
    onClick: () => {},
    classNames: '',
};

export default Arrow;
