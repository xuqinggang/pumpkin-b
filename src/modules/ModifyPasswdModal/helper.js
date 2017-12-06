const errorNameMap = {
    old: 'errorOld',
    newFirst: 'errorNewFirst',
    newSecond: 'errorNewSecond',
};

export const passwdNameMap = {
    old: 'passwdOld',
    newFirst: 'passwdNewFirst',
    newSecond: 'passwdNewSecond',
};

export const errorsMap = {
    noEmpty: '密码不能空',
    passwdWrong: '密码错误',
    passwdNotEqual: '两次输入密码不一致',
};

export const getNewState = (value, name, prevState) => {
    const curErrorKey = errorNameMap[name];
    const curPasswdKey = passwdNameMap[name];

    const newState = {};

    switch (name) {
    case 'old': {
        if (!value) {
            newState[curErrorKey] = errorsMap.noEmpty;
            break;
        }

        newState[curPasswdKey] = value;
        newState[curErrorKey] = '';
        break;
    }
    case 'newFirst': {
        // 为空
        if (!value) {
            newState[curErrorKey] = errorsMap.noEmpty;
            break;
        }

        // 如果第二个新密码输入框不为空，则需要判断两次密码输入是否一致
        if (prevState.passwdNewSecond && prevState.passwdNewSecond !== value) {
            newState.errorNewSecond = errorsMap.passwdNotEqual;
        }
        newState[curPasswdKey] = value;
        newState[curErrorKey] = '';
        break;
    }
    case 'newSecond': {
        // 为空
        if (!value) {
            newState[curErrorKey] = '请再次输入新密码';
            break;
        }

        // 密码两次输入不一致
        if (prevState.passwdNewFirst !== value) {
            newState[curErrorKey] = errorsMap.passwdNotEqual;
        } else {
            newState[curErrorKey] = '';
        }

        newState[curPasswdKey] = value;
        break;
    }
    default: {
        return newState;
    }
    }

    return newState;
};
