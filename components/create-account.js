
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { newUser } from "../helpers/functions";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SelectQuestions from './ui/select-questions'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { getQuestions } from "../helpers/db";
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

export default function CreateAccount() {
  const classes = useStyles();
  
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [contact, setContact] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [userType, setUserType] = React.useState("user")
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] =  React.useState({open: false, message: ''});
  const [errorMessage, setErrorMessage] =  React.useState({open: false, message: ''});
  const [questions, setQuestions] = React.useState([{name: "loading"}])

  const user = React.useContext(Context);

  const [selected, setSelected] = React.useState([])

  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      setEmail("")
      setName("")
      setSuccess(false);
    };
  }, []);

  React.useEffect(()=>{
    let ignore = false;

    const getQuestions2 = async () => {
      let data = await getQuestions()
      console.log(data)
       if (!ignore) setQuestions(data)
    };

    getQuestions2()
    return () => { ignore = true; }
  }, [])
  
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
 

  const submit = async (e) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      let res = await newUser(name, email, userType, selected, contact, address, phone)
      
      if(res.type === "success"){
        
        setLoading(false);
        setSuccessMessage({open: true, message: res.message});
      } else {
        
        setLoading(false)
        setErrorMessage({open: true, message: res.message});
      }
      
    }
  };
  const handleFailClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMessage({open: false, message: ''});
    setSuccessMessage({open: false, message: ''});
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };
  const handleNameChange = (e) => {
    setName(e.target.value)
  };
  const handleContactChange = (e) => {
    setContact(e.target.value)
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  };
  const handleTypeChange = (e) => {
    setUserType(e.target.value)
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
                 
                  <h2>Create New User</h2>
                  <form noValidate autoComplete="off">
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="email"
                        label="Email"
                        placeholder="email"
                        variant="outlined"
                        onChange={handleEmailChange}
                        type="email"
                      />
                    </Grid>

                    <Grid item xs={12} >
                      <TextField
                        required
                        id="name"
                        label="Full Name"
                        placeholder="name"
                        variant="outlined"
                        onChange={handleNameChange}
                        type="text"

                      />
                    </Grid>
                    {userType === 'user' ? (
                      <>
                      <Grid item xs={12} >
                      <TextField
                        required
                        id="contact"
                        label="Initial Contact"
                        placeholder="name"
                        variant="outlined"
                        onChange={handleContactChange}
                        type="text"

                      />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField
                        required
                        id="address"
                        label="Address"
                        placeholder="Address or none"
                        variant="outlined"
                        onChange={handleAddressChange}
                        type="text"

                      />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField
                        required
                        id="phone"
                        label="Phone #"
                        placeholder="000-000-0000"
                        variant="outlined"
                        onChange={handlePhoneChange}
                        type="tel"

                      />
                    </Grid>
                    </>
                  )
                  : (
                    <div></div>
                  )
                  }
                    

                    <Grid item xs={12} >
                      <FormControl className={classes.formControl}>
                    <InputLabel id="type-label">User Type</InputLabel>
                      <Select
                        labelId="type-label"
                        id="type"
                        value={userType}
                        onChange={handleTypeChange}
                      >
                        <MenuItem value={'user'}>Client User</MenuItem>
                        <MenuItem value={'admin'}>Admin</MenuItem>
                        <MenuItem value={'committee'}>Case Committee Member</MenuItem>
                        <MenuItem value={'deacon'}>Deacon</MenuItem>
                        
                      </Select>
                      </FormControl>
                    </Grid>

                    
                  </form>


                  <div style={{marginTop: "40px", marginBottom: "40px", }}></div>
                  {userType === 'user' ? (
                     <SelectQuestions setSelected={setSelected} selected={selected} questions={questions}></SelectQuestions>
                  )
                  : (
                    <div></div>
                  )
                  }
                 
                  <Grid item xs={12}>
                      <div className={classes.wrapper}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={submit}
                          className={buttonClassname}
                          disabled={loading}
                        >
                          Create New User
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Snackbar open={errorMessage.open} autoHideDuration={10000} onClose={handleFailClose}>
              <Alert onClose={handleFailClose} severity="error">
              {errorMessage.message}
              </Alert>
            </Snackbar>
            <Snackbar open={successMessage.open} autoHideDuration={10000} onClose={handleFailClose}>
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
