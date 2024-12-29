import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from './contextApi/ChatContext';
// import beepSound from "./assets/ping-82822.mp3"

const URL = "http://localhost:8080";

export const socket = io(URL, {
    autoConnect: false,
    reconnectionAttempts: 3,
});

const Socket = () => {
    const {
        setUserId,
        setIsConnected,
        setMessages,
        setOnlineUsers,
        receiver,
        setReceiver,
        setIsSearching,
        setIsTyping,
        setMessage,
        setIsSending,
    } = useChat();

    useEffect(() => {
        socket.connect();
        console.log("Socket connected");

        return () => {
            socket.disconnect();
            console.log("Socket disconnected");
        };
    }, []);

    useEffect(() => {
        const handleConnect = () => {
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            setIsConnected(false);
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
        };
    }, [setIsConnected]);

    useEffect(() => {
        const uniqueId = uuidv4();
        console.log("Generated User ID:", uniqueId);
        setUserId(uniqueId);

        socket.emit("new-online-user", uniqueId, (error) => {
            if (error) {
                alert(`Error connecting: ${error}`);
            }
        });

        const handleOnlineUsers = (users) => {
            setOnlineUsers(users);
        };

        const handleSendMessage = (message) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { stranger: message },
            ]);
            setIsTyping(false);
        };

        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { you: message },
            ]);
            setIsSending(false);
        };

        const handleUserPaired = (pairedReceiver) => {
            setReceiver(pairedReceiver);
            setIsSearching(false);
            // Uncomment to play sound on pairing
            // const audio = new Audio(beepSound);
            // audio.play();
        };

        const handleChatClose = () => {
            setReceiver("");
            setMessage("");
            setIsTyping(false);
        };

        const handleTyping = () => {
            setIsTyping(true);
        };

        const handleTypingStop = () => {
            setIsTyping(false);
        };

        socket.on("get-online-users", handleOnlineUsers);
        socket.on("send-message", handleSendMessage);
        socket.on("receive-message", handleReceiveMessage);
        socket.on("user-paired", handleUserPaired);
        socket.on("chat-close", handleChatClose);
        socket.on("typing", handleTyping);
        socket.on("typing stop", handleTypingStop);

        return () => {
            socket.off("get-online-users", handleOnlineUsers);
            socket.off("send-message", handleSendMessage);
            socket.off("receive-message", handleReceiveMessage);
            socket.off("user-paired", handleUserPaired);
            socket.off("chat-close", handleChatClose);
            socket.off("typing", handleTyping);
            socket.off("typing stop", handleTypingStop);
        };
    }, [
        setUserId,
        setOnlineUsers,
        setMessages,
        setReceiver,
        setMessage,
        setIsTyping,
        setIsSending,
        setIsSearching,
    ]);
};

export default Socket;
