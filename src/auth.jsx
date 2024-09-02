import { getAuth, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app, googleAuthProvider  } from "./firebase/config";

export const AuthProvider = (app) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
            if (maybeUser != null) {
                return setUser(maybeUser);
            }
            signInWithPopup(auth, googleAuthProvider).then(credentials =>
                setUser(credentials.user)
            ).catch((e) => console.error(e));
    })
        return unsub;
    }, [auth]);

    return user != null ? <>{ user.displayName}</> : <>loading</>
}