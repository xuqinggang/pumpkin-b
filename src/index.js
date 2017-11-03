import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import reducers from './reducers';

const initialState = window.INITIAL_STATE;
const middleware = [thunk];
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
