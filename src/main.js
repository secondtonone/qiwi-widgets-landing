import { h, render } from 'preact';
import './css/style';

let root;

const run = () => {

    const App = require('./components/App').default;

    root = render(
        <App/>,
        document.body,
        root || document.getElementById('root')
    );
};

if(process.env.NODE_ENV === 'development') {
    if (module.hot) {
        require('preact/devtools');
        module.hot.accept('./components/App', run);
    }
}

run();