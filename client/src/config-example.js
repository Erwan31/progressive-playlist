export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "YOUR_CLIENT_ID";
export const redirectUri = "URL/redirect";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",    // access playlists of the user
    "playlist-modify-private",  // create new playlist
    "playlist-modify-public",
 //   "playlist-read-collaborative", // access collaborative playlist of the user
    "streaming" // Web Playback SDK in the case 
];

