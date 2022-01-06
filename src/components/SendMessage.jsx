import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";
import {SocketContext} from "../context/SocketContext";

const SendMessage = () => {
    const {socket} = useContext(SocketContext)
    const  {chatState} = useContext(ChatContext)
    const {auth} = useContext (AuthContext)

    const onSubmit= (event) => {
        event.preventDefault();
        const message= event.target[0].value;
        if(message.length === 0) return;

        socket.emit('personal-message', {
            from:auth.uid,
            to:chatState.activeChat,
            message:message
        })
        event.target.reset();
        
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='type_msg row'>
                <div className='input_msg_write col-sm-9'>
                    <input
                        type='text'
                        className='write_msg'
                        placeholder='Mensaje...'
                    />
                </div>
                <div className='col-sm-3 text-center'>
                    <button className='msg_send_btn mt-3' type='submit'>
                        Send
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SendMessage;
