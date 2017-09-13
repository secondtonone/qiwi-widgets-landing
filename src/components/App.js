import { h, Component } from 'preact';


import Header from './Header';
import About from './About';
import Widgets from './Widgets';

import appSettings from './appSettings';

export default class App extends Component {

    constructor() {
        super();

        this.appSettings = appSettings;
    }

    render(){

        const {idWidgetsBlock} = this.appSettings;

        return (<div>
            <Header idWidgetsBlock={idWidgetsBlock}/>
            <main>
                <About/>
                <Widgets {...this.appSettings}/>
                <div class="thanking">Спасибо! Вместе мы сделаем мир лучше :)</div>
            </main>
            <footer>© 2016, КИВИ Банк (АО), лицензия ЦБ РФ № 2241</footer>
        </div>);
    }
}