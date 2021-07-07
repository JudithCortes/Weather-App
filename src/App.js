
import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';


export default function App() {

  const [lat, setLat] = useState([]);
  const [lat2, setLat2] = useState([]);

  const [long, setLong] = useState([]);
  const [long2, setLong2] = useState([]);

  const [data, setData] = useState([]);


  useEffect(() => {

    const fetchData = async () => {


      navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      });


      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    
    fetchData();

  }, [lat2, long2]);


  return (
    <div className="App">
        {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div>
           <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}

