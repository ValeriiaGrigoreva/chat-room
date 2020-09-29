import React, { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import style from './Chat.module.css';

import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';
import Messages from './Messages/Messages';
import TextContainer from './TextContainer/TextContainer';

let socket;

const Chat = ( {location} ) => {
    //state variable
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect (() => {
        //getting of name and room 
        const { name, room } = queryString.parse(location.search);

        //connection to the server
        socket = io(ENDPOINT);
        
        //adding of name and room to the state variable
        setName(name);
        setRoom(room);

        //emiting to the server join event
        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
              }
        });

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        //updating messages array
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        //updating users in the room
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        //emiting of sendMessage event to the server
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    //chat UI
    return (
        <div className={style.outterContainer}>
            <div className={style.container}>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />  
            </div>
            <TextContainer users={users} /> 
        </div>
    )
}

export default Chat;