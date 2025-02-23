import React from "react";
import AddPlaylist from "./AddPlaylist";

async function GetUserId(){
const token = localStorage.getItem("access_token");
console.log('This is the token in Get User Id:' + token);

const data = await fetch('https://api.spotify.com/v1/me',{ method: "GET", headers: { Authorization: `Bearer ${token}` }})
const response = await data.json();
const id = response.id;
console.log(`This is the user id: ${id}`);

localStorage.setItem("userId", id);

}
export default GetUserId;