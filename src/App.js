import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';

function App() {
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
        <SearchBar/>
      </div>
    </div>
  );
}

export default App;
