import React from 'react';
import axios from 'axios';
import { valueType } from 'base/types';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Content from 'components/Content';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import { expandSingleNum } from 'utils';
import RentalUnitQRCode from 'modules/RentalUnitQRCode/index';
import './style.less';

class ShareRentalUnit extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            shareUnits: [],
        };
        this.autoBind('handleReturnBack');
    }
    handleReturnBack() {
        this.props.history.push('/house-manage');
    }
    componentDidMount() {
        axios.get(`/v1/houses/${this.props.houseId}/houseStatus`)
        .then((res) => {
            if (res.data.code === 200) {
                return res.data.data
                    .map((item, index) => ({
                        index,
                        id: item.id,
                        status: item.status,
                    }))
                    .filter(item => (item.status === 'PUBLISHED'));
            }
        })
        .then((list) => {
            if (!list) return;
            const params = new URLSearchParams();
            list.forEach((item) => {
                params.append('rentUnitIds', item.id);
            });
            return axios.get('/v1/rentUnit/shareUrls', { params })
                .then((res) => {
                    if (res.data.code === 200) {
                        const urlList = res.data.data.shareUrls;
                        return list.map((item, index) => ({
                            ...item,
                            url: urlList[index],
                        }));
                    }
                });
        })
        .then((list) => {
            this.setState({
                shareUnits: list,
            });
        });
    }

    render() {
        const clsPrefix = 'm-share-rental-unit';
        return (
            <Content>
                <div className={`${clsPrefix}--titles`}>
                    <h2 className={`${clsPrefix}--title`}>房源{this.props.title}</h2>
                    <span className={`${clsPrefix}--subTitle`}>你可以去{this.props.subTitle}啦~ </span>
                </div>
                <div className={`${clsPrefix}--units`}>
                    {
                        this.state.shareUnits.map(item => (
                            <RentalUnitQRCode
                                key={item.id}
                                title={`卧室${expandSingleNum(item.index + 1)}`}
                                url={item.url}
                            />
                        ))
                    }
                </div>
                <div>
                    <Button
                        className={`${clsPrefix}--btn`}
                        onClick={this.handleReturnBack}
                        size="huge"
                    >返回房源管理</Button>
                </div>
            </Content>
        );
    }
}

ShareRentalUnit.propTypes = {
    houseId: valueType.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
};

export default withRouter(ShareRentalUnit);
