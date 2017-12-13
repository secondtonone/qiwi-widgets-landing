import { h, Component } from 'preact';

import 'url-search-params-polyfill';

import Header from './Header';
import About from './About';
import Widgets from './Widgets';
import MessageBox from './MessageBox';
import ThankingBlock from './ThankingBlock';

import appSettings from './appSettings';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.appSettings = appSettings;

        this.state = {
            message: '',
            merchantName: '',
            merchantAlias: '',
            merchantPublicKey: '',
            merchantContact: '',
            merchantNotVeryfied: false
        }
    }


    componentDidMount(){

        const self = this;

        const merchantPublicKey = this.getPublicKey();

        const merchantAlias = this.getAlias();

        if(merchantPublicKey || merchantAlias) {

            this.getMerchant(merchantPublicKey, merchantAlias).then(data => {

                if(data.result.merchant_name) {
                    self.setState({
                        merchantName: data.result.merchant_name,
                        merchantContact: data.result.merchant_email,
                        merchantContactDesc: data.result.merchant_contacts_html,
                        merchantAlias: data.result.merchant_alias_code,
                        merchantPublicKey: data.result.merchant_public_key
                    });

                    self.changeTabTitle(data.result.merchant_name);
                }
            });
        } else {
            dataLayer.push({
                'event': 'publickey.error',
                'eventAction': 'No public key'
            });
        }

    }

    getAlias  = () => {
        return window.location.pathname.match(/([^\/]*)\/*$/)[1];
    }

    getPublicKey = () => {
        return new URLSearchParams (window.location.search).get('public_key') || '';
    }


    getMerchant = (merchantPublicKey, merchantAlias) => {

        const self = this;

        let url = 'https://my.qiwi.com/partners_api/merchant_info';

        if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            url = 'http://s3705.qiwi.com/partners_api/merchant_info';
        }

        let param = `merchant_public_key=${merchantPublicKey}`;


        if(merchantAlias && !merchantPublicKey) {
            param = `merchant_alias_code=${merchantAlias}`;
        }

        return fetch(`${url}?${param}`, {
                mode: 'cors'
            })
            .then(response => {

                if(response.status >= 400){

                    self.setState({
                        merchantNotVeryfied: true
                    });

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

    changeTabTitle = (title) => {
        document.title = title;
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

    render({},{message, merchantName, merchantPublicKey, merchantAlias, merchantContact, merchantContactDesc, merchantNotVeryfied}){

        const {idWidgetsBlock} = this.appSettings;

        const qiwiEmail = 'widget@qiwi.com';

        const qiwiContactDesc = 'Если вы хотите получить больше информации о возможностях сотрудничества, свяжитесь с нами:';

        return (<div class={merchantNotVeryfied?'page--missed-public-key-error': ''}>
            {merchantNotVeryfied?<div className="error-panel"><div className="error-panel__text">Для участия в партнерской программе вам требуется получить персональную ссылку. Если у вас ее нет и вы хотели бы ее получить, свяжитесь с нами по адресу <a href="mailto:widget@qiwi.com" onClick={this.analyticsHandler('make.email', 'Make email to QIWI from error panel')}>widget@qiwi.com</a></div></div>:null}
            <Header idWidgetsBlock={idWidgetsBlock} merchantName={merchantName} public_key={merchantPublicKey}/>
            <main>
                <About/>
                <Widgets {...this.appSettings} public_key={merchantPublicKey} merchantAlias={merchantAlias} addMessage={this.addMessage}/>
                <div class="thanking">
                    <div class="thanking__text">
                        <ThankingBlock email={merchantContact || qiwiEmail} contactDesc={merchantContactDesc || qiwiContactDesc} onClick={this.analyticsHandler('make.email', 'Make email from thanking block')}/>
                    </div>
                </div>
                <MessageBox message={message}/>
            </main>
            <footer>© 2016, КИВИ Банк (АО), лицензия ЦБ РФ № 2241</footer>
        </div>);
    }
}
