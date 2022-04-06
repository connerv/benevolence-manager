import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateChurchResponse } from "../../helpers/db";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',

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


export default function EditChurchResponse( {user, uid, resetData} ) {


  const classes = useStyles();
  const [response, setResponse] = React.useState({})
  const [open, setOpen] = React.useState(false);
  const [one, setOne] = React.useState("There is no deep-seated problem that I/we need to address.");
  const [two, setTwo] = React.useState("");
  const [three, setThree] = React.useState("");
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOne = (e) =>{
    setOne(e.target.value)
    setResponse((prevState) => ({ ...prevState, belief: e.target.value }))
  } 

  const handleTwo = (e) =>{
    setTwo(e.target.value)
    setResponse((prevState) => ({ ...prevState, assessment: e.target.value }))
  } 

  const handleThree = (e) =>{
    setThree(e.target.value)
    setResponse((prevState) => ({ ...prevState, response: e.target.value }))
  } 


  React.useEffect(() => {
    console.log("here user", user)
    if(user.churchResponse && user.churchResponse != null){
        setResponse(user.churchResponse)
        setOne(user.churchResponse.belief)
        setTwo(user.churchResponse.assessment)
        setThree(user.churchResponse.response)
    }
  }, [user])


  const submit = async () =>{

    console.log(response)
    await updateChurchResponse(response, uid)
    resetData()
    handleClickOpen()

  }


  return (
    <div>
      <Head>
        <title>CFC Benevolence</title>
        
      </Head>
     

     
        <div>
        <div className={classes.root}>
          <Grid
            className={classes.margin}
            container
            spacing={3}
            justify="center"
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              

                <h2>Church Response</h2>
                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>Remember that poverty has multiple causes: the individual’s behavior, abusive or exploitive people, oppressive systems, and demonic forces. 
                  In many cases, more than one of these causes are at work. However, to the extent that the person’s own behavior is a contributor, you should try to gauge their receptivity 
                  to taking actions to make positive changes in their life. In such cases, check the one  that most applies:</b>  
                </p></Grid>
                <Grid item xs={2}></Grid>
                </Grid>
               
                
                <Grid item xs={12}>
                <form noValidate autoComplete="off">
                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gender1" value={one} onChange={handleOne}>
                    <FormControlLabel value="There is no deep-seated problem that I/we need to address." control={<Radio />} label="There is no deep-seated problem that I/we need to address." />
                    <FormControlLabel value="There may be a problem, but I’m/we aren’t the one(s) who need to change." control={<Radio />} label="There may be a problem, but I’m/we aren’t the one(s) who need to change." />
                    <FormControlLabel value="Yes there is a problem, but I’m/we doubtful it can be changed." control={<Radio />} label="Yes there is a problem, but I’m/we doubtful it can be changed." />
                    <FormControlLabel value="Yes there is a problem, and I/we can be part of making needed changes, but is it  worth it?" control={<Radio />} label="Yes there is a problem, and I/we can be part of making needed changes, but is it  worth it?" />
                    <FormControlLabel value="Yes there is a problem, and I/we are ready to take steps to make needed changes." control={<Radio />} label="Yes there is a problem, and I/we are ready to take steps to make needed changes." />
                  </RadioGroup>
                </FormControl>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p>
                <i>Category 1 or 2:</i> This person/family is not ready to do the hard work of: (1) identifying areas that  they need to change, and (2) making those changes with your church’s help. 
                They are not ready to  create an action plan. Since you are using this form with people you believe need to begin the change process starting now, their lack of readiness to change 
                might well disqualify them from receiving assistance from the church at this time. But that doesn’t mean ignoring them. Through continued contact and conversation, 
                they might develop more openness to change.
                </p>
                <p>
                  <i>Category 3–5: This person is ready to create an action plan. </i>
                </p>
                <p>
                You may find that people in category 3 or 4 complete the action plan but then do not follow through on their goals. Do not give up! They will probably need extra encouragement and 
                support, and their goals and timeframes may need to be adjusted. If they do not make sufficient progress on their goals even with repeated encouragement or help, then you and 
                the church may need to stop providing the material and possible human resources that you committed to in the action plan. That does not mean you neglect the person/family or break 
                your relationship with them! It just means you may have to shift the terms of the relationship. 
                </p>
                <p>
                People in category 5 will have a bit smoother time of moving forward and contributing their part to their goal, although there will still be bumps, and thus need for support
                </p>
                <p>
                Remember that if the person has experienced trauma, progress may be slower or halting, with times of no progress and/or regression. 
                </p>
                </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>Initial church assessment of issues that need to be dealt with that contributed to current problem:</b>  
                </p>
                <div>
                   <TextField
                    id="two"
                    label="Assessment"
                    multiline
                    rows={4}
                    defaultValue=""
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={two} 
                    onChange={handleTwo}
                  />
                  </div>
               
                  
                  
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>Initial response / decision: </b>  
                </p>
                <div>
                   <TextField
                    id="three"
                    label="Response"
                    multiline
                    rows={4}
                    defaultValue=""
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={three} 
                    onChange={handleThree}
                  />
                  </div>
               
                  
                  
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                  
                
                 
                </form>

                </Grid>

                
                                                                                                                                            
                 <Grid item xs={12}>
                 <Button
                        variant="outlined"
                        color="primary"
                        onClick={submit}
                        
                      >
                        Save Church Response
                      </Button>
                  </Grid>
                
              </Paper>
            </Grid>
          </Grid>
           <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Saved"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Church Response Has Been Saved
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
     
    </div>
  );
}


