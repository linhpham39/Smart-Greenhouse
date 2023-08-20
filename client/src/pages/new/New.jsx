import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
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
    //update the database
    axios({
      method: "patch",
      baseURL: "http://localhost:3000/updateThresholds",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        "temperature": temperatureValue,
        "ec": ecValue,
        "ph": phValue,
        "humidity": humidityValue
      }
    }).then((res) => {
      console.log(res.data);
      console.log('update thresholds successfully');
      // setParameters(res.data);
    });
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
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form onSubmit={handleSubmit}>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

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
