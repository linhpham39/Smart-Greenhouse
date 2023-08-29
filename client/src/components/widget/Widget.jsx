import "./widget.scss";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import HPlusMobiledataIcon from '@mui/icons-material/HPlusMobiledata';
import BoltIcon from '@mui/icons-material/Bolt';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useState } from "react";
import PopUpChart from "../popupChart/PopupChart";

const Widget = ({ type, value, recentData }) => {
  let data;
  const [isChartVisible, setIsChartVisible] = useState(false);

  //temporary
  const diff = 20;

  switch (type) {
    case "temperature":
      data = {
        title: "Temperature",
        link: "View recent temperature",
        icon: (
          <DeviceThermostatIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "ph":
      data = {
        title: "pH",
        link: "View recent pH",
        icon: (
          <HPlusMobiledataIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "ec":
      data = {
        title: "EC",
        link: "View recent EC",
        icon: (
          <BoltIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "humidity":
      data = {
        title: "Humidity",
        link: "View recent humidity",
        icon: (
          <WaterDropIcon
            className="icon"
            style={{
              backgroundColor: "rgb(176,224,230)",
              color: "rgb(0,191,255)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {value} {type === "temperature" ? "°C" : ""
          || type === "ph" ? "pH" : ""
          || type === "ec" ? "mS/cm" : ""
          || type === "humidity" ? "%" : ""}
        </span>
        {/* <span className="link" onClick={() => setIsChartVisible(true)}>
          {data.link}
        </span> */}
        <PopUpChart  title={data.title}></PopUpChart>
      </div>
      <div className="right">
{/*         <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data.icon}
      </div>
      {isChartVisible && (
        <PopUpChart onClose={() => setIsChartVisible(false)} />
      )}
    </div>
  );
};

export default Widget;
