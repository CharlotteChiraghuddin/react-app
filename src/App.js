import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <video autoPlay muted loop id="bg-video">
        <source src="/background.mp4" type="video/mp4" />
        your browser does not support the video tag.
      </video>
      <div className='overlay'></div>
      <header className="App-header">
        <h1>Jammming</h1>
      </header>
    </div>
  );
}

export default App;
