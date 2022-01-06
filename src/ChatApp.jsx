import {AuthProvider} from "./context/AuthContext"
import {ChatProvider} from "./context/ChatContext";
import {SocketProvider} from "./context/SocketContext";
import AppRouter from "./router/AppRouter"

const ChatApp = () => {
  return (
    <AuthProvider>
            <ChatProvider>
        <SocketProvider>
                <AppRouter/>
        </SocketProvider>
            </ChatProvider>
    </AuthProvider>
  );
}

export default ChatApp;

