import React, { useState } from 'react';

const api = {
  key: "85672c8d1f1b864c9e79c9c334d27128",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = k => {
    if(k.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      ;
    })
    }
  }


   const DateBuilder = (newDate) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[newDate.getDay()];
    const date = newDate.getDate();
    const month = months[newDate.getMonth()];
    const year = newDate.getFullYear();

    return `${day}, ${date} ${month}, ${year}`;
   }

   const temp = (typeof weather.main != "undefined") ? ((Math.round(1.8 * weather.main.temp + 32) > 70) ? "hot" : "cold") : "hot";

  return (
    <div className={(typeof weather.main != "undefined") ? (temp === "hot" ? "App-Hot" : "App-Cold") : "App-Hot"}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="search city" onChange={e=>setQuery(e.target.value)} value={query} onKeyPress={search}></input>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className={temp === "hot" ? "location-box-hot" : "location-box-cold"}>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{DateBuilder(new Date())}</div>
          </div>
          <div className={temp === "hot" ? "weather-box-hot" : "weather-box-cold"}>
            <div className='temperature'>{Math.round(1.8 * weather.main.temp + 32)}°F</div>
            <div className='weather'>{weather.weather[0].main}: {weather.weather[0].description}</div>
          </div>
        </div>
        ) : ('') }
      </main>
    </div>
  );
}

export default App;
