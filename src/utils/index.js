export const isNaturalNum = (str) => {
    if (/^\d{1,}$/.test(str)) {
        return Number(str) > 0;
    }
    return false;
};

export const isFloatNum = (str) => {
    if (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(str)) {
        return Number(str) > 0;
    }
    return false;
};

export const isPhoneNo = phone => (/^1[34578]\d{9}$/.test(phone));
