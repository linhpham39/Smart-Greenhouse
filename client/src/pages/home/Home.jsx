import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import SystemInfo from "../../components/infor/SystemInfo";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
const Home = () => {
  //fetch data from api
  const { data: controlDevices, isPending, error } = useFetch(
    "http://localhost:3000/devices"
  );
  const { data: parameters, isPending1, error1 } = useFetch(
    "http://localhost:3000"
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
  // console.log('status light', controlDevices.light);
  //console.log('para',parameters);
  //  var controlDevices = {
  //   light: "On",
  //   ph_pump: "Off",
  //   ec_pump: "Off",
  //   oxi_pump: "On",
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
          <Widget type="temperature" value = {parameters.temperature}/>
          <Widget type="ph" value = {parameters.ph}/>
          <Widget type="ec" value={parameters.ec}/>
          <Widget type="humidity" value= {parameters.humidity}/>
        </div>
        <div className="controlSystem">
          <div className="controlSystemLeft">
            <SystemInfo 
              controlDevices={controlDevices} 
              parameters={parameters}
            />
          </div>
          <div className="controlSystemRight">          
          <h2 className="controlTitle">Control Devices</h2>
            <div className="controlDevice">
              <div className="charts">
                <Featured type="Light" status = {controlDevices.light}/>
              </div>
              <div className="charts">
              <Featured type="EC pump" status = {controlDevices.ec_pump}/>                
              </div>
            </div>
            <div className="controlDevice">
              <div className="charts">
               <Featured type="PH pump" status = {controlDevices.ph_pump}/>
                {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
              </div>
              <div className="charts">
                <Featured type="Oxi pump" status = {controlDevices.oxi_pump}/>
                {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
