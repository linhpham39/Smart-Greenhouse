import fs from 'fs';

const filePath = './thresholds.json';

const getThresholds = () => {
   const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const setThreshold = (ecValue, phValue, temperatureValue, humidityValue) => {
  fs.writeFileSync(filePath, JSON.stringify(
    {
        "ec": ecValue,
        "ph": phValue,
        "temperature": temperatureValue,
        "humidity": humidityValue
      }
  )); 
};

export default { getThresholds, setThreshold };
