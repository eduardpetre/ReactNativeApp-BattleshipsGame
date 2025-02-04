import {createContext, useContext, useEffect, useState} from 'react'
import {login, register} from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthContext {
    token: string;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>
    isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
    token: '',
    login: async () => {
    },
    register: async () => {
    },
    logout: async () => {
    },
    isLoading: false
})

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        AsyncStorage.getItem('token')
            .then(value => {
                if (value !== null) {
                    setToken(value)
                }
            })
            .finally(() => setIsLoading(false))
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await login(email, password);
            console.log('login: ', response)
            setToken(response);
            await AsyncStorage.setItem('token', response);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRegister = async (email: string, password: string) => {
        try {
            await register(email, password);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async () => {
        setToken('');
        await AsyncStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{
            token,
            login: handleLogin,
            register: handleRegister,
            logout: handleLogout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)