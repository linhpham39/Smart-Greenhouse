import React from 'react'
import './systemInfo.scss'
const SystemInfo = ({controlDevices, parameters}) => {
    return (
        <div className="controlSystemLeft">
            <h2 className="title">System Information</h2>
           
            <div className="systemInfo">
                <div className="autoControl">
                    <p>Activate automatic control:</p>
                    <div className="switch">
                        <label className="toggle">
                        <input className="toggle-input" type="checkbox" />
                        <span className="toggle-label" data-off="OFF" data-on="ON"></span>
                        <span className="toggle-handle"></span>
                        </label>
                    </div>
                </div>
                <p className="numberDevice">The number of devices:  4</p>

                <p className="statusDevice">Current status</p>
                <ul className="currentDevices">
                <li className="currentDevice">Light: {controlDevices.light}</li>
                <li className="currentDevice">PH pump: {controlDevices.ph_pump}</li>
                <li className="currentDevice">EC pump: {controlDevices.ec_pump}</li>
                <li className="currentDevice">Oxi pump: {controlDevices.oxi_pump}</li>
                </ul>
                <p className="thresholdDevice">Current threshold:</p>
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