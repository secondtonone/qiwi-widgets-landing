import { h, Component } from 'preact';

import './MessageBox.scss';

export default class MessageBox extends Component {

    render({message}){


        return (<div class={`message-box ${message?'message-box--visible':''}`}>{message}</div>);
    }
}