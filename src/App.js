import logo from '.public/logo.png';
import './App.css';

function App() {
  return (
    <div className="App-main">
      <header className="Cat-header">
        <img src={logo} className="Cat-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
