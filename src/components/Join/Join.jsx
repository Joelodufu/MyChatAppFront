import React, {useState} from 'react';
import {Link} from 'react-router-dom'


import './Join.css'

function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('')
    return (
        <div className='joinOuterContainer'>
            <div className="joinInnerContainer">
                <h1 className='heading'>
                    Join
                </h1>
                <p >Type you name, then the name of the Rome you want to Join or create</p>
                <div><input placeholder='Name' className='joinInput' type="text" onChange={(event)=> setName(event.target.value)}/></div>
                <div><input placeholder='Room' className='joinInput' type="text" onChange={(event)=> setRoom(event.target.value)}/></div>

                <Link to={`/chat?name=${name}&room=${room}`} onClick = {event=>(!name||!room)?event.preventDefault():null}>
                <button className='button' type='submit'>Sign In</button>
                </Link> 
            </div>
        </div>
    )
};

export default Join
