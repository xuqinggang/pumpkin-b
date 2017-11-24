import axios from 'axios';

export const showStatusChangeDialog = (statusType, onConfirm) => ({
    statusType,
    onConfirm,
    type: 'houseManage-showStatusChangeDialog',
});

export const hideStatusChangeDialog = () => ({
    type: 'houseManage-hideStatusChangeDialog',
});

export const sortListByTime = value => ({
    value,
    type: 'houseManage-sortListByTime',
});

export const filterListBy = (filterType, value) => ({
    filterType,
    value,
    type: 'houseManage-filterListBy',
});

export const changePage = (curPage, totalPage) => ({
    curPage,
    totalPage,
    type: 'houseManage-changePage',
});

export const updateHouseManageList = houseList => ({
    houseList,
    type: 'houseManage-updateHouseManageList',
});

export const updateRentalUnitStatus = (houseId, rentUnitId, status) => ({
    houseId,
    rentUnitId,
    status,
    type: 'houseManage-updateRentalUnitStatus',
});

export const deleteHouse = houseId => ({
    houseId,
    type: 'houseManage-deleteHouse',
});

export const fetchHouseManageList = (
{
    village,
    rentalType,
    roomStatus,
    isSortByTime,
    curPage,
}) => (dispatch) => {
    const prePage = 20;
    const params = {
        ...(village === 'ALL' ? {} : { blockId: village }),
        ...(rentalType === 'ALL' ? {} : { type: rentalType }),
        ...(roomStatus === 'ALL' ? {} : { status: roomStatus }),
        sortedByBlock: isSortByTime,
        offset: (curPage - 1) * prePage,
        limit: prePage,
    };

    // blockId int: 选传，社区ID
    // type enum : 选传，出租类型
    // status enum： 选传，房源状态
    // sortedByBlock bool: 选传，是否按小区创建时间排序
    // offset int : 选传，默认为0
    // limit int : 选传默认为全部(large int)
    axios.get('/v1/houseStatus', {
        params,
    })
    .then((res) => {
        const { total, houses } = res.data.data;

        // transform be to fe
        const houseCorrList = houses.map(item => ({
            id: item.id,
            block: {
                id: item.blockId,
                name: item.blockName,
            },
            rentalType: item.rentalType,
            houseAddress: {
                buildNo: item.buildingNum,
                unitNo: item.unitNum,
                houseNo: item.houseNum,
            },
            rentUnits: item.rentUnits.map(unitItem => ({
                id: unitItem.id,
                status: unitItem.status,
            })),
            createTime: item.createTime,
        }));
        dispatch(sortListByTime(isSortByTime));
        dispatch(filterListBy('village', village));
        dispatch(filterListBy('rentalType', rentalType));
        dispatch(filterListBy('roomStatus', roomStatus));
        dispatch(changePage(curPage, Math.ceil(total / prePage)));
        dispatch(updateHouseManageList(houseCorrList));
    });
};
