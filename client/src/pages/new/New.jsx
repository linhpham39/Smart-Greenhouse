import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import {setThreshold} from "../../thresholds";

const New = ({ inputs, title }) => {
  title = "Set Thresholds";
  //state variables to hold the input values
  const [ecValue, setEcValue] = useState("");
  const [phValue, setPhValue] = useState("");
  const [temperatureValue, setTemperatureValue] = useState("");
  const [humidityValue, setHumidityValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ecValue: ", ecValue);
    console.log("phValue: ", phValue);
    console.log("temperatureValue: ", temperatureValue);
    console.log("humidityValue: ", humidityValue);
    
    //update the thresholds in thresholds.json
    //setThreshold(ecValue, phValue, temperatureValue, humidityValue);
  }

  const handleChange = (e, label) => {
    console.log("e:", label, "value:", e.target.value);
    switch (label) {
      case "EC":
        setEcValue(e.target.value);
        break;
      case "pH":
        setPhValue(e.target.value);
        break;
      case "Temperature":
        setTemperatureValue(e.target.value);
        break;
      case "Humidity":
        setHumidityValue(e.target.value);
        break;
      default:
        break;
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder}
                    onChange={(e) => handleChange(e, input.label)} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
