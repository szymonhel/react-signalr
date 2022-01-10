// @flow
import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import ChatInput from "./ChatInput";
import ChatWindow from "./ChatWindow";
import {HubConnectionBuilder} from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";


export const Chat = () => {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

useEffect(() => {

    const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/hubs/board', {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
}, []);

useEffect(() => {
    if (connection){
        connection.start().then(result => {
            connection.on('ReceiveMessage', message => {
                const updatedChat = [...latestChat.current, message];
                setChat(updatedChat);
            })
        }).catch(e => console.log('Connection failed: ', e));
    }
}, [connection]);

const sendMessage = async (user, message) => {
    const chatMessage = {
        user: user,
        message: message
    };

    if (connection._connectionStarted){
        try{
            await connection.send('SendMessage', chatMessage);
        }catch(e) {
            console.log(e);
        }
    }
};

    return (
        <div>
            <ChatInput sendMessage={sendMessage}/>
            <hr/>
            <ChatWindow chat={chat}/>
        </div>
    );
};

export default Chat;
