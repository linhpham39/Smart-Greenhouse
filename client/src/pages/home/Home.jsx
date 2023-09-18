import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table1 from "../../components/table/Table";
import SystemInfo from "../../components/infor/SystemInfo";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { APImeasurements_count1, APImeasurements_count30, APIsystem_status, APIsystem_control } from "../../config"
//env


const Home = () => {
  //fetch data from api

  const { data: recentData, isPending1, error1 } = useFetch(
    APImeasurements_count30
  );
  var alertShown = {
    ec: false,
    ph: false,
    temperature: false,
    humidity: false,
    dataShown: false
  }

  console.log("recentData", recentData);
  const recentTemp = recentData.map((item) => ({
    "name": item.timeStamp,
    "Total": item.temperature
  })).reverse();
  const recentPh = recentData.map((item) => ({
    "name": item.timeStamp,
    "Total": item.ph
  })).reverse();
  const recentEc = recentData.map((item) => ({
    "name": item.timeStamp,
    "Total": item.ec
  })).reverse();
  const recentHumidity = recentData.map((item) => ({
    "name": item.timeStamp,
    "Total": item.humidity
  })).reverse();


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
      alertShown.dataShown = true;
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
    console.log("ALLERT SHOWN", type,alertShown[type]);
    if (value > thresholds[type] && !alertShown[type] && alertShown.dataShown) {
      alert(`${type} is beyond ${thresholds[type]}!`);
      alertShown[type] = true;
    }
  }

  raiseAlert("ec", parameter.ec);
  raiseAlert("ph", parameter.ph);
  raiseAlert("temperature", parameter.temperature);
  raiseAlert("humidity", parameter.humidity);
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
        {/* <div className="listContainer">
          <div className="listTitle" >Latest Transactions</div>
          <Table1 devices={devices} />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
