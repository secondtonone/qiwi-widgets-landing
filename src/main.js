import { h, render } from 'preact';
import './css/style';

const root = document.getElementById('root');


function init() {
    let App = require('./components/App.js').default;
    render(<App />,  document.body, root);
}


// in development, set up HMR:
if (module.hot) {
    //require('preact/devtools');   // turn this on if you want to enable React DevTools!
    module.hot.accept('./components/App.js', () => requestAnimationFrame(init) );
}

init();