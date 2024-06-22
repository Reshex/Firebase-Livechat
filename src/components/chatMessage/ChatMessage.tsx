import { Auth } from "firebase/auth";
import style from "./chatMessage.module.scss";

interface ChatMessageProps {
    message: any;
    auth: Auth | any;
}

function ChatMessage({ message, auth }: ChatMessageProps) {
    const { text, uid,photoURL } = message;

    const messageClass = uid === auth.currentUser.uid ? style.sent : style.received;

    return (
        <div className={`${style.message} ${messageClass}`}>
            <img src={photoURL}  />
            <p>{text}</p>
        </div>
    );
}

export default ChatMessage;
