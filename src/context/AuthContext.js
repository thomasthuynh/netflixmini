import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

const [user, setUser] = useState({});

const createAccount = async (email, password) => {
    
    await createUserWithEmailAndPassword(auth, email, password);

    setDoc(doc(db, "users", email), {
        savedMovies:[]
    })

}

const signIn = (email, password) => {
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
        <AuthContext.Provider value={{user, createAccount, signIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

