import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from "react-firebase-hooks/auth"
import ChatRoom from './components/chatRoom/ChatRoom';
import SignIn from './components/signIn/SignIn';
import { Auth } from 'firebase/auth';
import "./styles.scss"

firebase.initializeApp({
  apiKey: "AIzaSyBZlafBCGFmDu6ZibElUb1uN-gNigk4fII",
  authDomain: "real-time-chat-4a32b.firebaseapp.com",
  projectId: "real-time-chat-4a32b",
  storageBucket: "real-time-chat-4a32b.appspot.com",
  messagingSenderId: "997117145426",
  appId: "1:997117145426:web:bdf14d7fe4f5c5ebbd0a8b",
  measurementId: "G-Z7CN6ZSBX4"
})

const auth: Auth | any = firebase.auth()
const firestore = firebase.firestore()

function App() {
  const [user] = useAuthState(auth)
  console.log('User:', user);

  return (
    <>
      <div className="chatRoom">
        {user ? <ChatRoom auth={auth} firestore={firestore} /> : <SignIn auth={auth} />}
      </div>
    </>
  )
}

export default App
