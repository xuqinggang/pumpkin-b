import initData from '../coms/initData/index';

// 负责页面HouseDeploy 和 HousePics 的数据管理
const chamberInfo = (state = initData('chamberInfo'), action) => {
    switch (action.type) {
    case 'house-upload.chamber-info.uploadPics': {
        const name = action.name;
        const coords = action.coords;
        const picUrl = action.picUrl;
        const list = [].concat(state[name]);

        const roomPic = state[name][coords[0]];
        const picUrls = [].concat(roomPic.picUrls);
        picUrls.push(picUrl);

        list[coords[0]] = {
            ...roomPic,
            picUrls,
        };
        return {
            ...state,
            [name]: list,
        };
    }
    case 'house-upload.chamber-info.removePics': {
        const {
            name,
            coords,
        } = action;
        const list = [].concat(state[name]);

        const roomPic = state[name][coords[0]];
        const picUrls = [].concat(roomPic.picUrls);
        picUrls.splice(coords[1], 1);

        list[coords[0]] = {
            ...roomPic,
            picUrls,
        };
        return {
            ...state,
            [name]: list,
        };
    }
    case 'house-upload.chamber-info.addDeploys': {
        const name = action.name;
        const coords = action.coords;
        const value = action.value;
        const list = [].concat(state[name]);

        const chamberDeploys = state[name][coords[0]];
        const deploys = [].concat(chamberDeploys.deploys);
        deploys.push(value);

        list[coords[0]] = {
            ...chamberDeploys,
            deploys,
        };
        return {
            ...state,
            [name]: list,
        };
    }
    case 'house-upload.chamber-info.removeDeploys': {
        const {
            name,
            coords,
        } = action;
        const list = [].concat(state[name]);

        const chamberDeploys = state[name][coords[0]];
        const deploys = [].concat(chamberDeploys.deploys);
        deploys.splice(coords[1], 1);

        list[coords[0]] = {
            ...chamberDeploys,
            deploys,
        };
        return {
            ...state,
            [name]: list,
        };
    }
    default:
        return state;
    }
};

export default {
    chamberInfo,
};
