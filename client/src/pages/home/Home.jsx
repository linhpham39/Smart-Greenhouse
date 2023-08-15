import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import SystemInfo from "../../components/infor/SystemInfo";

const Home = () => {
  var controlDevices = {
    light: "On",
    ph: "Off",
    ec: "Off",
    oxi: "Off",
  };
  var parameters = {
    temp: "30",
    ph: "2",
    ec: "3.4",
    humidity: "30",
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="temperature" value = {parameters.temp}/>
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
                <Featured type="PH pump" status = {controlDevices.ph}/>
              </div>
            </div>
            <div className="controlDevice">
              <div className="charts">
                <Featured type="EC pump" status = {controlDevices.ec}/>
                {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
              </div>
              <div className="charts">
                <Featured type="Oxi pump" status = {controlDevices.oxi}/>
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
