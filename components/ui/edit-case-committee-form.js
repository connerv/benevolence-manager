import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateCaseCommitteeReview, updateChurchResponse } from "../../helpers/db";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1),

  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
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


export default function EditCaseCommitteeForm( {user, uid, resetData} ) {


  const classes = useStyles();
  const [review, setReview] = React.useState({
    familyName: "",
    familyMembers: "",
    dateInitiated: "",
    deaconTeam: "",
    budgetCompleted: "no",
    actionPlanCompleted: "no",
    goalsRealistic: "no",
    cfcAble: "no",
    timelineNeedsMilestones: "",
    outsideAgencies: "",
    milestone1: "",
    milestone2: "",
    milestone3: "",
    milestone4: "",
    obstacles: "",
    financial1: "",
    financial2: "",
    financial3: "",
    financial4: "",
    financial5: "",
    supportNetwork: "",
    otherMinistry: "",
    approved: "no",
    input: "",
    followUp: "",
    financialForecast: "",
    sentToTreasurer: "no",
    record: "",
    closedDate: "",
    success: "no",
    reason: "",
  })
  const [open, setOpen] = React.useState(false);
 
  
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFamilyName = (e) =>{
    setReview((prevState) => ({ ...prevState, familyName: e.target.value }))
  } 
  const handleFamilyMembers = (e) =>{
    setReview((prevState) => ({ ...prevState, familyMembers: e.target.value }))
  } 
  const handleDateInitiated = (e) =>{
    setReview((prevState) => ({ ...prevState, dateInitiated: e.target.value }))
  } 
  const handleDeaconTeam = (e) =>{
    setReview((prevState) => ({ ...prevState, deaconTeam: e.target.value }))
  } 
  const handleBudgetCompleted = (e) =>{
    setReview((prevState) => ({ ...prevState, budgetCompleted: e.target.value }))
  } 
  const handleActionPlanCompleted = (e) =>{
    setReview((prevState) => ({ ...prevState, actionPlanCompleted: e.target.value }))
  } 
  const handleGoalsRealistic = (e) =>{
    setReview((prevState) => ({ ...prevState, goalsRealistic: e.target.value }))
  } 
  const handleCfcAble = (e) =>{
    setReview((prevState) => ({ ...prevState, cfcAble: e.target.value }))
  } 
  const handleTimelineNeedsMilestones = (e) =>{
    setReview((prevState) => ({ ...prevState, timelineNeedsMilestones: e.target.value }))
  } 
  const handleOutsideAgencies = (e) =>{
    setReview((prevState) => ({ ...prevState, outsideAgencies: e.target.value }))
  } 
  const handleMilestone1 = (e) =>{
    setReview((prevState) => ({ ...prevState, milestone1: e.target.value }))
  } 
  const handleMilestone2 = (e) =>{
    setReview((prevState) => ({ ...prevState, milestone2: e.target.value }))
  } 
  const handleMilestone3 = (e) =>{
    setReview((prevState) => ({ ...prevState, milestone3: e.target.value }))
  } 
  const handleMilestone4 = (e) =>{
    setReview((prevState) => ({ ...prevState, milestone4: e.target.value }))
  } 
  const handleObstacles = (e) =>{
    setReview((prevState) => ({ ...prevState, obstacles: e.target.value }))
  } 
  const handleFinancial1 = (e) =>{
    setReview((prevState) => ({ ...prevState, financial1: e.target.value }))
  } 
  const handleFinancial2 = (e) =>{
    setReview((prevState) => ({ ...prevState, financial2: e.target.value }))
  } 
  const handleFinancial3 = (e) =>{
    setReview((prevState) => ({ ...prevState, financial3: e.target.value }))
  } 
  const handleFinancial4 = (e) =>{
    setReview((prevState) => ({ ...prevState, financial4: e.target.value }))
  } 
  const handleFinancial5 = (e) =>{
    setReview((prevState) => ({ ...prevState, financial5: e.target.value }))
  } 
  const handleSupportNetwork = (e) =>{
    setReview((prevState) => ({ ...prevState, supportNetwork: e.target.value }))
  } 
  const handleOtherMinistry = (e) =>{
    setReview((prevState) => ({ ...prevState, otherMinistry: e.target.value }))
  } 
  const handleApproved = (e) =>{
    setReview((prevState) => ({ ...prevState, approved: e.target.value }))
  } 
  const handleInput = (e) =>{
    setReview((prevState) => ({ ...prevState, input: e.target.value }))
  } 
  const handleFollowUp = (e) =>{
    setReview((prevState) => ({ ...prevState, followUp: e.target.value }))
  } 
  const handleFinancialForecast = (e) =>{
    setReview((prevState) => ({ ...prevState, financialForecast: e.target.value }))
  } 
  const handleSentToTreasurer = (e) =>{
    setReview((prevState) => ({ ...prevState, sentToTreasurer: e.target.value }))
  } 
  const handleRecord = (e) =>{
    setReview((prevState) => ({ ...prevState, record: e.target.value }))
  } 
  const handleClosedDate = (e) =>{
    setReview((prevState) => ({ ...prevState, closedDate: e.target.value }))
  } 
  const handleSuccess = (e) =>{
    setReview((prevState) => ({ ...prevState, success: e.target.value }))
  } 
  const handleReason = (e) =>{
    setReview((prevState) => ({ ...prevState, reason: e.target.value }))
  } 


  React.useEffect(() => {
    console.log("here user", user)
    if(user.ccReview && user.ccReview != null){
        setReview(user.ccReview)
    }
  }, [user])


  const submit = async () =>{

    console.log(review)
    await updateCaseCommitteeReview(review, uid)
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
              

                <h2>Case Committee Benevolence Case Summary</h2>
                <div>
                <TextField
                  className={classes.formControl}
                  id="1"
                  label="Family Name"
                  variant="outlined"
                  value={review.familyName} 
                  onChange={handleFamilyName}
                  
                />
                <TextField
                  className={classes.formControl}
                  id="2"
                  label="Family Members"
                  variant="outlined"
                  value={review.familyMembers} 
                  onChange={handleFamilyMembers}
                  
                />
                </div>
                <div>
                <TextField
                  className={classes.formControl}
                  id="3"
                  label="Date Initiated"
                  variant="outlined"
                  value={review.dateInitiated} 
                  onChange={handleDateInitiated}
                  
                />
                <TextField
                  className={classes.formControl}
                  id="4"
                  label="Deacon/Team"
                  variant="outlined"
                  value={review.deaconTeam} 
                  onChange={handleDeaconTeam}
                  
                />
                </div>
                <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="5s">Budget Completed?</InputLabel>
                  <Select
                    labelId="5s"
                    id="5"
                    value={review.budgetCompleted}
                    onChange={handleBudgetCompleted}
                    label="Budget Completed?"
                  > 
                    <MenuItem value={'no'}>No</MenuItem>
                    <MenuItem value={'yes'}>Yes</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="6s">Action Plan Completed?</InputLabel>
                  <Select
                    labelId="6s"
                    id="6"
                    value={review.actionPlanCompleted}
                    onChange={handleActionPlanCompleted}
                    label="Action Plan Completed?"
                  > 
                    <MenuItem value={'no'}>No</MenuItem>
                    <MenuItem value={'yes'}>Yes</MenuItem>
                  </Select>
                </FormControl>
                </div>
                <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="7s">Are Goals Realistic?</InputLabel>
                  <Select
                    labelId="7s"
                    id="7"
                    value={review.goalsRealistic}
                    onChange={handleGoalsRealistic}
                    label="Are Goals Realistic?"
                  > 
                    <MenuItem value={'no'}>No</MenuItem>
                    <MenuItem value={'yes'}>Yes</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="8s">Is CFC Able to Meet the Goal Partnering Needs?</InputLabel>
                  <Select
                    labelId="8s"
                    id="8"
                    value={review.cfcAble}
                    onChange={handleCfcAble}
                    label="Is CFC Able to Meet the Goal Partnering Needs?"
                  > 
                    <MenuItem value={'no'}>No</MenuItem>
                    <MenuItem value={'yes'}>Yes</MenuItem>
                  </Select>
                </FormControl>
                </div>
                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>Timeline, Needs, and Milestones:</b>  
                </p>
                <div>
                   <TextField
                    id="9"
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
                    value={review.timelineNeedsMilestones}
                    onChange={handleTimelineNeedsMilestones}
                  />
                  </div>
               
                  
                  
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > 
                <TextField
                  className={classes.formControl}
                  id="10"
                  label="Outside Agencies Involved"
                  variant="outlined"
                  value={review.outsideAgencies} 
                  onChange={handleOutsideAgencies}
                  fullWidth
                  
                />
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>
                    <h3>Milestones (include date)</h3>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="11"
                    label="Milestone #1"
                    variant="outlined"
                    value={review.milestone1} 
                    onChange={handleMilestone1}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="12"
                    label="Milestone #2"
                    variant="outlined"
                    value={review.milestone2} 
                    onChange={handleMilestone2}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="13"
                    label="Milestone #3"
                    variant="outlined"
                    value={review.milestone3} 
                    onChange={handleMilestone3}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="14"
                    label="Milestone #4"
                    variant="outlined"
                    value={review.milestone4} 
                    onChange={handleMilestone4}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              
                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>Obstacles</b>  
                </p>
                <div>
                   <TextField
                    id="15"
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
                    value={review.obstacles}
                    onChange={handleObstacles}
                  />
                  </div>
               
                  
                  
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                <h3>Financial Forecast (include $amount)</h3>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="16"
                    label="Item #1"
                    variant="outlined"
                    value={review.financial1} 
                    onChange={handleFinancial1}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="17"
                    label="Item #2"
                    variant="outlined"
                    value={review.financial2} 
                    onChange={handleFinancial2}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="18"
                    label="Item #3"
                    variant="outlined"
                    value={review.financial3} 
                    onChange={handleFinancial3}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="19"
                    label="Item #4"
                    variant="outlined"
                    value={review.financial4} 
                    onChange={handleFinancial4}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2} ></Grid>
                  <Grid item xs={8} > 
                  <TextField
                    className={classes.formControl}
                    id="20"
                    label="Item #5"
                    variant="outlined"
                    value={review.financial5} 
                    onChange={handleFinancial5}
                    fullWidth
                    
                  />
                    </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > 
                <TextField
                  className={classes.formControl}
                  id="21"
                  label="Support Network / Bible Study Referal Contact"
                  variant="outlined"
                  value={review.supportNetwork} 
                  onChange={handleSupportNetwork}
                  fullWidth
                  
                />
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > 
                <TextField
                  className={classes.formControl}
                  id="21"
                  label="Other Ministry (Stephens, Financial Counseling, Parenting, Personal Accountability etc.)"
                  variant="outlined"
                  value={review.otherMinistry} 
                  onChange={handleOtherMinistry}
                  fullWidth
                  
                />
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>
                <h2>Case Committee Review and Plan</h2>
                <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="22s">Approved to Accept as Case?</InputLabel>
                  <Select
                    labelId="22s"
                    id="22"
                    value={review.approved}
                    onChange={handleApproved}
                    label="Approved to Accept as Case?"
                  > 
                    <MenuItem value={'no'}>No</MenuItem>
                    <MenuItem value={'yes'}>Yes</MenuItem>
                  </Select>
                </FormControl>
                
                </div>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>Input on Case Plan, From Review</b>  
                </p>
                <div>
                   <TextField
                    id="23"
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
                    value={review.input}
                    onChange={handleInput}
                  />
                  </div>
               
                  
                  
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>Follow Up Timeline</b>  
                </p>
                <div>
                   <TextField
                    id="24"
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
                    value={review.followUp}
                    onChange={handleFollowUp}
                  />
                  </div>
               
                  
                  
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                <div>
                <TextField
                  className={classes.formControl}
                  id="25"
                  label="Financial Forecast, Overall Budget"
                  variant="outlined"
                  value={review.financialForecast} 
                  onChange={handleFinancialForecast}
                  
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="26s">Sent to Treasurer?</InputLabel>
                  <Select
                    labelId="26s"
                    id="26"
                    value={review.sentToTreasurer}
                    onChange={handleSentToTreasurer}
                    label="Sent to Treasurer?"
                  > 
                    <MenuItem value={'no'}>No</MenuItem>
                    <MenuItem value={'yes'}>Yes</MenuItem>
                  </Select>
                </FormControl>
                </div>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>Record:</b>  
                </p>
                <div>
                   <TextField
                    id="27"
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
                    value={review.record}
                    onChange={handleRecord}
                  />
                  </div>
               
                  
                  
                  </Grid>
                <Grid item xs={2}></Grid>
                </Grid>

                <div>
                <TextField
                  className={classes.formControl}
                  id="28"
                  label="Case Closed Date"
                  variant="outlined"
                  value={review.closedDate} 
                  onChange={handleClosedDate}
                  
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="29s">Success?</InputLabel>
                  <Select
                    labelId="29s"
                    id="29"
                    value={review.success}
                    onChange={handleSuccess}
                    label="Success?"
                  > 
                    <MenuItem value={'no'}>No</MenuItem>
                    <MenuItem value={'yes'}>Yes</MenuItem>
                  </Select>
                </FormControl>
                </div>

                <Grid container>
                <Grid item xs={2} ></Grid>
                <Grid item xs={8} > <p><b>If “NO”  - Describe reason including if “outside factor”  or “client non-compliance”:</b>  
                </p>
                <div>
                   <TextField
                    id="30"
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
                    value={review.reason}
                    onChange={handleReason}
                  />
                  </div>
               
                  
                  
                  </Grid>
                <Grid item xs={2}></Grid>
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
              Case Committee Review Has Been Saved
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


