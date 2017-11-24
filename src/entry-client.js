import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'pumpkin-font-b';

import App from './App';
import routes from './routes';
import reducers from './reducers';

const initialState = window.__INITIAL_STATE__;
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
