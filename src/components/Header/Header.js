import { h, Component } from 'preact';

import './Header.scss';

import logo from './assets/qiwi-logo.svg'
import widgetPic from './assets/widget-pic.png'

/*<a href={'/?public_key='+public_key} class="header__logo"><img src={logo} alt="logo" width="140" height="61" /></a>*/

export default class Header extends Component {

    render({idWidgetsBlock, merchantName, public_key}){

        const defaultMerchantName = 'Наименование организации';

        return (<header class="header">
            <div className="header__gradient-block-top"></div>
            <div className="header__gradient-block-bottom"></div>

            <section class="header__call-to-action">
                <h1 class="header__title">Привлеки своих пользователей, покупателей и читателей к добрым делам!</h1>
                <p class="header__description">{merchantName?`Размести платежную форму у себя на сайте и поддержи ${merchantName}.`:'Размести платежную форму у себя на сайте и поддержи благотворительность.'}</p>
                <a href={`#${idWidgetsBlock}`} class="header__action" onClick={() => {
                    dataLayer.push({
                        'event': 'to.widgets',
                        'eventAction': 'Transition to widgets block'
                    });
                }}>Разместить виджет</a>
            </section>
            <div class="header__illustration">
                <img src={widgetPic} alt="widgets" width="480" height="720" class="header__widgets-pic"/>
                <div class="header__widget-title">{ merchantName || defaultMerchantName}</div>
                <div class="header__widget-button">Помочь</div>
                <div class="header__widget-title header__widget-title--second">{ merchantName || defaultMerchantName}</div>
            </div>
        </header>);
    }
}
