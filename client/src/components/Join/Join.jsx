import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Join.module.css';

const Join = () => {
    //state variables for name and room
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    //join screen UI
    return (
        <div className={style.JoinOutterContainer}>
            <div className={style.joinInnerContainer}>
                <h1 className={style.heading}>Chat</h1>
                <div><input placeholder="Name" className={style.joinInput} type="text" onChange={(event) => setName(event.target.value)} /></div>  
                <div><input placeholder="Room" className={style.joinInput} type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                {/*transfer link to the chat component*/}
                <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={style.button} type="submit">Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;