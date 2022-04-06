import Head from "next/head";
import Navbar from "../components/base/navbar";
import styles from "../styles/Home.module.scss";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { signin, authenticated } from "../helpers/auth";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { updateUserInfo }from "../helpers/db"
import { useRouter } from 'next/router'
import Link from "next/link";


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

export default function Login() {
  const classes = useStyles();
  const router = useRouter();
  const [pageState, setPageState] = React.useState({ email: "", pass: "" });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] =  React.useState(false);
  const [errorMessage, setErrorMessage] =  React.useState(false);

  
  React.useEffect(() => {
    
      if (typeof window !== 'undefined') {
        setPageState({ email: localStorage.getItem('prevEmail') || '', pass: "" })
      }else{
        setPageState({ email: "" , pass: "" })
      }
      setSuccess(false);

    
  }, []);

  
  
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const submit = (e) => {
    
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      signin(pageState.email, pageState.pass).then((user) => {
        localStorage.setItem('prevEmail', pageState.email);
        setSuccess(true);
        setLoading(false);
        router.push('/')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        setLoading(false);
        setErrorMessage(true);
      });
      
    }
  };
  const handleFailClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMessage(false);
  };
  const handleEmailChange = (e) => {
    setPageState((prevState) => ({ ...prevState, email: e.target.value }));
  };
  const handlePassChange = (e) => {
    setPageState((prevState) => ({ ...prevState, pass: e.target.value }));
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit()
    }
  };

  return (
    <div>
      <Head>
        <title>CFC Benevolence</title>
        
      </Head>
      <Navbar></Navbar>

      {authenticated() ? (
        <div>
          <main className={styles.main}>
          <Alert severity="success">
                You have Successfully Logged in! click <Link href="/welcome"> Here </Link> if the page does not automatically redirect you 
              </Alert>
          </main>

          
        </div>
      ) : (
        <div>
          <div className={classes.root}>
            <Grid
              className={classes.margin}
              container
              justify="center"
            >
              <Grid item xs={10} sm={8} md={6} lg={4}>
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

                  <h2>Login</h2>
                  <form noValidate autoComplete="off">
                    <Grid item>
                      <TextField
                        required
                        id="email"
                        label="Email"
                        placeholder="email"
                        variant="outlined"
                        onChange={handleEmailChange}
                        onKeyDown={handleKeyDown}
                        value={pageState.email}
                        type="email"
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        required
                        id="password"
                        label="Password"
                        placeholder="password"
                        variant="outlined"
                        onChange={handlePassChange}
                        type="password"
                        onKeyDown={handleKeyDown}
                      />
                    </Grid>

                    <Grid item>
                      <div className={classes.wrapper}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={submit}
                          className={buttonClassname}
                          disabled={loading}
                        >
                          Login
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </Grid>
                  </form>
                </Paper>
              </Grid>
            </Grid>
            <Snackbar open={errorMessage} autoHideDuration={6000} onClose={handleFailClose}>
              <Alert onClose={handleFailClose} severity="error">
                Invalid Login Information
              </Alert>
            </Snackbar>
          </div>
        </div>
      )}
    </div>
  );
}
