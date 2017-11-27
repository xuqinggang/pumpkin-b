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
    axios.post('url', {
        params: {
            phone,
            vcode,
        },
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

export const passportModifyPassword = ({
    oldPassword,
    newPassword,
}) => () => {
    axios.post('url', {
        params: {
            oldPassword,
            newPassword,
        },
    })
        .then((res) => {
            console.log(res);
        });
};

// 账号登录操作
export const passportLogin = formData => (dispatch) => {
    // 校验参数
    if (!formData.account) {
        alert('用户名不能为空');
        return;
    }
    if (!formData.password) {
        alert('密码不能为空');
        return;
    }

    axios.get('url', {
        params: formData,
    })
        .then((res) => {
            if (res.status === 200) {
                const data = res.body;
                if (data.ret === 0) {
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
            alert(e.message);
        });
};
