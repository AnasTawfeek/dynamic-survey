import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'

ReactDOM.render(  <Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <App />
        </div>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
