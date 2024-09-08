City Weather Forecast Application
This React application allows users to search for cities and view current weather conditions. It features a user-friendly interface for searching cities and displaying detailed weather information including temperature, humidity, and wind speed.

Key Features
City Search: Users can search for cities by name. As users type, the application dynamically filters and displays relevant cities.
Real-Time Weather Data: Fetch and display real-time weather information using the OpenWeatherMap API.
Infinite Scrolling: Automatically load more cities as users scroll down the list.
Detailed Weather Information: View temperature, weather description, humidity, and wind speed for the selected city.
Technologies Used
React: A popular JavaScript library for building user interfaces, used here for creating the application's components.
Axios: A promise-based HTTP client for making API requests, used for fetching weather data.
React Router: Manages routing and navigation between components in the application.
Setup Instructions
Clone the Repository Begin by cloning the repository to your local machine:


Install Dependencies Install the required npm packages:

bash
Copy code
npm install
Configure Environment Variables Create a .env file in the root of your project and add your OpenWeatherMap API key:

makefile
Copy code
REACT_APP_WEATHER_API_KEY=your_api_key_here
Start the Application Run the application locally using:

bash
Copy code
npm start
Open your web browser and navigate to http://localhost:3000 to view the application.

Components
Country: Handles the search functionality and displays a list of cities. It also manages the infinite scrolling to load more cities as needed.
Weather: Fetches and displays detailed weather information for the selected city. Includes temperature, weather description, humidity, and wind speed.

Deployed Link: