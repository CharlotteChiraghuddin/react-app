import React,{useEffect, useState} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import TrackList from './TrackList';

function App() {
  const [showResults,setShowResults]= useState(false);
  const [results,setResults] = useState([])
  const [request,setRequest]=useState(false);
  const [playlist,setPlaylist]= useState([]);

  const handleSearch = (value)=>{
    setShowResults(true);
    if(value){
    setRequest(value);
    }
  }
  const handleClick =(value)=>{
    setPlaylist(prev=>[...prev, value]);
  }
  const handleRemove = (choice)=>{
    setPlaylist(prevPlaylist=> prevPlaylist.filter(item=> item!== choice));
  }
  const handleSaveToSpotify = ()=>{
    setPlaylist([]);
  }
  const handleResults = (value)=>{
    if(value){
    setResults(value);
    }
  }

  return (
    <div className="App container">
      <video autoPlay muted loop id="bg-video">
        <source src="/background.mp4" type="video/mp4" />
        your browser does not support the video tag.
      </video>
      <div className='overlay'></div>
      <div className="container-head">
        <header className="App-header">
          <h1>Jammming</h1>
        </header>
        <SearchBar onSearch={handleSearch}/>
      </div>
      {request && <SearchResults callback={handleClick} results={results}/>}
      {request && <Playlist playlist={playlist} callback={handleRemove} save={handleSaveToSpotify}/>}
      <TrackList request={request} callback={handleResults}/>
    </div>
  );
}

export default App;
