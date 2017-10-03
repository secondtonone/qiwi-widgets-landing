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
            message: '',
            merchantName: 'Наименование организации',
            public_key: '',
            appSettings
        }
    }


    componentDidMount(){

        const self = this;

        const public_key = new URLSearchParams (window.location.search).get('public_key') || '';

        if(public_key) {

            this.setState({
                public_key
            });

            this.getMerchant(public_key).then((data) => {

                if(data.provider_name) {
                    self.setState({
                        merchantName: data.provider_name
                    });
                }
            });
        }
    }

    getMerchant = (public_key) => {

        return fetch(`https://edge.qiwi.com/checkout/merchant/info?public_key=${public_key}`, {
                mode: 'cors'
            })
            .then(response => {

                if(response.status >= 400 && response.status < 500){
                    throw new Error('NotFoundError')
                }
                if(response.status >= 500) {
                    throw new Error('ServerError')
                }
                return response;

            })
            .then(response => response.json());
    }



    addMessage = (message) => {
        this.setState({
            message
        });

        this.deleteMessage();
    }

    deleteMessage = () => {
        setTimeout(() => {
            this.setState({
                message: ''
            });
        }, 2000);
    }

    render({},{message, merchantName, public_key}){

        const {idWidgetsBlock} = this.appSettings;

        return (<div>
            <Header idWidgetsBlock={idWidgetsBlock} merchantName={merchantName}/>
            <main>
                <About/>
                <Widgets {...this.appSettings} public_key={public_key} addMessage={this.addMessage}/>
                <div class="thanking">Если вы хотите получить больше информации о возможностях сотрудничества c Фондом Константина Хабенского, свяжитесь с нами по адресу:<a href="mailto:online@bfkh.ru">online@bfkh.ru</a></div>
                <MessageBox message={message}/>
            </main>
            <footer>© 2016, КИВИ Банк (АО), лицензия ЦБ РФ № 2241</footer>
        </div>);
    }
}
