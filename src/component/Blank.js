import React, {Component} from 'react'
import { Jumbotron } from 'reactstrap'

import { SystemContext } from 'Context/SystemContext';

// import { } from 'Service/Common';
const Log = window.Log;

class Blank extends Component {
    render () {
        const context = this.context;
        Log.info('Blank', { context });
        return (
            <div className={'d-flex'}>
                <Jumbotron>Blank</Jumbotron>
            </div>
        )
    }
}

Blank.contextType = SystemContext;

export default Blank;
