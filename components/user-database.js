
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {  getDeacons, getProfiles, getQuestions } from "../helpers/db";
import Context from "../helpers/user";
import ListProfiles from "./ui/list-profiles";
import AllAnswers from "./ui/all-answers";
import { CSVLink, CSVDownload } from "react-csv";


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
  title:{
    position: 'absolute', left: '0%'
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

export default function UserDatabase() {
  const classes = useStyles();
  
  const [successMessage, setSuccessMessage] =  React.useState({open: false, message: ''});
  const [errorMessage, setErrorMessage] =  React.useState({open: false, message: ''});
  const [users, setUsers] = React.useState([{data:{name: "loading"}, id: 0}])
  const [questions, setQuestions] = React.useState([])
  const [fullQuestions, setFullQuestions] = React.useState([])
  const [deacons, setDeacons] = React.useState([])
  const [csv, setCSV] = React.useState([])
  const user = React.useContext(Context);

  const csvData = [];
  

  React.useEffect(()=>{
    let ignore = false;

    const getUsers2 = async () => {
      let data = await getProfiles()
      let qs = await getQuestions()
      let deacons = await getDeacons()
      console.log(deacons)
      console.log(data)
       if (!ignore) { 
         setUsers(data)
         let qs2 = {}
         csvData[0] = []
         csvData[0].push("Email / Name / Initial Contact")
         qs.forEach((q) => {
          qs2[q.id] = q.question
          csvData[0].push(q.question)
         })
         csvData[0].push("Finacial Assistance Given")
         setDeacons(deacons)
         setQuestions(qs2)
         console.log("qs", qs)
         setFullQuestions(qs)
         let start = 1
         data.forEach((u) =>{
           csvData[start] = []
           if(u.data.email && u.data.initialContact){
            csvData[start].push(""+u.data.email+" / "+u.data.name+" / "+u.data.initialContact)
           }else{
            csvData[start].push(u.data.name)
           }
            
           qs.forEach(q =>{
            let ans = ""
            u.data.answers.forEach(x => {
              if(q.id == x.qid){
                ans = x.answer
              }
            })
            csvData[start].push(ans)
           })
           if(u.data.transactions){
            let total = 0
            u.data.transactions.forEach(transaction => {
              total += Number(transaction.transaction)
            })
            csvData[start].push("$" + total)
            }else{
              csvData[start].push("$0")
            }
           start++;
           
           
         })
         console.log(csvData)
         setCSV(csvData)
       }
    };

    getUsers2()
    return () => { ignore = true; }
  }, [])
  
  const resetData = async () => {
      let data = await getProfiles()
      setUsers(data)
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
                <Grid item xs={2}>
                  <h2>Client Database</h2>
                  <CSVLink data={csv} filename={"client-database.csv"}>Download CSV</CSVLink>
                </Grid>
                <Grid item xs={10}>
                 
                </Grid>
                  


                  <div style={{marginTop: "40px", marginBottom: "40px", }}></div>
                  
                 <AllAnswers users={users} setUsers={setUsers} questions={questions} fullQuestions={fullQuestions} deacons={deacons} resetData={resetData}></AllAnswers>
                  
                
                 
                
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
