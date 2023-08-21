import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer,
        TableHead, TableRow} from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import "./notification.scss";
import Paper from "@mui/material/Paper";


const Notification = () => {
    var [count, setCount] = useState(1);
    const [notification, setNotification] = useState([]);
    //get data from api, get hitory table and display in table format
    useEffect(() => {
        axios({
            method: "get",
            baseURL: "http://localhost:3000/notifications",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then((res) => {
            console.log("respone",res.data);
            setNotification(res.data);
            // setParameters(res.data);

        });
    }, [])
    //return table
    return (
        <div className="notification">
            <Sidebar />
            <div className="notificationContainer">
                <Navbar />
                <h1 className="notificationTitle">Notification</h1>
                <TableContainer  className="tableNoti">
                    <Table sx={{minWidth: 650}} aria-aria-label="simple table">
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell className="tableCell">ID</TableCell>
                                <TableCell className="tableCell">Message</TableCell>
                                <TableCell className="tableCell">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notification.map((notification) => (
                                <TableRow key={notification.noti_id}>
                                    {/* ID is the variable count, each row count increases by 1 */}
                                    <TableCell className="tableCell">{count++}</TableCell>
                                    <TableCell className="tableCell">{notification.message}</TableCell>
                                    <TableCell className="tableCell">{new Date(notification.time).toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
               {/*  <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Message</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notification.map((notification) => (
                            <tr key={notification.id}>
                                <td>{notification.id}</td>
                                <td>{notification.message}</td>
                                <td>{new Date(notification.time).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
            </div>
        </div>
    )
}

export default Notification;