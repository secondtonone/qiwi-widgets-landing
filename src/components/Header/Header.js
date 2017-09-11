import { h, render, Component } from 'preact';

import './Header.scss';

export default class Header extends Component {

    constructor() {
        super();
    }

    render(){
        return (<header class="header">
            <h1 class="header__title">Есть страничка или сайт? Ты можешь помочь!</h1>
            <p class="header__description">Размести платежную форму у себя на сайте и твори добро во благо</p>
            <a href="#widgets" class="header__call-to-action">Разместить</a>
        </header>);
    }
}