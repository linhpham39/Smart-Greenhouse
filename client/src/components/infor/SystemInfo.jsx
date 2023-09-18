import React from 'react'
import './systemInfo.scss'
import { useState } from 'react'
import axios from 'axios'
import  { APIsystem_control} from "../../config"
 
const SystemInfo = ({controlDevices, parameters}) => {
    
    const changeSystemSatus = (message) => {
        axios({
            method: "post",
            baseURL: APIsystem_control,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: {
                'ActionName':`${message}`,	
            }
        }).then((res) => {
            console.log(res.data);
            console.log('change status successfully');
        }
        ).catch((err) => {
            console.log('change status failed');
            //if fail, change the input back to the previous value
            var input = document.getElementsByClassName("toggle-input")[0];
            input.checked = !input.checked;
            console.log("cannot change status");
        }
        )
        ;
        console.log("message", message);
    }
    const handleToggle = (e) => {
        console.log("status", e.target.checked);
        if (e.target.checked) {
            changeSystemSatus("SwitchToAutoMode");
        } else {
            changeSystemSatus("SwitchToManualMode");
        }

    }
    return (
        <div className="controlSystemLeft">
            <h2 className="title">System Information</h2>
           
            <div className="systemInfo">
                <div className="autoControl">
                    <p>Activate automatic control:</p>
                    <div className="switch">
                        <label className="toggle">
                        <input className="toggle-input" checked={controlDevices.autoMode} type="checkbox" onChange={(e) => handleToggle(e)}/>
                        <span className="toggle-label" data-off="OFF" data-on="ON"></span>
                        <span className="toggle-handle"></span>
                        </label>
                    </div>
                </div>

                <br />
                <p className="numberDevice">The number of devices:  4</p>
                <br />
                <p className="statusDevice">Current status:</p>
                <ul className="currentDevices">
                <li className="currentDevice">Light: {controlDevices.light ? "On" : "Off"}</li>
                <li className="currentDevice">PH pump: {controlDevices.phPump ? "On" : "Off"}</li>
                <li className="currentDevice">EC pump: {controlDevices.ecPump ? "On" : "Off"}</li>
                <li className="currentDevice">Oxi pump: {controlDevices.oxygenPump ? "On" : "Off"}</li>
                </ul>
                <br />
                <p className="thresholdDevice">Current parameters:</p>
                <ul className="threshold">
                <li className="currentThreshold">Temperature: {parameters.temperature}</li>
                <li className="currentThreshold">PH: {parameters.ph}</li>
                <li className="currentThreshold">EC: {parameters.ec}</li>
                <li className="currentThreshold">Humidity: {parameters.humidity}</li>
                </ul>
            </div>
        </div>
    )
}

export default SystemInfo