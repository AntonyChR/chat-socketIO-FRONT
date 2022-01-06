import {useContext} from 'react';
import {ChatContext} from '../context/ChatContext'
import {types} from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import {scrollToBottom} from '../helpers/scrollToBottom';
const SidebarChatItem = ({name, online,_id}) => {

    const  {chatState,dispatch}  = useContext(ChatContext);
    const selectChat =  async() => {
        dispatch({
            type: types.selectChat,
            payload: _id
        })

    const resp = await fetchConToken(`messages/${_id}`);
        dispatch({
            type: types.loadMessages,
            payload: resp.messages
        })
        scrollToBottom('messages');

    }
    return (
        
        <div onClick={selectChat} className={`chat_list ${(_id === chatState.activeChat) && 'active_chat'}`}>
        <div className='chat_people'>
            <div className='chat_img'>
                <img
                    src='https://ptetutorials.com/images/user-profile.png'
                    alt='sunil'
                />
            </div>
            <div className='chat_ib'>
                <h5>{name}</h5>
                {
                    online?
                        <span className='text-success'>Online</span>
                        :
                        <span className='text-danger'>Offline</span>
                }
            </div>
        </div>
    </div>
    )
}

export default SidebarChatItem
