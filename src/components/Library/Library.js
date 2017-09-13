import { h, Component } from 'preact';

import WidgetInfo from '../WidgetInfo';

import './Library.scss';

export default class Library extends Component {

    render({widgetsLibrary}){

        const { library, types } = widgetsLibrary;

        return (<div class="library">

            {library.map((group) => {
                return (<article class="library__group">
                    <h2 class="library__title">{group.title}</h2>
                    <p class="library__description">{group.desc}</p>
                    {group.types.map((type) => {
                        return (<WidgetInfo id={type} widget={types[type]}/>);
                    })}

                </article>);
            })}

        </div>);
    }
}
