import React from 'react';
import style from './Message.module.css';


const Message = ({ message: { text, user, time }, name}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    //checking if message sent by current user
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }
    return (
        //styling depens on sender (current user or not)
        isSentByCurrentUser
        ? (
            <div className={style.messageContainer + " " + style.justifyEnd}>
                <p className={style.sentText + " " + style.pr10}>{trimmedName}</p>
                <p className={style.sentText + " " + style.pr10}>{time}</p>
                <div className={style.messageBox + " " + style.backgroundBlue}>
                    <p className={style.messageText + " " + style.colorWhite}>{text}</p>
                </div>
            </div>
        )
        : (
            <div className={style.messageContainer + " " + style.justifyStart}>
                <div className={style.messageBox + " " + style.backgroundLight}>
                    <p className={style.messageText + " " + style.colorWhite}>{text}</p>
                </div>
                <p className={style.sentText + " " + style.pl10}>{user}</p>
                <p className={style.sentText + " " + style.pl10}>{time}</p>
            </div>
        )
        
    )
}

export default Message;