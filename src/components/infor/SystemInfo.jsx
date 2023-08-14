const SystemInfo = () => {
    return (
        <div className="controlSystemLeft">
            <h2 className="systemInfo">System Information</h2>
            <p className="numberDevice">The number of devices: 4</p>
            <div className="autoControl">
              <p>Activate automatic control</p>
              <input type="checkbox"  checked/>
              <span class="slider round"></span>
            </div>
            <p className="statusDevice">Current status:</p>
            <ul className="currentDevices">
              <li className="currentDevice">Light: ON</li>
              <li className="currentDevice">PH pump: OFF</li>
              <li className="currentDevice">EC pump: OFF</li>
              <li className="currentDevice">Oxi pump: OFF</li>
            </ul>
            <p className="thresholdDevice">Current threshold:</p>
            <ul className="threshold">
              <li className="currentThreshold">Temperature: 50 °C</li>
              <li className="currentThreshold">PH: 7.5</li>
              <li className="currentThreshold">EC: 2.5</li>
              <li className="currentThreshold">Humidity: 50%</li>
            </ul>
          </div>
    )
}

export default SystemInfo