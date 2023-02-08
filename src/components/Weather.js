import React, { useState } from "react";
import { getName } from 'country-list';
import { countries } from "../Citiesdata";
function Weather() {
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState([]);
  const [radioBtn, setRadioBtn] = useState('celcius');
  console.log("Radio", radioBtn);
  const del = (w) => {
    const filter = weather.filter(i => i !== w);
    console.log(filter);
    setWeather(filter);
  }
  const reload = () => {
    const re_load = weather.filter(i => i !== i);
    console.log("Reload", re_load);
    setWeather(re_load);
  }
  const onSearch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`)
      .then((response) => response.json())
      .then((res => {
        console.log(res, typeof res);
        setTimeout(() => setWeather((weather) => [...weather, res]), 3000)
      }));
  };
  const getSunrise = (w) => {
    console.log("sunrise", w.sys.sunrise);
    const sunriseGMT = new Date(w.sys.sunrise * 1000);
    console.log("converted format", sunriseGMT.toLocaleTimeString());
    return sunriseGMT.toLocaleTimeString();
  }
  const getSunset = (w) => {
    const sunsetGMT = new Date(w.sys.sunset * 1000);
    console.log("converted format", sunsetGMT.toLocaleTimeString());
    return sunsetGMT.toLocaleTimeString();
  }
  function getCity() {
    return countries.map((country) => {
      return <option value={country.name} >{country.name} </option>;
    });
  }
  const getFarenheit = (w) => {
    console.log("Farenheit", w.main.temp, (w.main.temp * 9) / 5 + 32);
    return Math.round((w.main.temp * 9) / 5 + 32);
  }
  const getCelcius = (w) => {
    return Math.round(w.main.temp);
  }

  return (
    <div>
      <div className="d-flex justify-content-center p-4">
        <select className="form-control w-25 mr-2" style={{ marginRight: "20px" }} aria-label="Floating label select example" onChange={(e) => setCityName(e.target.value)}>
          <option value="choose" disabled selected="selected">-- Select Cities -- </option>
          {getCity()}
        </select>
        <button class="px-6 text-lg font-semibold rounded py-2 hidden border rounded-md bg-indigo-600" style={{ marginRight: "20px" }} onClick={onSearch}>Submit</button>
        <button class="px-6 text-lg font-semibold py-2 rounded hidden border rounded-md bg-indigo-600" style={{ marginRight: "20px" }} onClick={reload}>Reload</button>
      </div>
      <div value={radioBtn} className="d-flex justify-content-center" onChange={(e) => setRadioBtn(e.target.value)}>
        <input name="18+" value="celcius" id="18" type="radio" defaultChecked style={{ marginRight: "10px" }} />Celcius
        <input name="18+" value="farenheit" id="bel" type="radio" style={{ marginLeft: "10px", marginRight: "10px" }} />Farenheit
      </div>
      <div class="container py-5 h-100">
        <div class="row d-flex h-100">
          {(weather.map(weather => {
            return <div key={weather._id} class="col-md-8 col-lg-6 col-xl-4 mb-4">
              <div class="card" style={{ color: "#4B515D" }}>
                <div class="card-body">
                  <div class="d-flex">
                    <h6 class="flex-grow-1"><div className="pb-2">{weather.name}, {getName(weather.sys.country)}</div>
                    </h6>
                    <span className="cursor-pointer" style={{ cursor: "pointer" }}><i class="material-icons" onClick={() => del(weather)}>delete</i></span>
                  </div>
                  <div class="d-flex flex-column text-center mt-3 mb-4">
                    <h4 class="mb-0 font-weight-bold display-6" style={{ color: "#1C2331;" }}><span><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].desccription}
                      width="100px" /></span><sub>{radioBtn == "farenheit" ? getFarenheit(weather) + `°F` : getCelcius(weather) + `°C`}</sub>
                    </h4>
                    <h6 style={{ color: "#868B94" }}>{weather.weather[0].description}</h6>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                      <div><span style={{ color: "#868B94" }}>Speed:</span> <span class="ms-1"> {weather.wind.speed} km/h</span>
                      </div>
                      <div><span style={{ color: "#868B94" }}>Humidity:</span><span class="ms-1">{weather.main.humidity}</span>
                      </div>
                    </div>
                    <div>
                      <div><span style={{ color: "#868B94" }}>Longitude:</span><span class="ms-1">{Math.round(weather.coord.lon * 100) / 100}</span>
                      </div>
                      <div><span style={{ color: "#868B94" }}>Latitude:</span><span class="ms-1">{Math.round(weather.coord.lat * 100) / 100}</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <div><img src="../../Sunrise.png" width="50px" /></div>
                      <div><span style={{ color: "#868B94" }}>Sunrise: </span>{getSunrise(weather)}</div>
                    </div>
                    <div>
                      <div className="p-2"><img src="../../Sunset.png" width="50px" /></div>
                      <div className="pt-1"><span style={{ color: "#868B94" }}>Sunset: </span>{getSunset(weather)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }))}
        </div>
      </div>
    </div>
  )
}
export default Weather;