import { createContext,useContext,useState } from "react";

const SignInContext = createContext();

export const useSignIn = () => {
    return useContext(SignInContext);    
}

export const SignInProvider = ({children}) => {
    const [signedIn,setSignedIn] = useState(false);
    return (
        <SignInContext.Provider value = {{signedIn,setSignedIn}}>
            {children}
        </SignInContext.Provider>
    )
}