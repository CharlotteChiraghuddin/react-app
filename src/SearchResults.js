import React,{useState,useEffect} from "react";
import './App.css';
/*results is passed to SearchResults from App.js which retrieved the information from Tracklist through a callbackfunction*/
function SearchResults({results,callback}){

  const  trialValue = {
    name: 'blach',
    song: 'bsjaf',
    album: 'askfgs'
  }
  useEffect(()=>{
    if (results){
    console.log({results});
    }
  },[results]);

    return(
            <div className="search-results overlay-results">
                <div className="results-title">
                    <h1>Results</h1>
                </div>
            <div className="card">
                {results.map((result,index)=>(
                    <div className="section" data-key={index} key={index}>
                    <p>{result.name} &nbsp;&nbsp;| &nbsp;&nbsp; {result.artists[0].name} <br></br><span className="album">{result.album.name}</span></p>
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