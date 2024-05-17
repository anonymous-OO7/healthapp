import React,{useEffect} from "react";
import { AuthProvider } from "./src/setup/app-context-manager/Authcontext";
import AppNav from "./src/navigation/AppNav";
import SplashScreen from "react-native-splash-screen";


const App = () => {


  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (

    <AuthProvider>
      <AppNav/>
    </AuthProvider>



  )
}



export default App;