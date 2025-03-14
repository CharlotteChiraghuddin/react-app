import React,{useEffect, useState, useRef} from 'react';
import '../Stylesheets/App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import TrackList from '../Tracklist/TrackList';
import AuthenticateUser from '../AuthenticateUser/AuthenticateUser';
import HandleRedirect from '../HandleRedirect/HandleRedirect';
import RequestAccessToken from '../RequestAccessToken/RequestAccessToken';
import GetUserId from '../GetUserId/GetUserId';
import AddPlaylist from '../AddPlaylist/AddPlaylist';


function App() {
  const [showResults,setShowResults]= useState(false);
  const [results,setResults] = useState([])
  const [request,setRequest]=useState(false);
  const [playlist,setPlaylist]= useState([]);
  const [state,setState]= useState('');
  const [load,setLoad] = useState(0);
  const [token, setToken] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [userID, setUserID] = useState('');
  const [counter, setCounter] = useState(0);
  const hasRunRef = useRef(false); // useRef to track if the function has run
 
      


  //This function runs everytime the page renders
  async function onPageLoad(){
    window.scrollTo(0,0,);
    const searchParams = new URLSearchParams(window.location.search);
    const currentCode = searchParams.get("code");

    if(!currentCode){
      localStorage.removeItem("code");
      localStorage.removeItem("state");
      localStorage.removeItem("userId");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    //Retrieves the authorization code that is returned from authenticating the user
    HandleRedirect();

    //accesses the code from local storage.
    const code = localStorage.getItem("code");

    //accesses the state from local storage.
    const storedState = localStorage.getItem("state");
    console.log(`this is the stored state in app.js ${storedState}`);

    //updates the state to be set to the state retrieved from local storage
    setState(storedState);

    //Checking what the state is equal to in the returned url
    const urlParams = new URLSearchParams(window.location.search);
    const receivedState = urlParams.get("state");
    console.log(receivedState);
    //checking the authentication process has been complete before doing the check
    if(window.location.search.length > 0){
      if (storedState !== receivedState) {

          // State parameters don't match, reject the request
          alert("Invalid state parameter. Authentication failed.");
          return;

      }
    }

    //if a code has been recieved, we will use that code to get an access token.
    if(code){
      //call RequestAccessToken, and pass in authorization code and refresh_token which will be used to check if it needs to run or not.
      await RequestAccessToken(code);
      //retrieving the refresh_token from local storage to be use to get a new access token
      const refresh_token = localStorage.getItem("refresh_token");
      //checking refresh token was recieved
      console.log(`This is the refresh token in App.js ${refresh_token}`);

      const access_token = localStorage.getItem("access_token");
      console.log(`This is the access token in App.js ${access_token}`);
      setToken(access_token);

    }

}


  useEffect(()=>{
    //If hasRunRef is true, it will exit the hook, this ensures that onPageLoad only runs once.
    if(hasRunRef.current) return;
    onPageLoad()
    hasRunRef.current = true;

    //ensure scroll restoration is disabled
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
},[])

//Updates the playlist name everytime it changes.
const handleChange = (event)=>{
  const newName = event.target.value;
  localStorage.setItem("playlistName",newName);
  setPlaylistName(newName);
}

//Runs when search button is clicked, this sets showResults to true so the serach results can be displayed.
//It also sets the request to the value put into the search bar.
  const handleSearch = (value)=>{
    setShowResults(true);
    if(value){
    setRequest(value);
    }
    console.log(state);
  }

  //This handles the results that are returned from the API call that happens in TrackList.
  //These results will then be passed over to SearchResults to be displayed.
  const handleResults = (value)=>{
    if(value){
    setResults(value);
    }
  }
  
  //This handles when the plus icon is clicked next to a track. It will save the data to the playlist array.
  const handleClick =(value)=>{
    setPlaylist(prev=> [{name:value.name,artist:value.artists[0].name, album:value.album.name, uri:value.uri},...prev])
  }

  //This handles when the minus icon is clicked and will remove the corresponding data from the playlist array.
  const handleRemove = (choice)=>{
    setPlaylist(prevPlaylist=> prevPlaylist.filter(item=> item!== choice));
  }

  //This will run when the Save to Spotify button is clicked. It will trigger the authentication.
  //It will also set Playlist to [], so the user can start to create a new playlist.
  const handleSaveToSpotify = ()=>{
    //runs AddPlaylist when Save to Spotify button is pressed and the name currently in the input field is passed over as a prop
    AddPlaylist();
    //once save to spotify is clicked, the current state of playlist is saved to local storage to be retrieved in AddPlaylist
    localStorage.setItem("playlist",JSON.stringify(playlist));
    setPlaylistName('');
    //checks if user has already been authenticated to prevent unneccessary authentication.
    if(window.location.search.length === 0){
    AuthenticateUser();
    }
    localStorage.setItem("authorized",true);
    setPlaylist([]);
    setPlaylistName('');
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
      {request && <Playlist playlist={playlist} callback={handleRemove} save={handleSaveToSpotify} handleChange={handleChange} playlistName={playlistName}/>}
      <TrackList request={request} callback={handleResults}/>
      {token && <GetUserId/>}
    </div>
  );
}

export default App;
