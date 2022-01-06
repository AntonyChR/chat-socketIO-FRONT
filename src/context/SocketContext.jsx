import { createContext, useContext, useEffect } from "react";
import { scrollToBottomAnimated} from "../helpers/scrollToBottom";
import {useSocket} from "../hooks/useSocket";
import {types} from "../types/types";
import {AuthContext} from "./AuthContext";
import {ChatContext} from './ChatContext';


export const SocketContext = createContext();

export const SocketProvider = ({children})=>{
    const apiUrl = import.meta.env.VITE_API_URL;

    const {socket, online,  connectSocket, disconnectSocket} = useSocket(apiUrl);
    const {auth} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext)

    useEffect(()=>{
        if(auth.logged) connectSocket(); 
    },[auth, connectSocket])
    useEffect(()=>{
        if(!auth.logged) disconnectSocket(); 
    },[auth, disconnectSocket])

    useEffect(()=>{
        socket?.on('user-list', (users)=>{
            dispatch({
                type:types.loadUsers,
                payload: users
            });
        });
    },[socket, dispatch])

    useEffect(()=>{
        socket?.on('personal-message', (msg)=>{
            dispatch({
                type:types.newMessage,
                payload:msg
            });
            scrollToBottomAnimated('messages');
        });
    },[socket])

    return (
        <SocketContext.Provider value={{socket, online}}>
            {children}
        </SocketContext.Provider>
    )
}
