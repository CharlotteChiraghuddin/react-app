import React,{useEffect} from "react";
import AddPlaylist from "./AddPlaylist";

function GetUserId(){
const token = localStorage.getItem("access_token");
console.log('This is the token in Get User Id:' + token);
    useEffect(()=>{
        const  fetchUserId = async()=>{
        try{
            const authParams = {
                method: "GET", 
                headers: { Authorization: `Bearer ${token}` }
            }
            const data = await fetch('https://api.spotify.com/v1/me', authParams);
            if(!data.ok){
                throw new Error('HTTP Error: ' + data.status + data.statusText);
            }
            const response = await data.json();
            console.log(`This is the response: ${response}`);
            const id = response.id;
            console.log(`This is the user id: ${id}`);
            localStorage.setItem("userId", id);
        }catch(error){
            console.error(error.description);
        }
    }
    fetchUserId();
},[])
    
return null;
}
export default GetUserId;