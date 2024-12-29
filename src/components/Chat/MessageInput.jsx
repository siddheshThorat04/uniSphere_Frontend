import React, { useEffect } from 'react'
import { useChat } from '../../contextApi/ChatContext';
import { socket } from '../../Socket';
import { VscDebugRestart } from "react-icons/vsc";
import { BsSend } from "react-icons/bs";
import { useDarkThemeContext } from '../../contextApi/DarkTheme';
const MessageInput = () => {
    const { userId, onlineUsers, isSearching, setIsSearching, receiver, setReceiver, setMessages, isSending, setIsSending, message, setMessage, setIsTyping } = useChat()
    const { isDark } = useDarkThemeContext();

    const newChat = () => {
        setIsSearching(true)
        setMessages([])
        socket.emit("pairing-user", userId, (error) => {
            return
        })
        return () => {
            socket.off("pairing-user");
        };
    }

    const sendMessage = () => {
        if (isSending) return
        if (message === "") return
        setIsSending(true)
        socket.emit("send-message", receiver, message, () => {
            setMessage("")
        })
    }

    const disconnectChat = () => {
        if (receiver) {
            socket.emit("chat-close", receiver, () => {
                setReceiver("")
                setIsTyping(false)
                setMessage("")
            })
        } else {
            socket.emit("unpairing-user", userId, () => {
                setIsSearching(false)
            })
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    const typingHandle = (e) => {
        if (e.target.value !== "") {
            socket.emit("typing", receiver)
        } else {
            socket.emit("typing stop", receiver)
        }
    }

    useEffect(() => {
        if (userId && onlineUsers.find((user) => user.userId === userId)) {
            newChat()
        } else {
            // navigate("/")
        }
    }, []);

    const navigateToHome = () => {
        
        window.location.href = "/chatHome";
      };
    
    return (
        <div className='messageInputWrapper'>
            
            {receiver || isSearching ?
                <button className={isDark==="false"?"stopButton text-black border border-black  ":"stopButton border border-white  text-white "} onClick={navigateToHome}>
                    <VscDebugRestart/>
                </button> :
                <button className="stopButton" onClick={navigateToHome} disabled={isSearching}>
                    <VscDebugRestart/>
                </button>
            }
            <input type='text' placeholder='Type  your message...' className={isDark==="false"?'inputMsg border-[0.5px] border-black bg-transparent text-black ':"inputMsg bg-transparents text-white border-[0.5px] border-white "} onChange={(e) => {
                setMessage(e.target.value)
                typingHandle(e)
            }} value={message} onKeyDown={(e) => handleKeyPress(e)} disabled={!receiver} />
            <button className='sendButton' onClick={sendMessage}
                disabled={!receiver || isSending}>
                <BsSend  className='sendIcon' />
            </button>
        </div>
    )
}

export default MessageInput