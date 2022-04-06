import '../styles/globals.css'
import '../styles/styles.scss'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from "react"
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '../styles/nprogress.css'; //styles of nprogress
import { isWhiteSpaceLike } from 'typescript';
import Context from '../helpers/user';
import { watchAuth } from '../helpers/auth';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6A8FA8",
      light: "#BCBEC0",
      dark: "#33566F",
    },
    secondary: {
      main: "#6a8fa8",
    },
  },
  typography: {
    h1: {
      fontFamily: [
        'Helvetica Neue',
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
      fontWeight: 100,
      fontSize: 100,
      color: '#ffffff',
    },
    h3: {
      fontFamily: [
        'Helvetica Neue',
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
      fontWeight: 500,
      fontSize: 20,
      color: '#ffffff',
    },
    button: {
      fontSize: 16,
    },
    fontFamily: [
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    spacing: [0, 4, 8, 16, 32, 64],
  },
  

});


Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }) {
  const [orientation, setOrientation] = React.useState("desktop")
  const detectDevice = () => {
    let detectDeviceObj = {
      device: !!navigator.maxTouchPoints ? 'mobile' : 'computer',
    }
    if(detectDeviceObj.device == 'computer'){
      setOrientation("desktop")
    }else{
      if(window.innerHeight < window.innerWidth){
        setOrientation("landscape")
      } else {
        setOrientation("portrait")
      }
    }
    
  }

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    window.addEventListener("resize", detectDevice)
  }, []);
  const [userData, setUserData] = React.useState({name: '', email: '', roles: [''], income: "", expenses: ""});
  const [auth, setAuth] = React.useState(null)

  const user = {
    auth, 
    userData
  };

  watchAuth.subscribe({
    next({user,userInfo}){
      setAuth(user)
      setUserData(userInfo)
    }
  })

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Context.Provider value={user}>
      {orientation == 'landscape' ? (
        <>
        <h2>please rotate your screen to portrait</h2>
        </>
      ) : (
        <Component {...pageProps} />
      ) }
      
    </Context.Provider>
  </ThemeProvider>)
}

export default MyApp
