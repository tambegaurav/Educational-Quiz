import React, {useEffect,useState} from 'react';
import firebaseDb from './firebase';

export const AuthContext = React.createContext();
export const AuthProvider = ({children})=>{
    const [CurrentUser,setCurrentUser] = useState(null);

    useEffect(()=>{
        firebaseDb.auth().onAuthStateChanged(setCurrentUser);
    },[]);

    return(
        <AuthContext.Provider 
        value={{CurrentUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}