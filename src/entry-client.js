import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import routes from './routes';
import reducers from './reducers';

const store = createStore(
  reducers,
  window.__INITIAL_STATE__,
  applyMiddleware(thunk),
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
