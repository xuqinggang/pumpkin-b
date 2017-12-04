import axios from 'axios';

export const passportOffline = () => ({
    type: 'passport.offline',
});

export const passportOnline = () => ({
    type: 'passport.online',
});

export const passportInfo = userInfo => ({
    userInfo,
    type: 'passport.passportInfo',
});

export const clearPassportInfo = () => ({
    type: 'passport.clearPassportInfo',
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
    axios.post('v1/user/phone', {
        phone,
        vcode,
    })
    .then((res) => {
        // TODO
        if (res.code === 200) {
            dispatch(passportSetPhone(phone));
        }
    });
};

export const login = () => (dispatch) => {
    dispatch(passportOnline());
};

export const logout = () => (dispatch) => {
    document.cookie.split(';').forEach((c) => {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=' + ${new Date().toUTCString()};path=/`);
    });
    dispatch(passportOffline());
    dispatch(clearPassportInfo());
};

export const passportStatus = ({ onLine, offLine } = {
    onLine: () => {},
    offLine: () => {},
}) => (dispatch) => {
    axios.get('v1/user')
    .then((res) => {
        if (res.data.code === 200) {
            const {
                username,
                phone,
                isCentralizedOwner,
                apartment,
            } = res.data.data;
            dispatch(login());
            dispatch(passportInfo({
                username,
                phone,
                isCentralizedOwner,
                apartment: {
                    name: apartment.name,
                    image: apartment.image,
                    intro: apartment.intro,
                },
            }));
            onLine();
        } else {
            dispatch(logout());
            offLine();
        }
    });
};
