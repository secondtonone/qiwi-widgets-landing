import { h, render } from 'preact';
import './css/style';

let root;

function init() {
    let AppContainer = require('./containers/AppContainer.js').default;
    root = render(<AppContainer />, document.getElementById('root') , root);
}


// in development, set up HMR:
if (module.hot) {
    //require('preact/devtools');   // turn this on if you want to enable React DevTools!
    module.hot.accept('./containers/AppContainer.js', () => requestAnimationFrame(init) );
}

init();