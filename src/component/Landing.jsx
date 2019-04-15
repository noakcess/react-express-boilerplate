import React, {Component} from 'react'
import { Router, Switch, Route } from "react-router-dom";
// import ReactDOM from 'react-dom'

import { createBrowserHistory } from 'history';

import 'Css/Landing.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Home, Gallery, Blank, Config } from 'Component/Common';

import { SystemOptions, SystemContext } from 'Context/SystemContext';

// import { CssTransition } from 'Common';
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Log = window.Log;

const routerHistory = createBrowserHistory();

//https://www.npmjs.com/package/react-parallax

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...SystemOptions,
            handleResize: this.handleResize,
            handleAction: this.handleAction,
            handleRedirect: this.handleRedirect,
        };
    }
    
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    
    componentWillMount() {
        Log.info('Landing mounted', this.state);
    }
    componentWillUnmount() {}
    handleResize = () => {
        // const el = this.Overview.current;
        const { innerWidth, innerHeight } = window;
        // Log.info({ innerWidth, innerHeight });
        this.setState({ window: { innerWidth, innerHeight }});
    };
    handleContext = ({ context }) => {
        Log.info({ context });
    };
    handleRedirect = ({ redirect }) => {
        Log.info({ redirect });
        routerHistory.push(redirect);
        this.setState({ route: redirect });
    };

    render () {
        const { App } = this.context;
        const { wallpaper } = App;  /*  extract App wallpaper and insert below */
        const { route } = this.state;
        const bg = {
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%'
        };
        // Log.info({ left });
        return (
            <React.Fragment>
                <SystemContext.Provider value={this.state}>

                    <div className='Landing d-flex justify-content-center'>
                        <div className={'LandingWrapper'}
                            style={{
                                width: 'auto',
                                margin: 45,
                                marginBottom: 40
                            }}>
                            <TransitionGroup>
                                <CSSTransition
                                    key={route}
                                    classNames="fade"
                                    timeout={300}>
                                    <Router history={routerHistory}>
                                        <Switch>
                                            <Route exact path='/' key={'/'}
                                                   render={() => { return <Home /> }}
                                            />
                                            <Route path='/gallery' key={'/gallery'}
                                                   render={() => { return <Gallery /> }}
                                            />
                                            <Route path='/blank' key={'/blank'}
                                                   render={() => { return <Blank /> }}
                                            />
                                            <Route path='/config' key={'/config'}
                                                   render={() => { return <Config /> }}
                                            />
                                        </Switch>
                                    </Router>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                        <div className={'splash'} style={bg}/>
                    </div>
                    
                </SystemContext.Provider>
            </React.Fragment>
        )
    }
}
Landing.contextType = SystemContext;
export default Landing;
