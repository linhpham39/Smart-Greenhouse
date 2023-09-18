const localStorageKey = 'thresholds';

const getThresholds = () => {
  const data = localStorage.getItem(localStorageKey);
  return data ? JSON.parse(data) : null;
};

const setThreshold = (ecValue, phValue, temperatureValue, humidityValue) => {
  const thresholds = {
    ec: ecValue,
    ph: phValue,
    temperature: temperatureValue,
    humidity: humidityValue,
  };

  try {
    localStorage.setItem(localStorageKey, JSON.stringify(thresholds));
    console.log('Thresholds updated successfully.');
  } catch (error) {
    console.error('Error updating thresholds:', error);
  }
};

export { getThresholds, setThreshold };
