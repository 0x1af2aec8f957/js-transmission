import React from 'react';
import ReactDOM from 'react-dom';
import App from './public/router'
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
