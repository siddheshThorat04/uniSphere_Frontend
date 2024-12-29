import React, { useEffect } from 'react'

import Messages from '../components/Chat/Messages';
import MessageInput from '../components/Chat/MessageInput';
import { useChat } from '../contextApi/ChatContext';
import {useAuthContext} from '../contextApi/authContext';

const Chat = () => {
    const {receiver}=useChat()
    const {authUser}=useAuthContext()
    useEffect(() => {
        console.log(authUser);
        console.log("receiver in chat.jsx",receiver);
    },[])
    return (
        <>
            <div className="chat">
            <Messages />
            <MessageInput />
            </div>
        </>

    )
}

export default Chat