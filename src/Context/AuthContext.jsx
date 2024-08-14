import { createContext, useContext, useEffect, useState } from "react";
import {auth} from '../firebase';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children})=>{
    const [user ,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const unSubscribe = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        });
        return () =>unSubscribe();
    },[]);

    const value = {
        user,
        loading,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
 };