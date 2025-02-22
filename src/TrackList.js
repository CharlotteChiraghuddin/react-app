import React, {useState,useEffect} from "react";

const client_id = '6961fe134cd64321ab2de3c427d3160d';
const client_secret = 'abeabc05a98245e684ff5bb8f9e81ebe';

function TrackList({request, callback, shareToken}){
    const [accessToken,setAccessToken]=useState('');
    /*Obtain spotify access token*/
    async function getAccessToken(){
        const UrlParams = {
                method:'POST',
                header:'Content-Type: application/x-www-form-urlencoded',
                /*URLSearchParams helps to format the body parameters as a URL-encoded string. This is required by many API endoints*/
                body:new URLSearchParams({  grant_type: 'client_credentials',
                        client_id: client_id,
                        client_secret: client_secret
                })
            };
        
            try{
                const response= await fetch("https://accounts.spotify.com/api/token",UrlParams)
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data= await response.json();
                const access_token = data.access_token;
                return access_token;
                }
            catch(error){
                    console.error('failed to get access token', error);
                }

    };
    /*use the access token to obtaint the track data using the request from the user*/
    async function getTrackData(token){
        const searchParams = {
            method:'GET',
            headers: {'Authorization': `Bearer ${token}`}
        };
        if(token){
            try{
                const track = await fetch(`https://api.spotify.com/v1/search?q=${request}&type=track`,searchParams);
                if(!track.ok){
                    throw new Error(`HTTP error! status: ${track.status}`);
                }
                const trackData = await track.json();
                callback(trackData.tracks.items);
            }catch(error){
                console.log(error);
            }

        }
    }
/*useEffect hook listens for a new request and triggers the function below*/
    useEffect(() => {
        if (request) {
          (async () => {
            /*await ensure the getAccessToken has completed before continuing*/
            const token = await getAccessToken();
            /*checks token was recieved*/
            if (token) {
                /*runs getTrackData*/
              await getTrackData(token);
            }
          })();
        }
      }, [request]);
   
    
    /*Request will be used to search spotifies data base and will return the tracks matching the search which will then be sent to SearchResults and displayed to the user*/
    return null;
}
export default TrackList;