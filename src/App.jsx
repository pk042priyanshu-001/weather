import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const apiKey = "b6d718bdcb631d4ab95c8d8c90a98553";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  const searchCity = () => {
    if (city.trim() === "") return;

    axios
      .get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
        },
      })
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    setCity("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchCity();
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="app">
      <div className="search">
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter City"
          type="text"
        />
        <button onClick={searchCity}>Search</button>
      </div>
      <div className="current-date-time">
        {currentDate} | {currentTime}
      </div>

      {weatherData ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weatherData.name}</p>
            </div>
            <div className="temp">
              <h1>{Math.round(weatherData.main.temp - 273.15)}°C</h1>
            </div>
            <div className="description">
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p>{Math.round(weatherData.main.feels_like - 273.15)}°C</p>
              <p className="bold">Feels like</p>
            </div>
            <div className="humidity">
              <p>{weatherData.main.humidity}%</p>
              <p className="bold">Humidity</p>
            </div>
            <div className="wind">
              <p>{weatherData.wind.speed} KMPH</p>
              <p className="bold">Wind Speed</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>No weather data available. Please enter a city to get weather information.</p>
        </div>
      )}

      

      <div className="footer">
        <p>&copy; 2023 Pritiyar Weather. All rights reserved.</p>
        <p>
          Created by <a href="https://pk042priyanshu-portfolio.netlify.app/" target="_blank" rel="noreferrer">Priyanshu Katiyar</a>
        </p>
      </div>
    </div>
  );
};

export default App;
