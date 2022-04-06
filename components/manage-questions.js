import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { newUser } from "../helpers/functions";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import EditQuestions from './ui/edit-questions'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CreateNewQuestions from "./ui/create-new-questions";
import { getQuestions } from "../helpers/db";
import Context from "../helpers/user";
import OrderQuestions from "./ui/order-questions"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


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

export default function ManageQuestions() {
  const classes = useStyles();
  
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [userType, setUserType] = React.useState("user")
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] =  React.useState({open: false, message: ''});
  const [errorMessage, setErrorMessage] =  React.useState({open: false, message: ''});
  const [tabValue, setTabValue]  = React.useState(0)
  const [questions, setQuestions] = React.useState([{name: "loading"}])

  const [selected, setSelected] = React.useState([])
  const user = React.useContext(Context);
  
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
  
  const refreshQuestions = async () => {
    let data = await getQuestions()
    setQuestions(data)
  }
 

  const submit = async (e) => {
    console.log(email, name);
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      let res = await newUser(name, email)
      
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
  const handleTypeChange = (e) => {
    setUserType(e.target.value)
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setTabValue(index);
  };

  return (
    <div>

      {user.auth ? (
        
        <div>
          <Alert severity="warning">
                For Admin Use Only! 
              </Alert>
           <div>
            <AppBar position="static" color="default">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="tabs"
              >
                <Tab label="Edit Questions" {...a11yProps(0)} />
                <Tab label="Add New Questions" {...a11yProps(1)} />
                <Tab label="Order Questions" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            {/* <SwipeableViews
              
              index={tabValue}
              onChangeIndex={handleTabChangeIndex}
            > */}
              <TabPanel value={tabValue} index={0}>
              <div className={classes.root}>
            <Grid
              className={classes.margin}
              container
              spacing={3}
              justify="center"
            >
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                 
                  <h2>Edit Questions</h2>
                  
                  {userType === 'user' ? (
                     <EditQuestions setSelected={setSelected} selected={selected} questions={questions} setQuestions={setQuestions}></EditQuestions>
                  )
                  : (
                    <div></div>
                  )
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
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <CreateNewQuestions refreshQuestions={refreshQuestions}></CreateNewQuestions>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <OrderQuestions questions={questions} setQuestions={setQuestions}></OrderQuestions>
              </TabPanel>

            {/* </SwipeableViews> */}
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
