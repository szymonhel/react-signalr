// @flow
import * as React from 'react';
import {useState} from "react";

export const ChatInput = (props) => {
    var [user, setUser] = useState('');
    var [message, setMessage] = useState('');

const onSubmit = (e) => {
    e.preventDefault();

    const isUserProvided = user && user !== '';
    const isMessageProvided = message && message !== '';

    if (isUserProvided && isMessageProvided){
        setMessage('');
        props.sendMessage(user, message);
    }
}
    const onUserUpdate = (e) => {
        setUser(e.target.value);
    }
    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }
    return (
       <form onSubmit={onSubmit}>
           <label htmlFor="user">User:</label>
           <br />
               <input id="user" name="user" value={user} onChange={onUserUpdate}/>
                <br/>
           <label htmlFor="message">Message:</label>
           <br />
           <textarea
               row="3"
               type="text"
               id="message"
               name="message"
               value={message}
               onChange={onMessageUpdate} />
           <br/><br/>
           <button>Submit</button>
       </form>
    );
};

export default ChatInput;
