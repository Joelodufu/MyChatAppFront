import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import socketio from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import './Chat.css'
let socket;



function Chat({location}) {

    //User and room state
   const [name, setName]=useState('');
   const  [room, setRoom]=useState('');

   //messages state
   const  [message, setMessage]=useState('');
   const  [messages, setMessages]=useState([]);


   const ENDPOINT = 'https://joelchatapp.herokuapp.com/'

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        
        socket=socketio(ENDPOINT);
        
        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, ()=>{
            
        });

        return()=>{
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]) ;


    //push message to messages array 
    useEffect(()=>{
    socket.on('message', (message)=>{
        setMessages([...messages, message])
    }) 
    },[messages])

//function for sending messages


    const sendMessage = (event)=>{
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, ()=>setMessage(""));
            event.target.value='';
        }
    }

    console.log(message, messages);
    return (
        <div className='outerContainer'>
            <div className='container'>

            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
             <Input messages={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
};


export default Chat
