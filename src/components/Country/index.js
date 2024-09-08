import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

const API_URL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=1000&start=';

class Country extends Component {
  state = {
    cities: [],
    searchQuery: '',
    page: 0,
    loading: false,
    hasMore: true
  };

  fetchCities = async () => {
    const { page, cities } = this.state;
    this.setState({ loading: true });

    try {
      const result = await axios.get(`${API_URL}${page * 1000}`);
      const newCities = result.data.records;

      if (newCities.length === 0) {
        this.setState({ hasMore: false });
      } else {
        this.setState({
          cities: [...cities, ...newCities],
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.fetchCities();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value, page: 0, cities: [] }, this.fetchCities);
  };

  handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && this.state.hasMore) {
      this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchCities);
    }
  };

  render() {
    const { cities, searchQuery, loading } = this.state;
    const filteredCities = cities.filter(city =>
      city.fields.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="table-container">
        <h1 className='heading'>City Weather Forecast</h1>
        <input
          type="text"
          className="cities"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={this.handleSearch}
        />
        <table className="cities-table">
          <thead>
            <tr>
              <th className="cities">City Name</th>
              <th  className="cities">Country</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <tr key={city.recordid}>
                  <td>
                    <Link to={`/weather/${city.fields.name}/${city.fields.country}`}>
                      {city.fields.name}
                    </Link>
                  </td>
                 
                  <td>{city.fields.timezone || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No cities found</td>
              </tr>
            )}
          </tbody>
        </table>
        {loading && <p>Loading...</p>}
      </div>
    );
  }
}

export default Country;
