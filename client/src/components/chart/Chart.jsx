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
  var minTotal = Math.min(...data.map((item) => item.Total));
  var maxTotal = Math.max(...data.map((item) => item.Total));

  // Set the Y-axis domain based on the calculated values
  var yAxisDomain = [Math.floor(minTotal), Math.ceil(maxTotal)];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); // Customize the time format as needed
  };
  return (
    <div className="chart">
      <div className="title">{type} Rencent</div>
      <ResponsiveContainer width="80%" aspect={aspect}>
        <div className="chart-scroll-container">
          <AreaChart
            width={730}
            height={350}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              tickFormatter={formatTimestamp}
               />
            <YAxis 
                label={{ value: "Values", angle: -90, position: "insideLeft" }}
                domain={yAxisDomain}
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
