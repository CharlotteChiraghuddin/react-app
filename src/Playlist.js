import React,{useState,useEffect} from "react";



function Playlist({playlist,callback,save}){
    const[track,setTrack]=useState([]); /*Thsi will be used to save the uri of each track which can then be sent over to Spotify*/
    
    function saveToSpotify(){
        console.log(playlist);
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
                    <p>{choice.song} &nbsp;&nbsp;| &nbsp;&nbsp; {choice.artist} <br></br><span className="album">{choice.album}</span></p>
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