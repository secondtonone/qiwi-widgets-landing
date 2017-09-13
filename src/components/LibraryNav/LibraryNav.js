import { h, Component } from 'preact';

import './LibraryNav.scss';

export default class LibraryNav extends Component {

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

            const Y = topForPos <= 0?Math.abs(topForPos)+78:0;

            console.log(Y);


            return {
                transform: `translateY(${Y>4800?4800:Y}px)`
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
                            anchorState += ' library-nav__type--selected';
                        }

                        return (<li class={anchorState}><a href={href} onClick={(e) => {

                            this.setState({
                                hash: href
                            });

                        }}>{types[type].name}</a></li>);
                    })}</ul>
                </li>);
            })}</ul>
        </nav>);
    }
}