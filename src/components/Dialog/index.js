import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from '../BaseComponent';
import Overlay from '../Overlay';
import Portal from '../Portal';
import './style.less';

class Dialog extends BaseComponent {
    constructor(props) {
        super(props);
        this.topGutter = 8;
        this.headerHeight = props.title ? 48 : 0;
        this.footerHeight = props.actions.length > 0 ? 32 : 0;
        this.autoBind('resize');
    }
    componentDidUpdate() {
        this.resize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize() {
        if (this.props.hide) return;

        const extraHeight = this.headerHeight + this.footerHeight;
        const contentHeight = this.content.scrollHeight;
        const maxDialogHeight = window.innerHeight - (this.topGutter * 2);
        const maxBodyHeight = maxDialogHeight - extraHeight;
        const bodyHeight = Math.min(maxBodyHeight, contentHeight);
        const wrpHeight = (bodyHeight + extraHeight) + 2; // 有2px的border

        this.content.style.height = `${bodyHeight}px`;
        this.body.style.height = `calc(100% - ${extraHeight}px)`;

        this.wrp.style.height = `${wrpHeight}px`;
        this.wrp.style.marginTop = `${0 - (this.wrp.offsetHeight / 2)}px`;
        this.wrp.style.marginLeft = `${0 - (this.wrp.offsetWidth / 2)}px`;
    }

    render() {
        const clsPrefix = 'c-dialog';
        const { className, style, position, children, hide, title, actions, onClose } = this.props;
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}-${position}`]: !!position,
        }, className);
        const dialogStyle = {
            ...style,
        };
        return (
            <Overlay modal hide={hide}>
                <div ref={this.storeRef('wrp')} style={dialogStyle} className={cls}>
                    {
                        title ?
                            <div className={`${clsPrefix}--header`}>
                                {title}
                                <i
                                    className="kz-e-close-4"
                                    onClick={onClose}
                                    role="button"
                                    tabIndex={0}
                                />
                            </div> : null
                    }
                    <div
                        className={`${clsPrefix}--body`}
                        ref={this.storeRef('body')}
                    >
                        <div
                            ref={this.storeRef('content')}
                        >
                            { children }
                        </div>
                    </div>
                    {
                        actions.length > 0 ?
                            <div className={`${clsPrefix}--footer`}>
                                {actions}
                            </div> : null
                    }
                </div>
            </Overlay>
        );
    }
}

Dialog.defaultProps = {
    hide: false,
    actions: [],
    title: '',
    onClose: () => {},
};

Dialog.propTypes = {
    position: PropTypes.oneOf(['bottom', 'top']),
    title: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.node),
    hide: PropTypes.bool,
    onClose: PropTypes.func,
};

export default Dialog;
