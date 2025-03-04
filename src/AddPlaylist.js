async function AddPlaylist(){
    //retrieving the access token and id from local storage
    const token = localStorage.getItem("access_token");
    const id = localStorage.getItem("userId");
    const playlistName = localStorage.getItem("playlistName");
    //check if token and id are being returned from local storage
    if(!token || !id){
        console.log('token or user id not found in local storage');
        return;
    }

    //auth parameters set up to perform request to create a new playlist
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
    if(!createPlaylist.ok){
        throw new Error(`Error: ${createPlaylist.status} - ${createPlaylist.statusText}`)
    }

    //json the data
    const playlistData = await createPlaylist.json();

    //playlist Id accessed from the returned data
    const playlistId = playlistData.id;
    //check if this was succesful
    if(!playlistId){
        console.log('failed to retrieve playlist id');
        return;
    }

    console.log('playlist id: ' + playlistId);

    //retrieve playlist array from local storage
    const playlist = JSON.parse(localStorage.getItem("playlist"));
    console.log(playlist);
    //check if this was succesful
    if(!playlist){
        console.log('failed to retrive playlist from local storage');
        return;
    }
    console.log('playlist retrieved from local storage: ' + playlist);

    //create an array to hold the track URI's
    const trackURI = [];
    //map through the playlist array and push the uri of each track into the trackURI array 
    playlist.forEach(track => trackURI.push(track.uri));

    if(!trackURI){
        console.log('failed to update trackURI');
        return;
    }
    console.log('trackURI: ' + trackURI)

    //set up parameters to update the playlist with the requested tracks
    const trackParams = {
        method:"POST",
        headers:{
            "Authorization": 'Bearer '+ token,
            "Content-Type": 'application/json',
            },
        body: JSON.stringify({"uris":trackURI})
    };

    try{
        /*make the request to add the chosen tracks to the playlist*/
    const added = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,trackParams);
        
    if(!added.ok){
        throw new Error(`HTTP Error: ${response.status}-${response.statusText}`);
    }

    const response = await added.json();
    localStorage.removeItem("playlist");
    localStorage.removeItem("playlistName")
    } catch(error){
        console.error('Error adding the tracks to the playlist' + error)
    }
    }catch(error){
        console.error('Error creating the playlist:' + error);
    }
}
export default AddPlaylist;