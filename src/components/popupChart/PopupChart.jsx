import React from 'react';
import Chart from '../chart/Chart';
import './popUpChart.scss';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const PopUpChart = ({ title, recentData}) => {
  return (
    <>
  <Popup trigger={<span className='link'>View {title} recently</span>} 
        position="right center"
        closeOnDocumentClick
        modal
        nested
        className="popup-content"
        >
    <div>
    <Chart type={title} aspect={10 / 3} recentData={recentData} />
    </div>
  </Popup>
    </>

  );
};

export default PopUpChart;
