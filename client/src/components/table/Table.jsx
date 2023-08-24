import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState } from "react";	
import Pagination from "../pagination/Pagination";
import useFetch from "../../hooks/useFetch";
// import { useEffect, useState } from "react";

const Table1 = ({devices}) => {
  //fetch data from api, get devices table and display in table format
  const [currentPage, setCurrentPage] = useState(1);
  
  const devicesPerPage = 4;
  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);

  const totalPages = Math.ceil(devices.length / devicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Time</TableCell>
                <TableCell className="tableCell">Light</TableCell>
                <TableCell className="tableCell">EC Pump</TableCell>
                <TableCell className="tableCell">PH Pump</TableCell>
                <TableCell className="tableCell">Oxi Pump</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentDevices.map((device) => (
                <TableRow key={device.id}>
                  {/* display date */}
                  <TableCell className="tableCell">{new Date(device.time).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })}</TableCell>
                  <TableCell className="tableCell">{new Date(device.time).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${device.Light}`}>{device.Light}</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${device.EcPump}`}>{device.EcPump}</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${device.PhPump}`}>{device.PhPump}</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${device.OxygenPump}`}>{device.OxygenPump}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        />
    </div>
  );
};

export default Table1;
