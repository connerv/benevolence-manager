
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import {  makeStyles } from '@material-ui/core';
import Context from '../helpers/user';
import CircularProgress from '@material-ui/core/CircularProgress';
import { watchAuth } from '../helpers/auth';



const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(3),
  },
  spinner: {
    zIndex: 999999,
    color: '#6a8fa8',
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  image: {
    // width: '100vw',
    height: '88vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    backgroundImage: 'url("https://images.unsplash.com/photo-1515162305285-0293e4767cc2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2551&q=80")',
  },
  text: {
    overflowWrap: 'normal',
    fontFamily: [
      'Helvetica Neue',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeight: '100',
    fontSize: '5em',
    color: '#ffffff',
    margin: 'auto',
    textAlign: 'center',
  },
  root: {
    width: '100%',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    borderWidth: 2,
    // color: '#FFFFFF',
    // borderColor: theme.palette.primary.light,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ]
  },
}));

export default function Index( theme ) {

  const classes = useStyles()
  const router = useRouter();
  const user = React.useContext(Context);
  
  const routeWelcome = () =>{
    router.replace('/welcome')
  }

  const routeLogin = () =>{
    router.replace('/login')
  }

  const routeAdmin = () =>{
    router.replace('/admin-dashboard')
  }


  useEffect(() => {
    watchAuth.subscribe({
      next({user,userInfo}){
        if(user){
          if(userInfo.roles.includes('admin') || userInfo.roles.includes('committee') || userInfo.roles.includes('deacon')){
            routeAdmin()
          }else{
            routeWelcome()
          }
        }else{
          routeLogin()
        }
      }
    })
  }, [])
  

    return (
      
        <CircularProgress color="inherit" className={classes.spinner}/>

     
    )
  }

