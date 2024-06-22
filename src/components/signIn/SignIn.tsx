import firebase from 'firebase/compat/app';
import style from "./signIn.module.scss"

interface SignInProps {
    auth: any
}

const SignIn = ({ auth }: SignInProps) => {

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    return (
        <div className={style.signIn}>
            <div className={style.signInContainer}>
                <div className={style.signInHeader}>Sign In</div>
                <button className={style.googleSignInButton} onClick={signInWithGoogle}>
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SignIn;
