import React, {Component} from 'react'
import { Jumbotron } from 'reactstrap'


import { SystemContext } from 'Context/SystemContext';
// import { } from 'Service/Common';
const Log = window.Log;

class Gallery extends Component {
    render () {
        const context = this.context;
        Log.info('Gallery', { context });
        return (
            <div className={'d-flex'}>
                <Jumbotron>Gallery</Jumbotron>
            </div>
        )
    }
}

Gallery.contextType = SystemContext;

export default Gallery;
