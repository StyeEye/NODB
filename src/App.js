import React from 'react';
import './App.css';
import "./reset.css"
import CalendarManager from "./Views/Calendar/CalendarManager"

function App() {
  return (
    <div className="App">
      <section className="calendar-section">
        <CalendarManager />
      </section>
      <section className="upcoming-section">
      </section>
    </div>
  );
}

export default App;
