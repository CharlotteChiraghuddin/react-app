import React,{useEffect} from "react";
import AddPlaylist from "./AddPlaylist";
const client_id = '6961fe134cd64321ab2de3c427d3160d';
const client_secret = 'abeabc05a98245e684ff5bb8f9e81ebe';

 //This is the format that is required for the request
 const combined = `${client_id}:${client_secret}`;
 //Encode the combined string in Base64
 const encoded = btoa(combined);

function GetUserId(){
  
    const token = localStorage.getItem("access_token");
    console.log('This is the token in Get User Id:' + token);
    const userID = localStorage.getItem("userId")
    console.log(userID);
        useEffect(()=>{
            const userID = localStorage.getItem("userId");
            const  fetchUserId = async()=>{
                try{
                    const authParams = {
                        method: "GET", 
                        headers: { Authorization: `Bearer ${token}` }
                    }
                    const data = await fetch('https://api.spotify.com/v1/me', authParams);

                    const response = await data.json();
                    console.log(response);
                    /*checking if the access token has expired, if it has, we will use the refresh token to request a new token*/
                    
                    if(response.error && response.error.message === "The access token expired"){
                        const refresh_token = localStorage.getItem("refresh_token");
                        
                        const refreshParams = {
                            method: 'POST',
                            headers:{'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization': 'Basic '+ encoded
                            },
                            body: new URLSearchParams({
                                grant_type: 'refresh_token',
                                refresh_token: refresh_token,
                                client_id: client_id
                            })
                        }
                        try{
                        const data = await fetch('https://accounts.spotify.com/api/token', refreshParams);
                            if(!data.ok){
                                throw new Error('HTTP Error: ' + data.status);
                            }
                            const response = await data.json();
                            const newToken = response.access_token;
                            const newRefreshToken = response.refresh_token;

                            console.log('This is the new token'+ newToken);
                            localStorage.setItem("access_token", newToken);
                            localStorage.setItem("refresh_token", newRefreshToken);

                            /*try again to fetch the user id with the new access token*/
                            const authParams = {
                                method: "GET", 
                                headers: { Authorization: `Bearer ${newToken}` }
                            }
                            try{
                                const userData = await fetch('https://api.spotify.com/v1/me', authParams);

                                if(!userData.ok){
                                    throw new Error('HTTP Error requesting user data with new access token: ' + userData.status);
                                }
                                const response = await userData.json();
                                const userId = response.id;

                                localStorage.setItem("userId", userId);
                                
                            }catch(error){
                                console.error('Failed to retrieve the user data with the new access token: ' + error);
                        }
                        }catch(error){
                            console.error(error);
                        }
                        
                        return null;
                    };

                    if(!data.ok){
                        throw new Error('HTTP Error: ' + data.status + data.statusText);
                    }
                    
                    console.log(`This is the response: ${response}`);
                    const id = response.id;
                    console.log(`This is the user id: ${id}`);
                    localStorage.setItem("userId", id);
                }catch(error){
                    console.error('Failed to fetch user id: ' + error);
                }
            }
            if(!userID){
                fetchUserId();
            }
    },[])
        
   
}
export default GetUserId;