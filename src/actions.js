const testData = data => ({
    data,
    type: 'TEST_DATA',
});

const fetchTestData = () => dispatch =>
    new Promise(resolve =>
        setTimeout(() => {
            dispatch(testData({ name: 'yanhao' }));
            resolve();
        }, 1000),
    );

export default fetchTestData;
