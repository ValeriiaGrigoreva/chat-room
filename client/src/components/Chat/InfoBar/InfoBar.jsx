import React from 'react';
import style from './InfoBar.module.css';
import closeIcon from '../../../icons/closeIcon.png';
import onlineIcon from '../../../icons/onlineIcon.png';

//InfoBar UI
const InfoBar = ({room}) => {
    return (
        <div className={style.infoBar}>
            <div className={style.leftInnerContainer}>
                <img className={style.onlineIcon} src={onlineIcon} alt="online" />
                <h3>{room}</h3>
            </div>
            <div className={style.rightInnerContainer}>
                <a href="/"><img src={closeIcon} alt="close" /></a>
            </div>
        </div>
    )
}

export default InfoBar;