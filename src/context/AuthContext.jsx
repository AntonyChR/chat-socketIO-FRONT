import {createContext, useCallback, useState} from 'react';
import {fetchConToken, fetchSinToken} from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
}

export const AuthProvider= ({children})  => {
    const [auth, setAuht] = useState(initialState);

    const login = async (email, password) => {
        const resp = await fetchSinToken('login', {email, password}, 'POST');
        if( resp.ok ){
            localStorage.setItem('token', resp.token);
            const { user } = resp;
            setAuht({
                uid: user._id,
                checking: false,
                logged: true,
                name: user.name, 
                email: user.email

            });
        }

        return resp.ok;
    }

    const register = async (email, password, name) => {
        const resp = await fetchSinToken('login/new',{email, name, password}, 'POST');
        if( resp.ok ){
            localStorage.setItem('token', resp.token);
            const { user } = resp;
            setAuht({
                uid: user._id,
                checking: false,
                logged: true,
                name: user.name, 
                email: user.email
            });
        }
        return resp.ok;
    }

    const verificateToken = useCallback( async ()=>{
        const token = localStorage.getItem('token');
        if(!token){
            setAuht({
                uid: null,
                checking: false,
                logged: false,
                name: null, 
                email: null 
            });

            return false;
        } 

        const resp = await fetchConToken('login/renew')

        if(resp.ok){
            localStorage.setItem('token', resp.token);
            const { user } = resp;
            setAuht({
                uid: user._id,
                checking: false,
                logged: true,
                name: user.name, 
                email: user.email
            });
            console.log('Authenticated')
            return true;
        } else {
            setAuht({
                uid: null,
                checking: false,
                logged: false,
                name: null, 
                email: null 
            });

            return false;
        }
    },[]);

    const logout = () => {
        localStorage.removeItem('token');
        setAuht({
            checking: false,
            logged: false,

        });
   
    }
    return(
        <AuthContext.Provider
            value = {{
                auth,
                login,
                register,
                verificateToken,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
