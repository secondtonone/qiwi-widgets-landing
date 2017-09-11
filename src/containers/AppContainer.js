import { h, render, Component } from 'preact';


import Header from '../components/Header';
import About from '../components/About';
import Widgets from '../components/Widgets';

export default class AppContainer extends Component {

    constructor() {
        super();
    }

    render(){
        return (<div>
            <Header/>
            <About/>
            <Widgets/>
            <div class="thanking">Спасибо! Вместе мы сделаем мир лучше :)</div>
            <footer>© 2016, КИВИ Банк (АО), лицензия ЦБ РФ № 2241</footer>
        </div>);
    }
}