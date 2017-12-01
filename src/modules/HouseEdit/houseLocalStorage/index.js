import localStorage from 'utils/localStorage';

const houseLocalStorage = (key => ({
    set(value) {
        localStorage.set(key, value);
    },
    get() {
        return localStorage.get(key);
    },
    clear() {
        localStorage.clear(key);
    },
}))('houseState');

export default houseLocalStorage;
