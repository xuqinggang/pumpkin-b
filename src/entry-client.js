import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import routes from './routes';
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

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App route={routes[0]} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

window.__INITIAL_STATE__ = null;
