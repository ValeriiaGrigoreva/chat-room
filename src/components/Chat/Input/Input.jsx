import React from 'react';
import style from './Input.module.css';

//Input UI
const Input = ({message, setMessage, sendMessage,}) => {
    return (
        <form className={style.form}>
            <input className={style.input} placeholder="Type a message..." value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event):null} 
            />
            <button className={style.sendButton} onClick={(event) => sendMessage(event)}>Send</button>
        </form>
    )
}

export default Input;