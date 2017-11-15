const events = {};
const Monitor = {
    listen: (key, fn) => {
        if (!typeof key === 'string' || !typeof fn === 'function') {
            throw Error('监听事件参数错误');
        }
        if (!events[key]) {
            // 事件注册
            events[key] = [];
        }
        events[key].push(fn);
    },
    trigger: (...args) => {
        const key = args[0];
        const extraArgs = [].slice.call(args, 1);

        (events[key] || []).forEach((item) => {
            item(...extraArgs);
        });
    },
};

export default Monitor;
