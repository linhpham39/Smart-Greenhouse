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

/* const data =
[{name: '2023-08-28T04:06:45.4', Total: 27.9}, 
{name: '2023-08-28T04:06:41.88', Total: 27.9},
{name: '2023-08-28T04:06:38.227', Total: 27.9}, 
{name: '2023-08-28T04:06:34.637', Total: 27.9},
{name: '2023-08-28T04:06:29.597', Total: 27.9},
{name: '2023-08-28T04:06:26.457', Total: 27.9},
{name: '2023-08-28T04:06:23.33', Total: 27.9},
{name: '2023-08-28T04:06:19.83', Total: 27.9},
{name: '2023-08-28T04:06:16.197', Total: 27.9},
{name: '2023-08-28T04:06:12.92', Total: 27.9}, 
{name: '2023-08-28T04:05:52.28', Total: 28.1},
{name: '2023-08-28T04:05:49.103', Total: 28.1},
{name: '2023-08-28T04:05:43.307', Total: 28.1},
{name: '2023-08-28T04:05:40.197', Total: 28.2},
{name: '2023-08-28T04:05:36.71', Total: 28.2}] */

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
