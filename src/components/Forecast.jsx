import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

// I had inserted the Dumy Data as the openWeather API was not allowing the hourly and Daily basis information

function Forecast({ title, items }) {
  console.log(items);
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">12:00 AM</p>
          <img
            src="http://openweathermap.org/img/wn/04d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">22°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">05:00 AM</p>
          <img
            src="http://openweathermap.org/img/wn/03d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">20°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">10:00 AM</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">25°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">04:30 PM</p>
          <img
            src="http://openweathermap.org/img/wn/01d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">18°</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-light text-sm">10:30 PM</p>
          <img
            src="http://openweathermap.org/img/wn/02d@2x.png"
            className="w-12 my-1"
            alt=""
          />
          <p className="font-medium">22°</p>
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">22°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
