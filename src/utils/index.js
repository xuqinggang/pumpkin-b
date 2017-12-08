export const isNaturalNum = (str) => {
    if (/^\d{1,}$/.test(str)) {
        return Number(str) > 0;
    }
    return false;
};

export const isFloatNum = (str, exact) => {
    if (exact) {
        return /^[+-]?\d{0,}[.]{1}\d{1,}$/.test(str);
    }
    return str !== '' && !isNaN(Number(str)) && Number(str) >= 0;
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
    case 'date':
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
    if (timeSignBy('date', time) === timeSignBy('date', nowTime)) {
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

export const decodeQuerySting = (str) => {
    const qs = str.startsWith('?') ? str.substr(1) : str;
    const obj = {};
    qs.split('&').forEach((part) => {
        const pair = part.split('=');
        if (pair.length === 2) {
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    });
    return obj;
};

export const encodeQueryString = (obj) => {
    const pairs = [];
    Object.keys(obj).forEach(key => (
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    ));
    return pairs.join('&');
};
