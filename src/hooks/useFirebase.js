import { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
            })
            .catch((error) => {

                console.log(error.message);


            });
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
                // Sign-out successful.
            })
    }

    // Observe whether user auth state changed or not
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // User is signed out
                // ...
            }
        });
    }, []);

    return {
        user,
        signInUsingGoogle,
        logOut
    }

}

export default useFirebase;