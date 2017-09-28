import { h, Component } from 'preact';

import 'url-search-params-polyfill';

import Header from './Header';
import About from './About';
import Widgets from './Widgets';
import MessageBox from './MessageBox';

import appSettings from './appSettings';

export default class App extends Component {

    constructor() {
        super();

        this.appSettings = appSettings;

        this.state = {
            message: ''
        }
    }


    addMessage = (message) => {
        this.setState({
            message
        });

        setTimeout(() => {
            this.setState({
                message: ''
            });
        }, 2000);
    }

    render({},{message}){

        const public_key = new URLSearchParams (window.location.search).get('public_key') || '';

        this.appSettings['public_key'] = public_key;

        this.appSettings.addMessage = this.addMessage;

        const {idWidgetsBlock} = this.appSettings;

        return (<div>
            <Header idWidgetsBlock={idWidgetsBlock} public_key={public_key}/>
            <main>
                <About/>
                <Widgets {...this.appSettings}/>
                <div class="thanking">Остались вопросы? Пишите на <a href="mailto:widget@qiwi.com">widget@qiwi.com</a></div>
                <MessageBox message={message}/>
            </main>
            <footer>© 2016, КИВИ Банк (АО), лицензия ЦБ РФ № 2241</footer>
        </div>);
    }
}