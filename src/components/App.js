import { h, Component } from 'preact';

import 'url-search-params-polyfill';

import Header from './Header';
import About from './About';
import Widgets from './Widgets';
import MessageBox from './MessageBox';

import appSettings from './appSettings';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.appSettings = appSettings;

        this.state = {
            message: '',
            merchantName: '',
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
        } else {
            dataLayer.push({
                'event': 'publickey.error',
                'eventAction': 'No public key'
            });
        }

    }

    getMerchant = (public_key) => {

        /*let url = 'https://my.qiwi.com/partners_api/merchant_widget_info';

        if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            url = 'http://s3705.qiwi.com/partners_api/merchant_widget_info';
        }

        let param = `merchant_public_key=${this._merchantId}`;*/

        return fetch(`https://edge.qiwi.com/checkout/merchant/info?public_key=${public_key}`, {
                mode: 'cors'
            })
            .then(response => {

                if(response.status >= 400){

                    dataLayer.push({
                        'event': 'load.error',
                        'eventAction': 'Mechant info load error'
                    });

                    throw new Error('NotFoundError')
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

    analyticsHandler = (event, eventAction) => {
        dataLayer.push({
            event,
            eventAction
        });
    }

    render({},{message, merchantName, public_key}){

        const {idWidgetsBlock} = this.appSettings;

        const bfkh = public_key === '5nAq6abtyCz4tcDj89e5w7Y5i524LAFmzrsN6bQTQ3ceEvMvCq55ToeErzhxNemD6rMzCtzRx9jhV5kUUUyG2BC9sqbKjkRVuFjWXicbby5XJjUAnKNcNDdfEZ';
       
        let thankingBlock = <span>Если вы хотите получить больше информации о возможностях сотрудничества, свяжитесь с нами: <a href="mailto:widget@qiwi.com" onClick={this.analyticsHandler('make.email', 'Make email to QIWI')}>widget@qiwi.com</a></span>;

        if (bfkh) {
            thankingBlock = <span>Если вы хотите получить больше информации о возможностях сотрудничества c Фондом Константина Хабенского, свяжитесь с нами по адресу: <a href="mailto:online@bfkh.ru" onClick={this.analyticsHandler('make.email', 'Make email to partner')}>online@bfkh.ru</a></span>;
        }

        return (<div class={!public_key?'page--missed-public-key-error': ''}>
            {!public_key?<div className="error-panel"><div className="error-panel__text">Для участия в партнерской программе вам требуется получить персональную ссылку. Если у вас ее нет и вы хотели бы ее получить, свяжитесь с нами по адресу <a href="mailto:widget@qiwi.com" onClick={this.analyticsHandler('make.email', 'Make email to QIWI from error panel')}>widget@qiwi.com</a></div></div>:null}
            <Header idWidgetsBlock={idWidgetsBlock} merchantName={merchantName} public_key={public_key}/>
            <main>
                <About/>
                <Widgets {...this.appSettings} public_key={public_key} addMessage={this.addMessage}/>
                <div class="thanking">
                    <div class="thanking__text">{thankingBlock}</div>
                </div>
                <MessageBox message={message}/>
            </main>
            <footer>© 2016, КИВИ Банк (АО), лицензия ЦБ РФ № 2241</footer>
        </div>);
    }
}
