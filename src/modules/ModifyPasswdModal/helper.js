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
        if (!value) {
            newState[curErrorKey] = errorsMap.noEmpty;
            break;
        }

        if (prevState.passwdNewSecond && prevState.passwdNewSecond !== value) {
            newState.passwdNewSecond = errorsMap.passwdNotEqual;
        }
        newState[curPasswdKey] = value;
        newState[curErrorKey] = '';
        break;
    }
    case 'newSecond': {
        if (!value) {
            newState[curErrorKey] = '请再次输入新密码';
            break;
        }

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
