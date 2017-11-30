import { h, Component } from 'preact';

import 'url-search-params-polyfill';

import './LinkInfo.scss';



export default class LinkInfo extends Component {

    constructor(props) {
        super(props);
    }

    copyToClipboard = (code) => {

        this.widgetCodeBlock.value = code;

        this.widgetCodeBlock.select();

        this.props.addMessage('Cсылка скопирована в буфер обмена');

        document.execCommand("Copy");

    }

    render({ id, merchantAlias}, {}){

        const url = 'https://my.qiwi.com/';

        const link = `${url}${merchantAlias}`;


        return (<div class="link-info" id={id}>
            <h3 class="link-info__title"><a href={`#${id}`}></a></h3>

            <textarea class="link-info__code-textarea" ref={ c => this.widgetCodeBlock = c }></textarea>

            <div class="link-info__link-text">{link}</div>

            <button type="button" class="link-info__get-code-button" onClick={() => {
                    this.copyToClipboard(link);

                     dataLayer.push({
                        'event': 'copy.code',
                        'eventAction': `Code of ${id} link copied`
                    });
                }} > &lt;/&gt; Скопировать ссылку</button>
        </div>);
    }
}
