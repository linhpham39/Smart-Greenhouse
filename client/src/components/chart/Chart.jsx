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

const data = [
  { name: "05/07", Total: 10 },
  { name: "06/07", Total: 7 },
  { name: "07/07", Total: 12.5 },
  { name: "08/07", Total: 3.5 },
  { name: "09/07", Total:  8 },
  { name: "11/07", Total: 6 },
  { name: "12/07", Total: 6 },
  { name: "13/07", Total: 6 },
  { name: "14/07", Total: 6 },
  { name: "14/07", Total: 6 },
  { name: "10/07", Total: 6 },
  { name: "10/07", Total: 6 },
  { name: "10/07", Total: 6 },
  { name: "10/07", Total: 6 },
  { name: "10/07", Total: 6 },
];

const Chart = ({ type, aspect}) => {
  
  return (
    <div className="chart">
      <div className="title">{type} Usage</div>
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
               />
            <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
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
