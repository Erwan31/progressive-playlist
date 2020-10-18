export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "4f5288c7f7ca4f8e995e861a262eb902";
export const redirectUri =  "http://localhost:3000/redirect"; // "https://playlits.herokuapp.com/redirect";
export const scopes = [
    //"user-top-read",
    //"user-read-currently-playing",
    //"user-read-playback-state",
    "playlist-read-private",    // access playlists of the user
    "playlist-read-collaborative", // access collaborative playlist of the user
    "playlist-modify-private",  // create new playlist
    "playlist-modify-public",
    //"streaming" // Web Playback SDK in the case 
]; 

