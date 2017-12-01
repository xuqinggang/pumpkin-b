const keyPrefix = 'nangua';
const getKey = key => (`${keyPrefix}-${key}`);

const localStorage = {
    get(key, returnRaw) {
        const str = window.localStorage.getItem(getKey(key));
        if (str) {
            const meta = JSON.parse(str);
            if (returnRaw) {
                return meta;
            }
            return meta.value;
        }
    },
    set(key, value, options = {}) {
        if (value === undefined) return;
        const prev = this.get(key, true);
        let meta;
        if (prev === undefined) {
            meta = {
                value,
                options,
                createTime: Date.now(),
            };
        } else {
            meta = {
                ...prev,
                value,
                options,
                updateTime: Date.now(),
            };
        }
        window.localStorage.setItem(getKey(key), JSON.stringify(meta));
    },
    clear(key) {
        if (key) {
            window.localStorage.removeItem(getKey(key));
        } else {
            window.localStorage.clear();
        }
    },
};

export default localStorage;
