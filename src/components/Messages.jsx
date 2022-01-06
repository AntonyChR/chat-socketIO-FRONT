import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import SendMessage from "./SendMessage";

const Messages = () => {
    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);

    return (
        <div className='mesgs'>
            <div id='messages' className='msg_history'>
                {
                    chatState.messages.map(msg => (
                        (msg.to  === auth.uid)?
                            <IncomingMessage message={msg} key={msg._id}/>
                            :
                            <OutgoingMessage message={msg} key={msg._id}/>
                    ))
                }
            </div>
            <SendMessage/>
        </div>
    );
};

export default Messages;
