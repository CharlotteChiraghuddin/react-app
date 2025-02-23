import React from "react";
import AuthenticateUser from "./AuthenticateUser";

const client_id = '6961fe134cd64321ab2de3c427d3160d';
const client_secret = 'abeabc05a98245e684ff5bb8f9e81ebe';
const redirect_uri = 'http://localhost:3000/callback';
const token = 'https://accounts.spotify.com/api/token';

async function RequestAccessToken(code){

    //This is the format that is required for the request
    const combined = `${client_id}:${client_secret}`;
    //Encode the combined string in Base64
    const encoded = btoa(combined);

    //body parameters
    const body = new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      })

    //search parameters to be used in the request
    const authOptions = {
            method:'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + encoded,
              'Accept': 'application/json'
            },
            body: body.toString()
          }

    //checks if we have already gotten a refresh token, if we do, this does not need to run again.
        try{
            const response = await fetch(token,authOptions);

            if(!response.ok){
                throw new Error('Http error:',response.status);
            }

            const data = await response.json();
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("access_token", data.access_token);

        }catch(error){
            console.error(error);
        }
}   

export default RequestAccessToken;