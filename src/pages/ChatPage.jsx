import {useContext} from 'react';
import {ChatSelect} from '../components/ChatSelect';
import InboxPeolple from '../components/InboxPeolple';
import Messages from '../components/Messages';
import {ChatContext} from '../context/ChatContext';
import '../css/chat.css';
export const ChatPage = () => {
    const {chatState} = useContext(ChatContext)

    return (
        <div className='messaging'>
            <div className='inbox_msg'>
                <InboxPeolple/>
                { 
                    (chatState.activeChat)?
                        <Messages/>
                        :
                        <ChatSelect/>
                }
            </div>
        </div>
    );
};
