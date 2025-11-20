import React,{ createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";





export const AuthContext = createContext();




export const AuthProvider =  ({children}) => {

    const [isLoading,setIsloading] = useState(false);
    const [userToken,setUserToken] = useState(null);


    const login = () => {

        setIsloading(true);
        setUserToken("jgsh");
        AsyncStorage.setItem('userToken' , "dfsgvs");
        setIsloading(false);

    }

    const logout = () => {
        setIsloading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsloading(false);
        
    }
    
    const isLoggedIn =  async() => {
        try{

            console.log("checking  logingg in!");
            setIsloading(true);
            let usertoken = await AsyncStorage.getItem('userToken');
            setUserToken(usertoken);
            setIsloading(false);
            console.log("user token got!" +  usertoken);


        }
        catch(e){

            console.log("error in logingg in!");
        }
    }




    useEffect(() => {

        isLoggedIn()
    },[])


    return (
        <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
            {children}
        </AuthContext.Provider>
    )
}