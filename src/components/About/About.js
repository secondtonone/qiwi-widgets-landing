import { h, render, Component } from 'preact';

import './About.scss';

export default class About extends Component {

    constructor() {
        super();
    }

    render(){
        return (<div class="about">
            <h1>Разнообразие форматов отображения.
Простота установки.</h1>
        </div>);
    }
}