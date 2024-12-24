// src\App.js
import React, { useState } from 'react';
import axios from 'axios';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import './App.css'; // Ensure CSS is imported

const App = () => {
  const [forecastData, setForecastData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const apiKey = '9de69b0e7d87448b87ee8bd2ad8d110e';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      setForecastData(response.data);
    } catch (error) {
      alert('Error fetching weather data. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <WeatherForm fetchWeather={fetchWeather} />
        {forecastData && <WeatherDisplay forecastData={forecastData} />}
      </main>
    </div>
  );
};

export default App;
