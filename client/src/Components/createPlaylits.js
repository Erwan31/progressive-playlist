import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from "axios";

class CreatePlaylits extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    createPlaylits = async () => {

        const responseID = await axios.get(
                                "https://api.spotify.com/v1/me",
                                {
                                    headers: this.props.auth
                                });
        const dataID = await responseID.data;

        console.log(dataID);


        const CREATEPLAYLITSURL = `https://api.spotify.com/v1/users/${dataID.id}/playlists`;
        
        console.log("auth", this.props.auth);

        const data = {
            name: "A New Playlist",
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
        }
        catch(error){
            console.log("create playlist", error);
        };

        /*
        try{
            const response = await axios.post(
                CREATEPLAYLITSURL, 
                data,
                {
                    headers: this.props.auth,
                    'content-type': 'application/json',
                });
            console.log(response);
        }
        catch(error){
            console.log("add tracks to playlist", error);
        };
        */
    }

    render() { 
        return ( 
            <>
                <Button 
                    style={{
                        fontStyle: "bold",
                        fontSize: "20px",
                        height: "50px",
                        width: "250px",
                        borderRadius: "25px",
                        margin: "15px"
                        }} 
                    color="success" size="large"
                    onClick={() => this.createPlaylits()}>
                        Create Playlits
                </Button>
            </>
         );
    }
}
 
export default CreatePlaylits;