export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "e05fe4b7d4a74271b22c4b4fe9dd8030";
export const redirectUri = "http://localhost:3000/redirect";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",    // access playlist of the user
    "playlist-modify-private",  // create new playlist
 //   "playlist-read-collaborative", // access collaborative playlist of the user
    "streaming" // Web Playback SDK in the case 
];

