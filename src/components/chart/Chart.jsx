import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const Chart = ({ type, aspect, recentData}) => {
  const data = recentData;
  // Calculate the minimum and maximum values of the Total property
  var minTotal = Math.min(...data.map((item) => item.Total)) - 5;
  var maxTotal = Math.max(...data.map((item) => item.Total)) + 5;

  // Set the Y-axis domain based on the calculated values
  var yAxisDomain = [Math.floor(minTotal), Math.ceil(maxTotal)];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + 7); // Add 7 hours
    return date.toLocaleTimeString(); // Customize the time format as needed
  };
  return (
    <div className="chart">
      <div className="title">Recent {type} </div>
      <ResponsiveContainer width="80%" aspect={aspect}>
        <div className="chart-scroll-container">
          <AreaChart
            width={1500}
            height={400}
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              stroke="gray"
               />
            <YAxis 
                label={{ value: "Values", angle: -90, position: "insideLeft" }}
                domain={yAxisDomain}
                tickCount={12}
                 />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
