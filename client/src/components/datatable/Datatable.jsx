import "./datatable.scss";

import Chart from "../chart/Chart";
const Datatable = (type) => {
  return (
    <div className="rightFeature">
        <Chart title={`${type} Usage`} aspect={2 / 1} />

      </div>
  );
};

export default Datatable;
