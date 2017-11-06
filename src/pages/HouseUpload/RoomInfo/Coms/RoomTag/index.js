import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import Tag, { TagPlaceholder, TagAdd } from 'components/Tag/index';
import { activeTags, delActiveTags, addTags } from '../../actions';

const creatNDimArray = (num, value) => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push(value);
    }
    return arr;
};

class RoomTag extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleTagClick', 'handleRemoveActiveTags', 'handleAddTags');
    }
    handleTagClick({ value }) {
        this.props.dispatch(activeTags(this.props.index, { value }));
    }
    handleRemoveActiveTags({ value }) {
        this.props.dispatch(delActiveTags(this.props.index, { value }));
    }
    handleAddTags({ value }) {
        this.props.dispatch(addTags(this.props.index, { value }));
    }
    render() {
        const emptyTags = creatNDimArray(this.props.maxActive - this.props.activeTags.length, null);
        return (
            <FormItem
                label="房源标签"
                layout="top"
            >
                <div>
                    <div>
                        {
                            this.props.activeTags.map((item, index) => (
                                <Tag
                                    value={item}
                                    key={index}
                                    erasable
                                    status="active"
                                    onClick={this.handleRemoveActiveTags}
                                >{item}</Tag>
                            ))
                        }
                        {
                            emptyTags.map((item, index) => {
                                if (index === 0) {
                                    return (
                                        <TagPlaceholder active key={index} />
                                    );
                                }
                                return <TagPlaceholder key={index} />;
                            })
                        }
                    </div>
                    <div style={{ width: '732px', marginBottom: '-24px' }}>
                        {
                            this.props.tags.map((item, index) => (
                                <Tag
                                    key={index}
                                    value={item}
                                    onClick={this.handleTagClick}
                                    status={this.props.activeTags.indexOf(item) !== -1 ? 'disabled' : 'normal'}
                                >{item}</Tag>
                            ))
                        }
                        <TagAdd onAdd={this.handleAddTags} />
                    </div>
                </div>

            </FormItem>
        );
    }
}

export default ConnectContextToProps(connect(
    (state, props) => {
        const roomTag = state.houseUpload.roomInfo[props.index].roomTag;
        return {
            tags: roomTag.tags,
            activeTags: roomTag.active,
            maxActive: roomTag.maxActive,
        };
    },
)(RoomTag), {
    index: PropTypes.number,
});
