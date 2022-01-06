import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import SidebarChatItem from "./SidebarChatItem";

const Sidebar = () => {
    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext)
    const {users} = chatState;

    return (
        <div className='inbox_chat'>
            {
                users.filter(user => user._id!==auth.uid).map((user)=>(
                    <SidebarChatItem key={user._id} {...user}/>
                ))
            }
           <div className='extra_space'></div>
        </div>
    );
};

export default Sidebar;
