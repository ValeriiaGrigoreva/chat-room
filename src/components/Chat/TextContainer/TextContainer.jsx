import React from 'react';

import onlineIcon from '../../../icons/onlineIcon.png';

import style from './TextContainer.module.css';

//UI for information about current users
const TextContainer = ({ users }) => (
  <div className={style.textContainer}>
    
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className={style.activeContainer}>
              <h2>
                {/*map through all users and display their names*/}
                {users.map(({name}) => (
                  <div key={name} className={style.activeItem}>
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;