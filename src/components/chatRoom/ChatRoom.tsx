import React, { useRef, useState } from 'react';
import style from "./chatRoom.module.scss";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from '../chatMessage/ChatMessage';
import firebase from 'firebase/compat/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

interface ChatRoomProps {
    auth: Auth;
    firestore: Firestore | any;
}

const LiveChat = ({ auth, firestore }: ChatRoomProps) => {
    const messagesRef = firestore.collection("messages")
    const query = messagesRef.orderBy("createdAt").limit(25);
    const dummy = useRef<any>()
    const [messages] = useCollectionData(query, { idField: "id" } as any)
    const [formValue, setFormValue] = useState("")

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();

        const currentUser = auth.currentUser;

        if (!currentUser) {
            console.error("User not authenticated");
            return;
        }

        const { uid, photoURL } = currentUser;

        if (!uid) {
            console.error("Missing user UID");
            return;
        }

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL: photoURL
        });

        setFormValue('');
        dummy.current!.scrollIntoView({ behavior: "smooth" })
    }

    function signOutButton() {
        return auth.currentUser && auth.signOut()
    }

    return (
        <>
            <div className={style.liveChat}>
                <div className={style.chatWindow}>
                    <div className={style.chatHeader}>Live Chat
                        <button className={style.signOut} onClick={signOutButton}>Sign out</button>
                    </div>
                    <div className={style.chatMessages}>
                        {messages && messages.map((msg) => <ChatMessage auth={auth} key={msg.id} message={msg} />)}
                        <div ref={dummy}></div>
                    </div>

                    <form onSubmit={sendMessage} className={style.chatInput}>
                        <input
                            type="text"
                            value={formValue}
                            onChange={e => setFormValue(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LiveChat;
