import { h, Component } from 'preact';

import './Header.scss';

import logo from './assets/qiwi-logo.svg'
import widgetPic from './assets/widget-pic.svg'

export default class Header extends Component {

    render({idWidgetsBlock, merchantName}){

        return (<header class="header">
            <a href="/" class="header__logo"><img src={logo} alt="logo" width="140" height="61" /></a>
            <section class="header__call-to-action">
                <h1 class="header__title">Привлеки своих пользователей, покупателей и читателей к добрым делам!</h1>
                <p class="header__description">Размести платежную форму у себя на сайте и поддержи Фонд Константина Хабенского.</p>
                <a href={`#${idWidgetsBlock}`} class="header__action">Разместить виджет</a>
            </section>
            <div class="header__illustration">
                <img src={widgetPic} alt="widgets" width="480" height="720"/>
                <div class="header__widget-title">{ merchantName }</div>
                <div class="header__widget-title header__widget-title--second">{ merchantName }</div>
            </div>
        </header>);
    }
}
