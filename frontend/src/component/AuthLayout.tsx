import { useNavigate } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";


interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
   const navigate = useNavigate();
   const [loader, setLoader] = useState(true)
   const authStatus = localStorage.getItem("token");

   useEffect(()=>{
    if(!authStatus){
        navigate("/signin");
        return;
    }
    setLoader(false)
    },[navigate, authStatus]) 

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout;