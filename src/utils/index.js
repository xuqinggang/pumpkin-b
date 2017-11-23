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

export const str2Num = (str) => {
    if (str === '') return null;
    return Number(str);
};

export const timeSignBy = (type, timeStamp) => {
    const time = new Date(timeStamp);
    switch (type) {
    case 'day':
        return new Date(time.getFullYear(), time.getMonth(), time.getDate()).getTime();
    case 'year':
        return new Date(time.getFullYear(), 0).getTime();
    default:
        return timeStamp;
    }
};

export const timeFormat = (timeStamp) => {
    const time = new Date(timeStamp);
    const nowTime = new Date();
    if (timeSignBy('day', time) === timeSignBy('day', nowTime)) {
        return '今天';
    }
    if (timeSignBy('year', time) === timeSignBy('year', nowTime)) {
        return `${time.getMonth() + 1}月${time.getDate()}日`;
    }

    return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`;
};

export const throttle = (fn, delay) => {
    let timeHandler = null;
    return (...args) => {
        clearTimeout(timeHandler);
        timeHandler = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
