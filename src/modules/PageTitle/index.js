import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';

class PageTitle extends BaseComponent {
    shouldComponentUpdate(nextProps) {
        return nextProps.title !== this.props.title;
    }
    componentDidMount() {
        document.title = this.props.title;
    }
    componentDidUpdate() {
        document.title = this.props.title;
    }
    render() {
        return null;
    }
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PageTitle;
