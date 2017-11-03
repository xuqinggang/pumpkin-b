import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input/index';
import BaseComponent from '../BaseComponent/index';
import Options from '../Options/index';
import { valueType, optionListType } from '../../base/types';
import './style.less';

const setSelect = (select, options) => {
    if (!options.some(item => (item.value === select.value))) {
        return options[0];
    }
    return select;
};

class SearchSelect extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            select: setSelect(props.search, props.options),
        };
        this.autoBind(
            'handleInputChange',
            'handleOptionsClick',
            'handleKeyDown',
            'handleFocus',
            'handleBlur',
            'handleInputClick',
        );
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            select: setSelect(nextProps.search, nextProps.options),
        });
    }
    handleInputChange(e) {
        if (this.props.onSearch) {
            this.props.onSearch(e.target.value);
        }
    }
    handleFocus() {
        this.setState({
            expand: true,
        });
    }
    handleBlur(e) {
        if (e.relatedTarget && this.wrp.contains(e.relatedTarget)) {
            this.input.toFocus();
            e.preventDefault();
            return;
        }
        this.setState({
            expand: false,
        });
    }
    handleOptionsClick(item) {
        if (this.props.onSelect) {
            this.props.onSelect(item);
        }
        this.setState({
            expand: false,
        });
    }
    handleInputClick() {
        this.setState({
            expand: true,
        });
    }
    handleKeyDown(e) {
        const { select } = this.state;
        const { options } = this.props;

        // get index
        let curIndex = -1;
        options.some((item, index) => {
            curIndex = index;
            return item.value === select.value;
        });

        if (curIndex === -1) return;

        const optionsLen = options.length;
        switch (e.keyCode) {
        case 38:
            // page up
            if (curIndex === 0) {
                curIndex = optionsLen - 1;
            } else {
                curIndex -= 1;
            }
            this.setState({
                select: options[curIndex],
            });
            e.preventDefault();
            break;

        case 40:
            // page down
            if (curIndex === optionsLen - 1) {
                curIndex = 0;
            } else {
                curIndex += 1;
            }
            this.setState({
                select: options[curIndex],
            });
            e.preventDefault();
            break;
        case 13:
            // enter
            if (this.props.onSelect) {
                this.props.onSelect(options[curIndex]);
            }
            this.setState({
                expand: false,
            });
            break;
        default:
        }
        e.stopPropagation();
    }
    render() {
        const clsPrefix = 'c-search-select';
        const { placeholder, options, search } = this.props;
        const { select, expand } = this.state;
        const cls = classNames(clsPrefix, {
            [this.props.className]: true,
        });
        return (
            <div
                className={cls}
                role="button"
                tabIndex={0}
                ref={this.storeRef('wrp')}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
            >
                <Input
                    className={`${clsPrefix}--input`}
                    placeholder={placeholder}
                    ref={this.storeRef('input')}
                    onChange={this.handleInputChange}
                    onClick={this.handleInputClick}
                    value={search.text}
                />
                <div
                    className={
                        classNames(
                            `${clsPrefix}--popover`,
                            { [`${clsPrefix}--popover__hide`]: options.length === 0 || !expand },
                        )}
                >
                    {
                        options.map((item, index) => (
                            <Options
                                key={index}
                                onClick={this.handleOptionsClick}
                                item={item}
                                selected={item.value === select.value}
                            />
                        ))
                    }
                </div>

            </div>
        );
    }
}

SearchSelect.defaultProps = {
    placeholder: '',
    search: {
        value: null,
        text: '',
    },
    name: '',
    options: [],
    onSearch: null,
    onSelect: null,
    className: '',
};

SearchSelect.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    search: PropTypes.shape({
        value: valueType,
        text: PropTypes.string,
    }),
    options: optionListType,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    className: PropTypes.string,
};

export default SearchSelect;
