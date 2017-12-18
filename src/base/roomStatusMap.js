import { splitArrayWithIndex } from 'utils/index';

const operates = [
    {
        type: 'PUBLISHED',
        text: '发布',
    }, {
        type: 'OCCUPIED',
        text: '入住',
    }, {
        type: 'OFFLINE',
        text: '下架',
    }, {
        // 目前需求不做
        type: 'DELETE',
        text: '删除',
    }, {
        type: 'SHARE',
        text: '分享',
    }];
const roomStatusMap = {
    FINISHED: {
        text: '待发布',
        operates: splitArrayWithIndex(operates, 0),
    },
    PUBLISHED: {
        text: '已发布',
        operates: splitArrayWithIndex(operates, 1, 2, 4),
    },
    OCCUPIED: {
        text: '已入住',
        operates: splitArrayWithIndex(operates, 0),
    },
    OFFLINE: {
        text: '已下架',
        operates: splitArrayWithIndex(operates, 0),
    },
    UNKNOWN: {
        text: '未知状态',
        operates: [],
    },
};

export const roomStatusList = ['FINISHED', 'PUBLISHED', 'OCCUPIED', 'OFFLINE'];
export default roomStatusMap;
