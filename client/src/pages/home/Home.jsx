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
const Home = () => {
  //fetch data from api

  const { data: recentData, isPending1, error1 } = useFetch(
    "https://hydroponicapi.azurewebsites.net/measurements/latest/30"
  );

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
      "https://hydroponicapi.azurewebsites.net/measurements/latest/1"
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
    "http://localhost:3000/devices"
  );

  const { data: devices, isPending2, error2 } = useFetch(
    "http://localhost:3000/allDevices"
  );

  /* axios({
    method: "get",
    baseURL: "https://hydroponicapi20230814221546.azurewebsites.net/measurements/latest/1",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    console.log(res.data);
    // setParameters(res.data);
    
  }); */

  // console.log('device',controlDevices);
  // console.log('status Light', controlDevices.Light);
  //console.log('para',parameters);
  //  var controlDevices = {
  //   Light: "On",
  //   PhPump: "Off",
  //   EcPump: "Off",
  //   OxygenPump: "On",
  // };
  // var parameters = {
  //   temperature: "30",
  //   ph: "2",
  //   ec: "3.4",
  //   humidity: "30",
  // };

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
