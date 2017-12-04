import axios from 'axios';

export const passportOffline = () => ({
    type: 'passport.offline',
});

export const passportOnline = userInfo => ({
    userInfo,
    type: 'passport.online',
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
            } else {
                alert(res.msg);
            }
        });
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
            dispatch(passportOnline({
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
            dispatch(passportOffline());
            offLine();
        }
    });
};
