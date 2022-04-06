
import NavbarWhite from '../components/base/navbarWhite'
import React from 'react';
import { useRouter } from 'next/router'
import {  Button, makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import CFCFilledButtonWhite from '../components/ui/filledButtonWhite';

import Context from '../helpers/user';
import { deleteFile, getFiles, uploadFile } from '../helpers/db';
import { watchAuth } from '../helpers/auth';
import CFCFilledButton from '../components/ui/filledbutton';

import { Document, Page, pdfjs } from "react-pdf";
import { isTemplateHead } from 'typescript';
import { requestDownloadURL } from '../helpers/httpCalls';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import Modal from 'react-modal';
import { useRef } from 'react';


const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(3),
  },
  image: {
    // width: '100vw',
    height: '88vh',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center top',

    /* Create the parallax scrolling effect */
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

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
  bottomArea: {
    width: '100%',
    height: '500px',
    backgroundColor: 'pink',
  },
  
}));

// Add more to the page so when you scroll down you get links and a button for uploading things only if you are admin


export default function Welcome( theme ) {

  // Modal stuff


  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  const classes = useStyles();
  const router = useRouter();

  // const [userData, setUserData] = React.useState({name: '', roles: ['']});

const isAdmin = () => {
  if(user.userData.roles){
    return user.userData.roles.includes('admin')
  }
  return false
}

const isClient = () => {
  if(user.userData.roles){
    return user.userData.roles.includes('client')
  }
  return false
}

  const user = React.useContext(Context);



  
  
    return (
      <body>
      <div>
        <NavbarWhite></NavbarWhite>

        {user.auth
        
        ? 
        <Grid container display='flex' direction='column' justify='space-between' alignItems='center' className={classes.image}>
          <Grid item></Grid>
          <Grid item>
            <Grid container direction='column' alignItems='center' justify='center' style={{marginBottom: '11vh', minWidth: '50vw',}}>
              <Grid item justify='center' style={{marginBottom: '40px'}}>
                <Typography className={classes.text}>Welcome {user.userData.name}</Typography>
              </Grid>
              {(isClient()) ?
                <Grid item style={{width: '70%'}}>
                  <CFCFilledButtonWhite text='Start Survey' onClick={() => router.replace('/form')}></CFCFilledButtonWhite>
                </Grid>
              :
              <div></div>
              }
            </Grid>
          </Grid>
        </Grid>
        
        :
          <></>
        }
        
      </div>
   

 
      </body>
    )
  }

