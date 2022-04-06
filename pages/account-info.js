import Head from "next/head";
import Navbar from "../components/base/navbar";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import {  sendPWResetEmail, watchAuth } from "../helpers/auth";
import { green } from "@material-ui/core/colors";
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Context from "../helpers/user";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  margin: {
    marginTop: 40,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[100],
    "&:hover": {
      backgroundColor: green[200],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function AccountInfo() {
  const classes = useStyles();
  const user = React.useContext(Context);

  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = (e) => {
    sendPWResetEmail(user.userData.email)
    handleClickOpen()

  };
 

  return (
    <div>
      <Head>
        <title>CFC Benevolence</title>
        
      </Head>
      <Navbar></Navbar>

      {user.auth ? (
        <div>
        <div className={classes.root}>
          <Grid
            className={classes.margin}
            container
            spacing={3}
            justify="center"
          >
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                {/*
              <div className={styles.inputform}>
                <form>
                  <i class="fa fa-user icon"></i>  
                  <input className={styles.inputbox} type="text" name="fullname" placeholder="Full Name"></input>
                  <input className={styles.inputbox} type="text" name="password" placeholder="Password"></input>
                  <button className={styles.filledbutton}>Submit</button>
                </form>
              </div>
              */}

                <h2>Account Info</h2>
                <form noValidate autoComplete="off">
                  <Grid item xs={12}>
                    <h3>Name:{user.userData.name} Email:{user.userData.email}</h3>
                  </Grid>

                 

                  <Grid item xs={12}>
                    <div className={classes.wrapper}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={submit}
                        
                      >
                        Change Password
                      </Button>
                      
                    </div>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Password Reset Email Sent"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
               An email has been sent to you with instructions on how to change your password.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                OK
            </Button>
            </DialogActions>
          </Dialog>
          
        </div>
      </div>
      ) : (
        <div>
        <h2>You must be authenticated to use this page</h2>
      </div>
      )}
    </div>
  );
}
