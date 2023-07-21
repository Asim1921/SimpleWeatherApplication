import { DateTime } from "luxon";

const API_KEY = "0c37394da85e60adad0ec99ebe40d842";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};
const formatForecastWeather = (data) => {
  let timezone, daily, hourly;

  if (data.timezone) {
    timezone = data.timezone;
  }

  // Check if daily forecast is available
  if (data.daily && Array.isArray(data.daily) && data.daily.length >= 6) {
    daily = data.daily.slice(1, 6).map((d) => {
      const title = d.dt ? formatToLocalTime(d.dt, timezone, "ccc") : "";
      const temp = d.temp ? d.temp.day : "";
      const icon = d.weather && d.weather[0] ? d.weather[0].icon : "";
      return { title, temp, icon };
    });
  } else {
    daily = [];
  }

  // Check if hourly forecast is available
  if (data.hourly && Array.isArray(data.hourly) && data.hourly.length >= 6) {
    hourly = data.hourly.slice(1, 6).map((d) => {
      const title = d.dt ? formatToLocalTime(d.dt, timezone, "hh:mm a") : "";
      const temp = d.temp ? d.temp : "";
      const icon = d.weather && d.weather[0] ? d.weather[0].icon : "";
      return { title, temp, icon };
    });
  } else {
    hourly = [];
  }

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    });

    console.log("API Response:", formattedForecastWeather); // Add this console log

    const formattedData = formatForecastWeather(formattedForecastWeather);

    console.log("Formatted Weather Data:", formattedData); // Add this console log

    return { ...formattedCurrentWeather, ...formattedData };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
