import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './index.css';


const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather`;
const WEATHER_API_KEY = '920b013123447d8c58314d11177282d0';

class Weather extends Component {
  state = {
    weather: null,
    loading: true,
  };

  async componentDidMount() {
    const { cityName, country } = this.props.params;
    try {
      const response = await axios.get(`${WEATHER_API_URL}?q=${cityName},${country}&appid=${WEATHER_API_KEY}&units=metric`);
      this.setState({ weather: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { weather, loading } = this.state;

    if (loading) return <p>Loading weather...</p>;
    if (!weather) return <p>No weather data found</p>;

    return (
      <div className="weather-container">
        <h2 className='heading'>Weather in {weather.name}, {weather.sys.country}</h2>
        <p className='cities'>Temperature: {weather.main.temp} °C</p>
        <p className='cities'>Weather: {weather.weather[0].description}</p>
        <p className='cities'>Humidity: {weather.main.humidity}%</p>
        <p className='cities'>Wind Speed: {weather.wind.speed} m/s</p>
      </div>
    );
  }
}

const WeatherPage = (props) => {
  const params = useParams();
  return <Weather {...props} params={params} />;
};

export default WeatherPage;
