import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

const [user, setUser] = useState({});

const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const logOut = () => {
    return signOut(auth);
}

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    return () => {
        unsubscribe();
    }
})


    return (
        <AuthContext.Provider value={{user, createAccount, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

