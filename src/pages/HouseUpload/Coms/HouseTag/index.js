import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import { FormItem } from 'components/Form/index';
import Tag, { TagPlaceholder, TagAdd } from 'components/Tag/index';
import { activeTags, delActiveTags, addTags } from '../../HouseInfo/actions';

const creatNDimArray = (num, value) => {
    const arr = [];
    for (let i = 0; i < num; i += 1) {
        arr.push(value);
    }
    return arr;
};

class HouseTag extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleTagClick', 'handleRemoveActiveTags', 'handleAddTags');
    }
    handleTagClick({ value }) {
        this.props.dispatch(activeTags(value));
    }
    handleRemoveActiveTags({ value }) {
        this.props.dispatch(delActiveTags(value));
    }
    handleAddTags({ value }) {
        this.props.dispatch(addTags(value));
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

export default connect(
    (state) => {
        const houseTag = state.houseUpload.houseInfo.houseTag;
        return {
            tags: houseTag.tags,
            activeTags: houseTag.active,
            maxActive: houseTag.maxActive,
        };
    },

)(HouseTag);
