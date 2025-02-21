import React, {useState,useEffect} from "react";

const client_id = '6961fe134cd64321ab2de3c427d3160d';
const client_secret = 'abeabc05a98245e684ff5bb8f9e81ebe';

function TrackList({request, callback}){
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
                setAccessToken(access_token);
                }
            catch(error){
                    console.error('failed to get access token', error);
                }

    };
    async function getTrackData(){
        getAccessToken();

        console.log(accessToken)
        const searchParams = {
            method:'GET',
            headers: {'Authorization': `Bearer ${accessToken}`}
        };
        if(accessToken){
            try{
                const track = await fetch(`https://api.spotify.com/v1/search?q=${request}&type=track`,searchParams);
                if(!track.ok){
                    throw new Error(`HTTP error! status: ${track.status}`);
                }
                const trackData = await track.json();
                console.log(trackData);
            }catch(error){
                console.log(error);
            }
        }
    }
    useEffect(()=>{
        callback(results);
        getTrackData();
    }, [request]);
    

    const results='this is the result';
    /*Request will be used to search spotifies data base and will return the tracks matching the search which will then be sent to SearchResults and displayed to the user*/
    return null;
}
export default TrackList;