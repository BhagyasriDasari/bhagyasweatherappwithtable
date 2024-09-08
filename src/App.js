import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Country from './components/Country';
import WeatherPage from './components/Weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Country />} />
        <Route path="/weather/:cityName/:country" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;
