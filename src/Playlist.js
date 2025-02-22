import React,{useState,useEffect} from "react";


function Playlist({playlist,callback,save}){
    const[track,setTrack]=useState([]); /*Thsi will be used to save the uri of each track which can then be sent over to Spotify*/

    const[userID,setUserID]=useState('');
    
    async function GetUserID(){
        const param = {
            method:'GET',
            header:{'Authorization':`Bearer`}
        }
        try{
            const response = await fetch('https://api.spotify.com/v1/me',param)
            if(!response.ok){
                throw new Error('HTTP error! status:',response.status)
            }
            const value = await response.json();
            setUserID(value);
        }catch(error){
            console.log(error);
        }
    }

    function saveToSpotify(){
        save();
        }
       
    

    return(
        <div className="playlist overlay-results">
            <div className="playlist-name">
                <input type="text" placeholder="Playlist name..."></input>
            </div>
            <div className="card">
                
                {playlist.map((choice,index)=>(
                <div className="section" data-key={index} key={index}>
                    <p>{choice.name} &nbsp;&nbsp;| &nbsp;&nbsp; {choice.artist} <br></br><span className="album">{choice.album}</span></p>
                    <div className="icon">
                        <img onClick={()=>callback(choice)} src='./minus.png'></img>
                    </div>
            </div>
            ))
        }
        </div>
        <div className="sendSpotify">
            <button onClick={()=>saveToSpotify(save)}>Save to Spotify</button>
        </div>
    </div>
    );

}
export default Playlist;