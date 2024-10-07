import React, { useState } from 'react';
import './App.css';

function App() {
  let api = {
    key: "8f3e8d8b3022b853a79f8e5838c9832a",
    url: "https://api.openweathermap.org/data/2.5/weather"
  };

  let [search, setSearch] = useState("");
  let [weather, setWeather] = useState({});
  let [loading, setLoading] = useState(false); 

  function searchCity() {
    setLoading(true); 
    fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(val => {
        setWeather(val);
        setLoading(false); 
      })
      .catch(() => {
        setLoading(false); 
      });
  }

  function keyPressEnter(e) {
    if (e.key === 'Enter') {
      searchCity();
    }
  }

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type='text'
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={keyPressEnter}
        placeholder="Enter city name"
      />
      <button onClick={searchCity}>Search</button>
      
      {loading && <p>Loading...</p>}

      <div>
        {(weather.name !== undefined) ? (
          <>
            <p>Name: <strong>{weather.name}</strong></p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </>
        ) : (
           <p>Data not found</p> 
        )}
      </div>
    </div>
  );
}

export default App;
