import React from 'react';
import './App.css';
import Calendar from 'react-calendar';

function App() {
  return (
    <div className="App">
      <header>Hi</header>
      <Calendar value={new Date()}/>
    </div>
  );
}

export default App;
