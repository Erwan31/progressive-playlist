import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from "axios";
import { Spinner } from 'reactstrap';

class CreatePlaylits extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            buttonContent: "Create Playlits",
            buttonDisable: this.props.playlistCreateEnable,
         }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.playlistCreateEnable !== prevProps.playlistCreateEnable) {
          this.setState({ buttonDisable: this.props.playlistCreateEnable});
        }
    }

    createPlaylits = async () => {

        this.setState({ buttonContent: null});

        const responseID = await axios.get(
                                "https://api.spotify.com/v1/me",
                                {
                                    headers: this.props.auth
                                });
        const dataID = await responseID.data;

        console.log(dataID);

        const CREATEPLAYLITSURL = `https://api.spotify.com/v1/users/${dataID.id}/playlists`;
        let newPlaylistID = 0;
        const tracksIDs = this.props.tracksIDs;

        let URIs= Array.from( tracksIDs, element =>
                "spotify%3Atrack%3A" + element
                );
        URIs = URIs.join(",");

        //console.log("URIs", URIs);

        const data = {
            name: "Playlits - " + this.props.name,
            public: false
        };

        try{
            const response = await axios.post(
                                    CREATEPLAYLITSURL, 
                                    data,
                                    {
                                        headers: this.props.auth,
                                        'content-type': 'application/json',
                                    });
            console.log(response);

            newPlaylistID = response.data.id;
            console.log(newPlaylistID);
        }
        catch(error){
            console.log("create playlist", error);
        };

        try{
            const ADDTRACKSURL = `https://api.spotify.com/v1/playlists/${newPlaylistID}/tracks?uris=${URIs}`;
            const response = await axios.post(
                ADDTRACKSURL,
                {},
                {
                    headers: this.props.auth,
                    'content-type': 'application/json',
                });
            console.log(response);
        }
        catch(error){
            console.log("add tracks to playlist", error);
        };

        setTimeout(this.setState({ buttonContent: "Playlits created!", buttonDisable: true}), 1000);
    }

    render() { 
        return ( 
            <>
                <Button 
                    style={{
                        fontStyle: "bold",
                        fontSize: "20px",
                        height: "50px",
                        width: "300px",
                        borderRadius: "25px",
                        boxShadow: '0px 2px 4px 0px rgba(166,82,254,0.5)'
                        }} 
                    color="success" size="large"
                    disabled={this.state.buttonDisable}
                    onClick={() => this.createPlaylits()}>
                        {this.state.buttonContent || <Spinner animation="grow" variant="light" />}
                </Button>
            </>
         );
    }
}
 
export default CreatePlaylits;