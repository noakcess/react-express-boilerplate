import React, { Component } from 'react'
import { Jumbotron } from 'reactstrap'


import { SystemContext } from 'Context/SystemContext';
// import { CSSTransition } from 'Common

const Log = window.Log;

class Home extends Component {
    state = {
        isLoaded: false
    };
    
    componentDidMount() {
        this.setState({ isLoaded: true });
    }
    componentWillUnmount() {
        this.setState({ isLoaded: false });
    }
    
    render () {
        const context = this.context;
        Log.info({ context });
        return (
            <div className={'d-flex'}>
                <Jumbotron>Home</Jumbotron>
            </div>
        )
    }
}

Home.contextType = SystemContext;

export default Home;
