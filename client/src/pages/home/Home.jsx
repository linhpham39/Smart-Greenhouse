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
import  { APImeasurements_count1,APImeasurements_count30, APIsystem_status,  APIsystem_control } from "../../config"
//env


const Home = () => {
  //fetch data from api

  /* const { data: recentData, isPending1, error1 } = useFetch(
    APImeasurements_count30
  ); */
  //fetch data from api
  const [recentData, setRecentData] = useState([]);
  useEffect(() => {
    const fetchRecentData = async () => {
      const res = await axios.get(
        APImeasurements_count30
      );
      const data = await res.data;
      setRecentData(data);
    };
    fetchRecentData();
  }, []);

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
    const res = await axios.get(
      APImeasurements_count1
    );
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
  }, []); // Empty dependency array to run the effect only once
  const { data: latest, isPending, error } = useFetch(
    process.env.APIsystem_status
  );

  const { data: devices, isPending2, error2 } = useFetch(
    "http://localhost:3000/allDevices"
  );


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="temperature" value={parameter.temperature} recentData={recentTemp} />
          <Widget type="ph" value={parameter.ph} recentData={recentPh}/>
          <Widget type="ec" value={parameter.ec} recentData={recentEc}/>
          <Widget type="humidity" value={parameter.humidity} recentData={recentHumidity}/>
        </div>
        <div className="controlSystem">
          <div className="controlSystemLeft">
            <SystemInfo
              controlDevices={latest}
              parameters={parameter}
            />
          </div>
          <div className="controlSystemRight">
            <h2 className="controlTitle">Control Devices</h2>
            <div className="controlDevice">
              <div className="charts">
                <Featured type="Light" title="Light   " status={latest} />
              </div>
              <div className="charts">
                <Featured type="EcPump" title="EC Pump" status={latest} />
              </div>
            </div>
            <div className="controlDevice">
              <div className="charts">
                <Featured type="PhPump" title="PH Pump" status={latest} />
              </div>
              <div className="charts">
                <Featured type="OxygenPump" title="Oxy Pump" status={latest} />
              </div>
            </div>
          </div>
        </div>
        <div className="listContainer">
          <div className="listTitle" >Latest Transactions</div>
          <Table1 devices={devices} />
        </div>
      </div>
    </div>
  );
};

export default Home;
