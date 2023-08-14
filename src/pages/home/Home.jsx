import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import SystemInfo from "../../components/infor/SystemInfo";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="temperature" value = "38"/>
          <Widget type="ph" value ="2"/>
          <Widget type="ec" value="3.4"/>
          <Widget type="humidity" value="30"/>
        </div>
        <p className="controlTitle">Control Devices</p>
        <div className="controlSystem">
          <SystemInfo/>
          <div className="controlSystemRight">          
            <div className="controlDevice">
              <div className="charts">
                <Featured type="Light" status = "Off"/>
              </div>
              <div className="charts">
                <Featured type="PH pump" status = "On"/>
              </div>
            </div>
            <div className="controlDevice">
              <div className="charts">
                <Featured type="EC pump" status = "Off"/>
                {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
              </div>
              <div className="charts">
                <Featured type="Oxi pump" status = "Off"/>
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
