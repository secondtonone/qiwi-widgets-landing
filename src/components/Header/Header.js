import { h, Component } from 'preact';

import './Header.scss';

import logo from './assets/qiwi-logo.svg'
import widgetPic from './assets/widget-pic.png'

export default class Header extends Component {
    render({idWidgetsBlock}){
        return (<header class="header">
            <a href="/" class="header__logo"><img src={logo} alt="logo" width="140" height="61" /></a>
            <section class="header__call-to-action">
                <h1 class="header__title">Есть страничка или сайт? Ты можешь помочь!</h1>
                <p class="header__description">Размести платежную форму у себя на сайте и твори добро во благо</p>
                <a href={`#${idWidgetsBlock}`} class="header__action">Разместить</a>
            </section>
            <img src={widgetPic} alt="widgets" class="header__illustration" width="480" height="720"/>
        </header>);
    }
}