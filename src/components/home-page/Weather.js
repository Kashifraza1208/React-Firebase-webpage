import React, { Fragment, useState } from "react";
import "./Weather.css";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import search from "../assets/search.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

const Weather = () => {
  const [wicon, setWicon] = useState("cloud");
  const [isLoading, setIsLoading] = useState(false);
  const [datas, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();
  let api_key = process.env.REACT_APP_API_KEY;

  const searchWeather = async () => {
    const element = document.querySelector(".city");
    if (!element || element.value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;

    try {
      setIsLoading(true);
      let response = await fetch(url);

      if (!response.ok) {
        setIsDataLoaded(false);
        console.error("Error fetching weather data:", response.status);
        return;
      } else {
        setIsDataLoaded(false);
      }

      let data = await response.json();
      setData(data);

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow);
      } else {
        setWicon(clear);
      }
    } catch (error) {
      setIsDataLoaded(false);
      console.error("Error fetching weather data:", error);
      // Handle other errors (e.g., network issues)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="weather">
        <div className="container">
          <h1 className="weather-heading">Weather Information</h1>
          <div className="top-bar">
            <input
              type="text"
              className="city"
              placeholder="Search City (eg: Noida)"
            />
            <div
              className="search_icon"
              onClick={() => {
                searchWeather();
              }}
            >
              <img src={search} alt="" />
            </div>
          </div>
          {isLoading === true ? (
            <Loader />
          ) : (
            <>
              <div className="weather_image">
                <img src={wicon} alt="" className="cloud" />
              </div>
              <div className="weather_temperature">
                {datas?.main?.temp ? datas?.main?.temp : 12}°C
              </div>
              <div className="weather_location">
                {datas?.name ? datas?.name : "Faridabad"}
              </div>
              <div className="data_container">
                <div className="element">
                  <img src={humidity} alt="" className="icon" />
                  <div className="data">
                    <div className="humidity_percentage">
                      {datas?.main?.humidity ? datas?.main?.humidity : 53}%
                    </div>
                    <div className="text">Humidity</div>
                  </div>
                </div>
                <div className="element">
                  <img src={wind} alt="" className="icon" />
                  <div className="data">
                    <div className="wind_rate">
                      {datas?.wind?.speed ? datas?.wind?.speed : 12}km/h
                    </div>
                    <div className="text">Wind Speed</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="user">
          <p>Click the button below to access the User table.</p>
          <button
            className="userButton"
            onClick={() => {
              navigate("/user-lists");
            }}
          >
            User Table
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Weather;
