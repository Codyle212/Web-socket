import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import cloaseIcon from '../../icons/closeIcon.png';
import './InforBar.css';

const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer"></div>
      <a href="/">
        <img src={cloaseIcon} alt="close" />
      </a>
    </div>
  );
};
export default InfoBar;
