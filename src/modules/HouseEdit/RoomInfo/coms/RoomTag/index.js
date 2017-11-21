import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import ConnectContextToProps from 'components/ConnectContextToProps/index';
import Tag, { TagPlaceholder } from 'components/Tag/index';
import { activeTags, delActiveTags } from '../../actions';

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
        if (this.props.activeTagValues.length >= this.props.maxActive) {
            return;
        }
        this.props.dispatch(activeTags(this.props.roomId, { value }));
    }
    handleRemoveActiveTags({ value }) {
        this.props.dispatch(delActiveTags(this.props.roomId, { value }));
    }
    render() {
        const emptyTags = creatNDimArray(
            this.props.maxActive - this.props.activeTagValues.length,
            null,
        );

        const tagValues = this.props.tags.map(item => (item.value));
        return (
            <FormItem
                label="房源标签"
                layout="top"
            >
                <div>
                    <div>
                        {
                            this.props.activeTagValues.map(tagValue => (
                                <Tag
                                    value={tagValue}
                                    key={tagValue}
                                    erasable
                                    status="active"
                                    onClick={this.handleRemoveActiveTags}
                                >{this.props.tags[tagValues.indexOf(tagValue)].text}</Tag>
                            ))
                        }
                        {
                            emptyTags.map((item, index) => {
                                if (this.props.activeTagValues.length === 0 && index === 0) {
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
                                    value={item.value}
                                    onClick={this.handleTagClick}
                                    status={this.props.activeTagValues.indexOf(item.value) !== -1 ? 'disabled' : 'normal'}
                                >{item.text}</Tag>
                            ))
                        }
                    </div>
                </div>

            </FormItem>
        );
    }
}

export default ConnectContextToProps(connect(
    (state, props) => {
        const roomInfo = state.houseUpload.roomInfo;
        const roomIds = roomInfo.map(item => (item.roomId));
        const roomTag = roomInfo[roomIds.indexOf(props.roomId)].roomTag;

        const { allTag, maxActiveTagNum } = state.houseUpload.roomTags;
        return {
            tags: allTag,
            activeTagValues: roomTag.active,
            maxActive: maxActiveTagNum,
        };
    },
)(RoomTag), {
    roomId: PropTypes.number,
});
