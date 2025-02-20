import React,{useState,useEffect} from "react";



function Playlist({playlist,callback}){

    return(
        <div className="playlist overlay-results">
            <div className="card">
                <input className="playlist-name" type="text" placeholder="Playlist name..."></input>
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
    </div>
    );

}
export default Playlist;