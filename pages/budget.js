import Head from "next/head";
import Navbar from "../components/base/navbar";
import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors"
import Context from "../helpers/user";
import Spreadsheet from "react-spreadsheet";
import { updateBudget } from "../helpers/db";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




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

export default function Budget() {
  const classes = useStyles();
  const user = React.useContext(Context);
  const ssref = useRef(null);
  const [total1, setTotal1] = React.useState(0)
  const [total2, setTotal2] = React.useState(0)
  const [data1, setData1] = React.useState([
    [{value: 0},{ value: 0},{ value: '=SUM(A1,B1)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A2,B2)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A3,B3)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A4,B4)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A5,B5)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A6,B6)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A7,B7)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A8,B8)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A9,B9)' }],
    [{value: '=SUM(A1:A9)'}, {value: '=SUM(B1:B9)'}, {value: '=SUM(C1:C9)'}]
  ]);

  const [data2, setData2] = React.useState([
    [{value: 0},{ value: 0},{ value: '=SUM(A1,B1)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A2,B2)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A3,B3)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A4,B4)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A5,B5)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A6,B6)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A7,B7)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A8,B8)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A9,B9)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A10,B10)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A11,B11)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A12,B12)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A13,B13)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A14,B14)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A15,B15)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A16,B16)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A17,B17)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A18,B18)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A19,B19)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A20,B20)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A21,B21)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A22,B22)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A23,B23)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A24,B24)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A25,B25)' }],
    [{value: 0},{ value: 0},{ value: '=SUM(A26,B26)' }],
    [{value: '=SUM(A1:A26)'}, {value: '=SUM(B1:B26)'}, {value: '=SUM(C1:C26)'}]
  ]);
  const [open, setOpen] = React.useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    console.log("here user", user)
    if(user.userData.income != ""){
        let income = JSON.parse(user.userData.income)
        console.log(income)
        setData1(income)
    }
    if(user.userData.expenses != ""){
        let expenses = JSON.parse(user.userData.expenses)
        console.log(expenses)
        setData2(expenses)
    }
    
            
     
    
  }, [user])

  React.useEffect(()=>{
    let total = 0
    for( let x = 0 ; x < 9; x++ ){
      total += (Number(data1[x][0].value) + Number(data1[x][1].value))
    }
    setTotal1(total)

    let total2 = 0
    for( let x = 0 ; x < 26; x++ ){
      total2 += (Number(data2[x][0].value) + Number(data2[x][1].value))
    }
    setTotal2(total2)
  },[data1,data2])



  const submit = () =>{
    
    const income = JSON.stringify(data1)
    const expenses = JSON.stringify(data2)
    updateBudget(income, expenses)
    handleClickOpen()

  }


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
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              

                <h2>Budget Helper</h2>
                
                  <Grid item xs={12}>
                    <h3>My Monthly Spending Plan</h3>
                  </Grid>

                 

                  <Grid item xs={12}>
                  <h4>Income</h4>
                 
                <Spreadsheet 
                    data={data1}
                    ref={ssref}
                    onChange={setData1} 
                    columnLabels={['Current Income', 'Income Changes', 'New Budget']} 
                    rowLabels={[
                    'Employment (Take-home pay—after taxes)', 
                    'Government Assistance/Unemployment', 
                    'Pensions/Retirement', 
                    'Child Support/ Alimony',
                    'Friends/Family',
                    'Social Securit/ Disability',
                    'Food Stamps',
                    'Other',
                    'Other',
                    'Total'
                        
                ]} 
                />
                </Grid>
                <Grid item xs={12}>
                <h4>Expenses</h4>
                <Spreadsheet                                                                                                                                            
                    data={data2}
                    onChange={setData2} 
                    columnLabels={['Current Expenses', 'Spending Changes', 'New Budget']} 
                    rowLabels={[                                                                    
                    'Housing (Rent/Mortgage)', 
                    'Electricity',
                    'Gas',
                    'Water',
                    'Telephone (Home/Cell)',
                    'Cable TV/Internet',
                    'Laundry Costs',
                    'Groceries',
                    'Snacks/Drinks/Cigarettes',
                    'Medicine/Prescriptions',
                    'Household (Toiletries, Cleaning, Cooking)',
                    'Pet Food and Supplies',
                    'Child Care/ Child Support/ Alimony',
                    'Meals Out/ Entertainment',
                    'Transportation (Car Payments, Fuel, Bus',
                    'Clothing/ Shoes',
                    'School Expenses / Tuition',
                    'Credit Card/ Debt Payment',
                    'Fees: Late, ATM, Money Order, Check Cashing',
                    'Giving (Personal and Charity)',
                    'Books, DVDs, CDs',
                    'Subscriptions/ Dues (Magazines, Clubs)',
                    'Insurance (Health, Car, Rental)',
                    'Misc. Daily Expenses',
                    'Other',
                    'Other',
                    'Total'
                ]} 
                />   
                </Grid> 
                <Grid item xs={12}>
                 <h2>Net Cashflow: ${total1} - ${total2} = {(total1 -total2) >= 0 ?<div style={{color:'#42f55a'}}>${(total1 -total2)}</div> :<div style={{color:'#f54242'}}>${(total1 -total2)}</div> }</h2>
                  </Grid>                                                                                                                        
                 <Grid item xs={12}>
                 <Button
                        variant="outlined"
                        color="primary"
                        onClick={submit}
                        
                      >
                        Save Budget
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
              Your Budget Has Been Saved
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
