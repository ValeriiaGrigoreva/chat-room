import React from 'react';
import style from './Messages.module.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

//Messages UI
const Messages = ({messages, name}) => {
    return (
        <ScrollToBottom className={style.messages}>
            {/*map through messages array and display message components*/}
            {messages.map((message,i) => <div key={i}><Message message={message} name={name}/></div>)}
        </ScrollToBottom>
    )
}

export default Messages;