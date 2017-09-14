import { h, Component } from 'preact';

import 'url-search-params-polyfill';

import './WidgetInfo.scss';

export default class WidgetInfo extends Component {

    copyToClipboard = (code) => {

        this.widgetCodeBlock.value = code;

        this.widgetCodeBlock.select();

        document.execCommand("Copy");
    }

    render({widget, id}){

        const { title, height, width, transparent, params, link} = widget;

        const iframeType = transparent? 'widget-info__iframe--bordered': '';

        const widgetUrl = 'https://widget.qiwi.com';

        const public_key = new URLSearchParams (window.location.search).get('public_key');

        params['public_key'] = public_key || '';

        const querystring = new URLSearchParams(params);

        const urlWidget = `${widgetUrl}/${link}?${querystring.toString()}`;

        const code = `<iframe width="${width}" height="${height}" src="${urlWidget}" allowtransparency="true" scrolling="no" frameborder="0"></iframe>`;


        return (<div class="widget-info" id={id}>
            <h3 class="widget-info__title"><a href={`#${id}`}>{title}</a></h3>

            <iframe width={width} height={height} src={urlWidget} allowtransparency="true" scrolling="no" frameborder="0" class={`widget-info__iframe ${iframeType}`}></iframe>

            <div class="widget-info__code" >{code}</div>

            <textarea class="widget-info__code--hidden" ref={ c => this.widgetCodeBlock = c }></textarea>

            <button type="button" class="widget-info__get-code-button" onClick={() => this.copyToClipboard(code)}> &lt;/&gt; Скопировать код</button>

        </div>);
    }
}
