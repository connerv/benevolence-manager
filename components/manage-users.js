
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { newUser } from "../helpers/functions";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ListUsers from './ui/list-users'
import ListUsersDeacon from './ui/list-users-deacon'
import {  getDeaconData, getUsers } from "../helpers/db";
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
  formControl: {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

export default function ManageUsers() {
  const classes = useStyles();
  
  const [userType, setUserType] = React.useState("user")
  
  const [successMessage, setSuccessMessage] =  React.useState({open: false, message: ''});
  const [errorMessage, setErrorMessage] =  React.useState({open: false, message: ''});
  const [users, setUsers] = React.useState([{data:{name: "loading"}, id: 0}])
  const user = React.useContext(Context);

 

  


  React.useEffect(()=>{
    let ignore = false;

    const getUsers2 = async () => {
      let data = await getUsers()
      console.log(data)
       if (!ignore) setUsers(data)
    };

    const getUsers3 = async () => {
      let data = await getDeaconData()
      console.log(data)
       if (!ignore) { 
         setUsers(data.users)
       }
    };
   
    if(user.userData.roles.includes('admin') || user.userData.roles.includes('committee')){
      getUsers2()
    }
    if(user.userData.roles.includes('deacon')){
      getUsers3()
    }

    return () => { ignore = true; }
  }, [])
  

  const resetData = async () => {
    let data = await getUsers()
    setUsers(data)
  }
  const resetData2 = async () => {
    let data = await getDeaconData()
    setUsers(data.users)
  }
  const isDeacon = () => {
    if(user.userData.roles){
      return user.userData.roles.includes('deacon')
    }
    return false
  }

  const handleFailClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMessage({open: false, message: ''});
    setSuccessMessage({open: false, message: ''});
  };
 

  return (
    <div>

      {user.auth ? (
        <div>
          
          <Alert severity="warning">
                For Admin Use Only! 
              </Alert>
         
          <div className={classes.root}>
            <Grid
              className={classes.margin}
              container
              spacing={3}
              justify="center"
            >
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                 
                  <h2>Manage Users</h2>
                  


                  <div style={{marginTop: "40px", marginBottom: "40px", }}></div>
                  
                    {(isDeacon()) ?
                      <>
                      <ListUsersDeacon users={users} setUsers={setUsers} resetData={resetData2}></ListUsersDeacon>               
                      </>
                      :
                      <>
                      <ListUsers users={users} setUsers={setUsers} resetData={resetData}></ListUsers>
                      </>
                    }
   
                
                 
                
                </Paper>
              </Grid>
            </Grid>
            <Snackbar open={errorMessage.open} autoHideDuration={6000} onClose={handleFailClose}>
              <Alert onClose={handleFailClose} severity="error">
              {errorMessage.message}
              </Alert>
            </Snackbar>
            <Snackbar open={successMessage.open} autoHideDuration={6000} onClose={handleFailClose}>
              <Alert onClose={handleFailClose} severity="success">
              {successMessage.message}
              </Alert>
            </Snackbar>
            
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
