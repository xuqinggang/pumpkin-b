import axios from 'axios';

export const passportOffline = () => ({
    type: 'passport.offline',
});

export const passportOnline = ({
    userName,
    phone,
}) => ({
    userName,
    phone,
    type: 'passport.online',
});

export const passportSetPhone = ({
    phone,
}) => ({
    phone,
    type: 'passport.setphone',
});

export const passportModifyPhone = ({
    vcode,
    phone,
}) => (dispatch) => {
    axios.post('v1/user/phone', {
        phone,
        vcode,
    })
        .then((res) => {
            // TODO
            if (res.code === 200) {
                dispatch(passportSetPhone(phone));
            } else {
                alert(res.msg);
            }
        });
};

/* export const passportModifyPassword = ({
 *     oldPassword,
 *     newPassword,
 * }) => () => {
 *     axios.post('url', {
 *         params: {
 *             oldPassword,
 *             newPassword,
 *         },
 *     })
 *         .then((res) => {
 *             console.log(res);
 *         });
 * }; */
export const passportStatus = () => (dispatch) => {
    axios.get('v1/user/info')
    .then((res) => {
        dispatch(passportOnline({
            userName: res.body.data.username,
            verificationType: res.body.data.verification_type,
            verificationStatus: res.body.data.verification_status,
            inWhiteList: res.body.data.in_white_list,
        }));
    }).catch((e) => {
        if (e.code === 6 || e.code === 3) {
            dispatch(passportOffline());
        } else {
            // TODO
        }
    });
};

// 账号登录操作
export const passportLogin = (formData, callbacks) => (dispatch) => {
    // 校验参数
    if (!formData.userName) {
        alert('用户名不能为空');
        return;
    }
    if (!formData.password) {
        alert('密码不能为空');
        return;
    }

    axios.post('/v1/user/login', {
        userName: formData.userName,
        password: formData.password,
    })
        .then((res) => {
            if (res.data.status === 200) {
                const data = res.body;
                if (data.ret === 0) {
                    if (callbacks.success) {
                        callbacks.success();
                    }
                    dispatch(passportOnline({
                        userName: '张三',
                        phone: '133333333',
                    }));
                } else {
                    alert(data.msg);
                }
            }
        })
        .catch((e) => {
            if (callbacks.error) {
                callbacks.error(`网络错误: ${e.message}`);
            }
        });
};
