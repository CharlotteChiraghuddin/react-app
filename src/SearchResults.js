import React,{useState} from "react";
import './App.css';
/*results is passed to SearchResults from App.js which retrieved the information from Tracklist through a callbackfunction*/
function SearchResults({results,callback}){

 const trialResults={
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
                <div className="results-title">
                    <h1>Results</h1>
                </div>
            <div className="card">
                {Object.values(trialResults).map((result,index)=>(
                    <div className="section" data-key={index} key={index}>
                    <p>{result.song} &nbsp;&nbsp;| &nbsp;&nbsp; {result.artist} <br></br><span className="album">{result.album}</span></p>
                    <div className="icon">
                    <img onClick={()=>callback(result)} src='./add_circle.png'></img>
                    </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}
export default SearchResults;