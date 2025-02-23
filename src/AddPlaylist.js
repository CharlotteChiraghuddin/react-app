async function AddPlaylist({playlistName}){
    //retrieving the access token and id from local storage
    const token = localStorage.getItem("access_token");
    const id = localStorage.getItem("userId");

    //auth parameters set up to perform request
    const authParams = {
        method:"POST",
        headers:{
            'Authorization': 'Bearer '+ token,
            'Content-Type': "application/json"
        },
        body:
            JSON.stringify({name :playlistName}),
    }

    try{
    const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`,authParams);

    //if response is not okay, an error will be thrown which will stop the process
    if(!createPlaylist){
        throw new Error(`Error: ${createPlaylist.status} - ${createPlaylist.statusText}`)
    }

    //json the data
    const playlistData = await createPlaylist.json();

    localStorage.setItem("playlistId",playlistData.id);

    return playlistData;
    
    }catch(error){
        console.error(error);
    }
}
export default AddPlaylist;