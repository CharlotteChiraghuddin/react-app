import React,{useEffect, useState} from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import TrackList from './TrackList';
import AuthenticateUser from './AuthenticateUser';
import HandleRedirect from './HandleRedirect';


function App() {
  const [showResults,setShowResults]= useState(false);
  const [results,setResults] = useState([])
  const [request,setRequest]=useState(false);
  const [playlist,setPlaylist]= useState([]);
  const [state,setState]= useState('');
  const [authenticate,setAuthenticate]=useState(false);

  const onPageLoad = () => {
    HandleRedirect();
    const code = localStorage.getItem("code");
    const storedState = localStorage.getItem("state");
    setState(storedState);
    console.log(code);
    const urlParams = new URLSearchParams(window.location.search);
    const receivedState = urlParams.get("state");
    if(authenticate){
    if (storedState !== receivedState) {
        // State parameters don't match, reject the request
        alert("Invalid state parameter. Authentication failed.");
        return;
    }
  }
}
  useEffect(()=>{
  onPageLoad()},[])

  const handleSearch = (value)=>{
    setShowResults(true);
    if(value){
    setRequest(value);
    }
    console.log(state);
  }
  const handleClick =(value)=>{
    console.log(value);
    setPlaylist(prev=> [...prev,{name:value.name,artist:value.artists[0].name, album:value.album.name}])
  }
  const handleRemove = (choice)=>{
    setPlaylist(prevPlaylist=> prevPlaylist.filter(item=> item!== choice));
  }
  const handleSaveToSpotify = ()=>{
    AuthenticateUser()
    setPlaylist([]);
    setAuthenticate(true);
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
