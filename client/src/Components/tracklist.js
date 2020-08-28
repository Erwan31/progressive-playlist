import React, { Component } from 'react';
import axios from 'axios';

class TrackList extends Component {
    constructor(props){
        super(props);

        this.state = {
            tracks: []
        };
    }

    async componentDidMount() {
        // Get up to 100 tracks from playlist 
        const token = this.props.token;
        const response = await axios.get('');
        const data = await response.data;
        console.log('tracklist', data);
           
    }

    render() { 

        console.log('render tracklist', this.props);
        return ( 
            <div>
                Tracklist
            </div>
         );
    }
}
 
export default TrackList;