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

export const pageUrl = url => `/${url}`;

export const splitArrayWithIndex = (arr, ...args) => {
    const tempArr = [];
    Array.prototype.forEach.call(args, (item) => {
        tempArr.push(arr[item]);
    });
    return tempArr;
};

export const expandSingleNum = (num) => {
    if (num >= 0 && num <= 9) {
        return `0${num}`;
    }
    return `${num}`;
};

export const num2Str = (num) => {
    if (num === null) {
        return '';
    }
    return num.toString();
};

export const str2Num = str => (Number(str));
