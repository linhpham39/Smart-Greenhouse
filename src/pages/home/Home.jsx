import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import SystemInfo from "../../components/infor/SystemInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { APImeasurements_count1, APImeasurements_count30, APIsystem_status } from "../../config"
//env


const Home = () => {
  //fetch data from api

  const FetchRecentData = async () => {
    //fetch data from api, with header
    const res = await axios.get(
      APImeasurements_count30
    );
    console.log(res);
    const data = await res.data;
    return data;
  };
  const [recentData, setRecentData] = useState([]);
  //fetch data each 5 seconds
  useEffect(() => {
    const fetchRecentData = async () => {
      const recentData = await FetchRecentData(); // Make sure FetchRecentData() returns a promise
      setRecentData(recentData);
      console.log("recentDatas", recentData);
    };

    const intervalId = setInterval(() => {
      fetchRecentData();
    }, 5000);

    // Clean up the interval when the component unmounts or when the dependency array changes
    return () => clearInterval(intervalId);
  }, []);  // Empty dependency array to run the effect only once


  const [alertsShown, setAlertsShown] = useState({
    ec: false,
    ph: false,
    temperature: false,
    humidity: false,
  });
  const toLocalTime= (timeStamp)=>{
    const date = new Date(timeStamp);
    date.setHours(date.getHours() + 7); // Add 7 hours
    var newTime = date.toLocaleTimeString(); // Customize the time format as needed
    return newTime;
  }
  console.log("recentData", recentData);
  const recentTemp = recentData.map((item) => {
    var newTime = toLocalTime(item.timeStamp);
    return{
    "name": newTime,
    "Total": item.temperature
  }}).reverse();
  const recentPh = recentData.map((item) => {
    var newTime = toLocalTime(item.timeStamp);
    return{
    "name": newTime,
    "Total": item.ph
  }}).reverse();
  const recentEc = recentData.map((item) => {
    var newTime = toLocalTime(item.timeStamp);
    return{
    "name": newTime,
    "Total": item.ec
  }}).reverse();
  const recentHumidity = recentData.map((item) => {
    var newTime = toLocalTime(item.timeStamp);
    return{
    "name": newTime,
    "Total": item.humidity
  }}).reverse();


  const FetchParameters = async () => {
    //fetch data from api, with header
    const res = await axios.get(
      APImeasurements_count1
    );
    console.log(res);
    const data = await res.data;
    return data;
  };
  const [parameter, setParameter] = useState([]);
  //fetch data each 5 seconds
  useEffect(() => {
    const fetchParameter = async () => {
      const parameters = await FetchParameters(); // Make sure FetchParameters() returns a promise
      setParameter(parameters[0]);
      console.log("parameters", parameters[0]);
    };

    const intervalId = setInterval(() => {
      fetchParameter();
    }, 5000);

    // Clean up the interval when the component unmounts or when the dependency array changes
    return () => clearInterval(intervalId);
  }, []);  // Empty dependency array to run the effect only once


  const FetchStatus = async () => {
    //fetch data from api, with header
    const res = await axios.get(
      APIsystem_status
    );
    console.log(res);
    const data = await res.data;
    return data;
  };
  const [status, setStatus] = useState([]);
  //fetch data each 5 seconds
  useEffect(() => {
    const fetchStatus = async () => {
      const status = await FetchStatus(); // Make sure FetchParameters() returns a promise
      if(!status.start && !status.stop && !status.auto && !status.manual) {
          return;
      }
        setStatus(status);
      console.log("status", status);
    };

    const intervalId = setInterval(() => {
      fetchStatus();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);  // Empty dependency array to run the effect only once



  //get the thresholds stored in localStrorage
  const thresholds = JSON.parse(localStorage.getItem("thresholds"));

  const raiseAlert = (type, value) => {
    if (value > thresholds[type] && !alertsShown[type]) {
      alert(`${type} is beyond ${thresholds[type]}!`);
  
      // Set the alert as shown for this type
      setAlertsShown(prevState => ({
        ...prevState,
        [type]: true
      }));
    }
  };
  
  useEffect(() => {
    raiseAlert("ec", parameter.ec);
    raiseAlert("ph", parameter.ph);
    raiseAlert("temperature", parameter.temperature);
    raiseAlert("humidity", parameter.humidity);
  }
  , [parameter]);  // Empty dependency array to run the effect only once
  /* 
  raiseAlert("ec", parameter.ec);
  raiseAlert("ph", parameter.ph);
  raiseAlert("temperature", parameter.temperature);
  raiseAlert("humidity", parameter.humidity); */
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="temperature" value={parameter.temperature} recentData={recentTemp} />
          <Widget type="ph" value={parameter.ph} recentData={recentPh} />
          <Widget type="ec" value={parameter.ec} recentData={recentEc} />
          <Widget type="humidity" value={parameter.humidity} recentData={recentHumidity} />
        </div>
        <div className="controlSystem">
          <div className="controlSystemLeft">
            <SystemInfo
              controlDevices={status}
              parameters={parameter}
            />
          </div>
          <div className="controlSystemRight">
            <h2 className="controlTitle">Control Devices</h2>
            <div className="controlDevice">
              <div className="charts">
                <Featured type="light" title="Light   " status={status} />
              </div>
              <div className="charts">
                <Featured type="ecPump" title="EC Pump" status={status} />
              </div>
            </div>
            <div className="controlDevice">
              <div className="charts">
                <Featured type="phPump" title="PH Pump" status={status} />
              </div>
              <div className="charts">
                <Featured type="oxygenPump" title="Oxy Pump" status={status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
