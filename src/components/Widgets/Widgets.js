import { h, render, Component } from 'preact';

import './Widgets.scss';

export default class Widgets extends Component {

    constructor() {
        super();
    }

    render(){
        return (<div class="widgets">
            <h1>Выберите нужный размер и скопируйте
код для внедрения на собственный сайт</h1>
        </div>);
    }
}