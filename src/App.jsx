import React, {Component} from 'react';
import './App.css';
import PomodoroClock from './PomodoroClock/PomodoroClock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>React Pomodoro Clock</header>
        <PomodoroClock/>
        <footer>Coded by:
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/oyelowo-oyedayo/">Oyelowo Oyedayo</a>
        </footer>
      </div>
    );
  }
}

export default App;
