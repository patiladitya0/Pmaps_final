import React, { useState } from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog } from 'react-icons/wi';
import './WeatherDisplay.css';

const WeatherDisplay = ({ forecastData }) => {
  const { list, city } = forecastData;

  // Map weather conditions to icons
  const weatherIcons = {
    Clear: <WiDaySunny />,
    Clouds: <WiCloudy />,
    Rain: <WiRain />,
    Thunderstorm: <WiThunderstorm />,
    Snow: <WiSnow />,
    Fog: <WiFog />,
    Mist: <WiFog />, // Example for mist/fog conditions
  };

  // Group data by date
  const groupedData = list.reduce((acc, entry) => {
    const date = entry.dt_txt.split(' ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  // State to track the selected date
  const [selectedDate, setSelectedDate] = useState(Object.keys(groupedData)[0]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const selectedDayData = groupedData[selectedDate];

  // Format time into 12-hour AM/PM
  const formatTime = (time24) => {
    const [hour, minute] = time24.split(':');
    const hour12 = (hour % 12) || 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <div className="weather-display">

      {/* Main Container for Selected Day */}

      <div className="selected-day">
      <h2>Weather Forecast for {city.name}</h2>
        <h3>{new Date(selectedDate).toDateString()}</h3>
        <div className="hourly-forecast">
          {selectedDayData.map((entry) => (
            <div key={entry.dt} className="hourly-card">
              <p><strong>Time:</strong> {formatTime(entry.dt_txt.split(' ')[1])}</p>
              <p><strong>Temp:</strong> {Math.round(entry.main.temp)}°C</p>
              <div className="icon-container">
                {weatherIcons[entry.weather[0].main] || <WiCloudy />}
              </div>
              <p><strong>Weather:</strong> {entry.weather[0].description}</p>
              <p><strong>Wind:</strong> {entry.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal List of Other Days */}
      <div className="horizontal-list">
        {Object.keys(groupedData).map((date) => (
          <div
            key={date}
            className={`day-card ${selectedDate === date ? 'active' : ''}`}
            onClick={() => handleDayClick(date)}
            title={`Click to view weather details for ${new Date(date).toDateString()}`}
          >
            <p className="date">{new Date(date).toDateString().split(' ')[0]}</p>
            <div className="icon-container">
              {weatherIcons[groupedData[date][0].weather[0].main] || <WiCloudy />}
            </div>
            <p className="temp">
              {Math.round(Math.max(...groupedData[date].map((entry) => entry.main.temp)))}°C /
              {Math.round(Math.min(...groupedData[date].map((entry) => entry.main.temp)))}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
