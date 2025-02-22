
const client_id = '6961fe134cd64321ab2de3c427d3160d';
const client_secret = 'abeabc05a98245e684ff5bb8f9e81ebe';
const redirect_uri = 'http://localhost:3000/callback';
const authorize = "https://accounts.spotify.com/authorize";


    /*Get user authorization*/
    function AuthenticateUser(){


        let url = authorize;
        url += "?client_id=" + client_id;
        url += "&response_type=code";
        url += "&redirect_uri=" + encodeURI(redirect_uri);
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-read-email";

        
        /*function handleRedirect(){
            if(window.location.search.length > 0){
                const stringQuery = window.location.search;
                const urlParams = new URLSearchParams(stringQuery);
                const newCode = urlParams.get("code");
                if(newCode){
                    setCode(newCode);
                    localStorage.setItem("code",code);
                }
            }
        }*/

        window.location.href = url; // Show Spotify's authorization screen
}
    export default AuthenticateUser;