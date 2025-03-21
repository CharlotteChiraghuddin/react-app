const authorize = "https://accounts.spotify.com/authorize";


    /*Get user authorization*/
    function AuthenticateUser(
        client_id = '6961fe134cd64321ab2de3c427d3160d',
        redirect_uri = 'http://localhost:3000/callback',
        state = Math.random().toString(36).substring(7)
    ){
    
    localStorage.setItem("state",state);

        let url = authorize;
        url += "?client_id=" + client_id;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI(redirect_uri);
        url += "&state=" + state; 
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-read-email playlist-modify-public playlist-modify-private";
        if (window === undefined){
            console.log('Failed to execute');
        } else{
        window.location.href = url; // Show Spotify's authorization screen
        }
        localStorage.setItem("pendingAction", "pending");
        
}
    export default AuthenticateUser;