import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
        "cd_id": 21,
        "light": "On",
        "fan": "Off",
        "water_pump": "On",
        "time": "2023-07-05T20:26:25.598Z"
    },
    {
        "cd_id": 20,
        "light": "On",
        "fan": "On",
        "water_pump": "On",
        "time": "2023-07-05T20:26:22.942Z"
    },
    {
        "cd_id": 19,
        "light": "On",
        "fan": "On",
        "water_pump": "Off",
        "time": "2023-07-05T20:25:46.715Z"
    }
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">Water Pump</TableCell>
            <TableCell className="tableCell">Light</TableCell>
            <TableCell className="tableCell">Fan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {/* display date */}
              <TableCell className="tableCell">{new Date(row.time).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                })}</TableCell>
              <TableCell className="tableCell">{new Date(row.time).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.light}`}>{row.light}</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.fan}`}>{row.fan}</span>
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.water_pump}`}>{row.water_pump}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
