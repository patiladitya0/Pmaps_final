import React, { useState } from 'react';
import './App.css';

const WeatherForm = ({ fetchWeather }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity('');
    }
  };

  return (
    
    <div className="form-div">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="city">Enter City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter City Name"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button className="form-submit-btn" type="submit">
            Fetch Weather Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default WeatherForm;
