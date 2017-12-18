const errorNote = {
    401: '您暂时未登录，请先登录后进行操作',
    404: '抱歉，您要访问的页面不存在',
    500: '服务器繁忙，请稍后再试',
    NETWORK_ERR: '请检查网络连接',
    OTHER_ERR: '网络请求发生错误，请稍后再试',
    OTHER_SUCCESS_ERR: '未知错误', // 服务器成功返回200 但数据逻辑错误
};

export const ConvtCatchNetErrorMessage = (e) => {
    const response = e.response;
    let msg = errorNote.OTHER_ERR;
    if (!response) {
        msg = errorNote.NETWORK_ERR;
    } else if (errorNote[response.status]) {
        msg = errorNote[response.status];
    }
    return msg;
};

export default errorNote;
