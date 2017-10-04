import { h, Component } from 'preact';

import './LibraryNav.scss';

export default class LibraryNav extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

        this.handleHashChange();

        window.addEventListener("hashchange", this.handleHashChange, false);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.handleHashChange, false);
    };

    handleHashChange = () => {
        this.setState({
            hash: location.hash
        });
    }

    render({widgetsLibrary, topForPos = 0}, {hash}){

        const { navigation, types } = widgetsLibrary;

        const posForBlock = () => {
            /*78 - отступ от верха страницы*/
            let Y = topForPos <= 0?Math.abs(topForPos)+78:0;

            /*Если появится плашка с ошибкой добавим ее высоту 86*/
            if(!this.props.public_key) {
                Y += 86;
            }

            return {
                transform: `translateY(${Y>3300?3300:Y}px)`
            };

        };

        return (<nav class="library-nav"  style={posForBlock()}>
            <ul>{navigation.map((group) => {
                return (<li class="library-nav__group">
                    <span class="library-nav__name-group">{group.name}</span>
                    <ul class="library-nav__types">{group.types.map((type)=>{

                        let anchorState = 'library-nav__type';

                        let href = `#${type}`;

                        if(href === hash) {
                            anchorState = `${anchorState} library-nav__type--selected`;
                        }

                        return (<li class={anchorState}><a href={href} onClick={(e) => {

                            this.setState({
                                hash: href
                            });


                            dataLayer.push({
                                'event': 'to.widget',
                                'eventAction': `Transition to ${types[type].name} widget by widget menu`
                            });

                        }}>{types[type].name}</a></li>);
                    })}</ul>
                </li>);
            })}</ul>
        </nav>);
    }
}