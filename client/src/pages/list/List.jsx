import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import Chart from "../../components/chart/Chart"
const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Chart type="light" aspect={2 / 1} />
        {/* <Chart type="ph" aspect={2 / 1} />
        <Chart type="ec" aspect={2 / 1} />
        <Chart type="oxi" aspect={2 / 1} /> */}
      </div>
    </div>
  )
}

export default List