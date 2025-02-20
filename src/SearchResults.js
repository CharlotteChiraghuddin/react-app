import React from "react";
import './App.css';
function SearchResults({request}){
 const results={
    item:{
        song:'The groove',
    artist:'muse',
    album:'something i dont know'
    },
    itema:{song:'The sun',
        artist:'muse',
        album:'something i dont know'
    },
    itemb:{
        song:'The mouse',
    artist:'muse',
    album:'something i dont know'
    },
    itemc:{
        song:'The octopus',
        artist:'muse',
        album:'something i dont know'
    }
}
    return(
        <div className="search-results overlay-results">
            <div className="card">
                {Object.values(results).map((result,index)=>(
                    <div className="section">
                    <p key={index}>{result.song} &nbsp;&nbsp;| &nbsp;&nbsp; {result.artist} <br></br><span className="album">{result.album}</span></p>
                    <div className="icon">
                    <img src='./add_circle.png'></img>
                    </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}
export default SearchResults;