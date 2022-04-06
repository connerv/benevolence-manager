import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import clsx from "clsx";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { createQuestion } from "../../helpers/db";
import CircularProgress from "@material-ui/core/CircularProgress";




function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



function CreateOptions(props){
    const [newOption, setNewOption] = React.useState("")

    const handleOptionsChange = (e) => {

        props.qOptions.push(newOption)
        props.setQOptions([...props.qOptions])
        setNewOption("")

    };

    const handleNewOptions = (e) => {

        setNewOption(e.target.value)

    };

    const handleDelete = (e) => {
        
        console.log(e.currentTarget.getAttribute("data-index"))
        props.qOptions.splice(e.currentTarget.getAttribute("data-index"), 1)
        props.setQOptions([...props.qOptions])
        setNewOption
    }
     
    return (
      
    <div>
            
        <List style={{left: "50%"}} >
            <ListItem>
                <TextField
                    id="newQ"
                    label="New Option"
                    placeholder="New Option"
                    variant="outlined"
                    onChange={handleNewOptions}
                    type="text"
                    value={newOption}
                    //onKeyDown={}
                    size="small"
                    //className={classes.search}
                    /> 
                    
                    <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="add" onClick={handleOptionsChange}>
                    <AddCircleIcon></AddCircleIcon>
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
           {props.qOptions.map((option, index) =>
                <ListItem >
                <ListItemText primary={option}/>
                <ListItemIcon>
                <div data-index={index} onClick={handleDelete}>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </div>
                   
                </ListItemIcon>
                </ListItem>
            )}
            
        </List>
      
      
    </div>
       
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "50ch",
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

export default function CreateNewQuestions({refreshQuestions}) {
  const classes = useStyles();
  
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] =  React.useState({open: false, message: ''});
  const [errorMessage, setErrorMessage] =  React.useState({open: false, message: ''});

  const [qType, setQType] = React.useState("SA")
  const [qCategory, setQCategory] = React.useState("identifying-info")
  const [qName, setQName] = React.useState("")
  const [qQuestion, setQQuestion] = React.useState("")
  const [qOptions, setQOptions] = React.useState([])

  const inputElement = React.useRef(null);

  React.useEffect(() => {
    return () => {
      setSuccess(false);
    };
  }, []);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
 
  const handleFailClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMessage({open: false, message: ''});
    setSuccessMessage({open: false, message: ''});
  };

  const handleTypeChange = (e) => {
    setQType(e.target.value)
  };

  const handleCategoryChange = (e) => {
    setQCategory(e.target.value)
  };
  const handleNameChange = (e) => {
    setQName(e.target.value)
  };
  const handleQuestionChange = (e) => {
    setQQuestion(e.target.value)
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit()
    }
  };

  const submit = async (e) => {
    console.log(qType, qName, qQuestion, qOptions, qCategory);
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      let res = await createQuestion(qType, qName, qQuestion, qOptions, qCategory)
      console.log(res)
      if(res.type === "success"){
        
        setLoading(false);
        setQName("");
        setQQuestion("");
        setQOptions([])
        setSuccessMessage({open: true, message: res.message});
        refreshQuestions()
        inputElement.current.focus();
      } else {
        
        setLoading(false)
        setErrorMessage({open: true, message: res.message});
      }
      
    }
  }
  

  return (
    

      
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
                 
                  <h2>Create Question</h2>

                  <Grid item xs={12} >
                      <FormControl className={classes.formControl}>
                    <InputLabel id="type-label">Question Type</InputLabel>
                      <Select
                        labelId="type-label"
                        id="aType"
                        value={qType}
                        onChange={handleTypeChange}
                      >
                        <MenuItem value={'SA'}>Short Answer</MenuItem>
                        <MenuItem value={'LA'}>Long Answer</MenuItem>
                        <MenuItem value={'DT'}>Date Time</MenuItem>
                        <MenuItem value={'DA'}>Date</MenuItem>
                        <MenuItem value={'TI'}>Time</MenuItem>
                        <MenuItem value={'OP'}>Options</MenuItem>
                        <MenuItem value={'PH'}>Phone Number</MenuItem>
                      </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} >
                      <FormControl className={classes.formControl}>
                    <InputLabel id="type-label">Category</InputLabel>
                      <Select
                        labelId="type-label"
                        id="aType"
                        value={qCategory}
                        onChange={handleCategoryChange}
                      >
                        <MenuItem value={'identifying-info'}>Identifying Information</MenuItem>
                        <MenuItem value={'finances'}>Finances</MenuItem>
                        <MenuItem value={'current-situation'}>Current Situation and Reason for Request</MenuItem>
                        <MenuItem value={'housing'}>Housing Situation</MenuItem>
                        <MenuItem value={'education'}>Education/Work History</MenuItem>
                        <MenuItem value={'action'}>Action Plan</MenuItem>
                        <MenuItem value={'health'}>Spiritual/Social/Emotional/Mental Health</MenuItem>
                      </Select>
                      </FormControl>
                    </Grid>

                  
                    <form noValidate autoComplete="off">
                    <Grid item xs={12}>
                      <TextField
                        required
                        autoFocus
                        id="name"
                        label="Question Name"
                        placeholder="Enter a name for this question"
                        variant="outlined"
                        onChange={handleNameChange}
                        type="text"
                        value={qName}
                        ref={inputElement}
                        
                      />
                    </Grid>

                    <Grid item xs={12} >
                      <TextField
                        required
                        id="question"
                        label="Question"
                        placeholder="Enter the question to be asked"
                        variant="outlined"
                        onChange={handleQuestionChange}
                        onKeyDown={handleKeyDown}
                        type="text"
                        value={qQuestion}
                       

                      />
                    </Grid>

                  
                  {qType === 'SA' ? (
                    <></>
                  )
                  : (
                    <></>
                  )
                  }

                  {qType === 'PH' ? (
                    <></>
                  )
                  : (
                    <></>
                  )
                  }

                  {qType === 'LA' ? (
                     <></>
                  )
                  : (
                    <></>
                  )
                  }
                  {qType === 'DT' ? (
                     <></>
                  )
                  : (
                    <></>
                  )
                  }
                  {qType === 'DA' ? (
                     <></>
                  )
                  : (
                    <></>
                  )
                  }
                  {qType === 'TI' ? (
                     <></>
                  )
                  : (
                    <></>
                  )
                  }
                  {qType === 'OP' ? (
                      <Grid item xs={6}>
                        <CreateOptions qOptions={qOptions} setQOptions={setQOptions} ></CreateOptions>
                     </Grid>
                  )
                  : (
                    <div></div>
                  )
                  }
                 <div style={{marginTop: "20px", marginBottom: "20px", }}></div>
                  <Grid item xs={12}>
                      <div className={classes.wrapper}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={submit}
                          className={buttonClassname}
                          disabled={loading}
                        
                        >
                          Create New Question
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </Grid>
                    </form>
              {errorMessage.open ? (
                  <Alert onClose={handleFailClose} severity="error">
                  {errorMessage.message}
                  </Alert>
              )
            : (
            <></>
            )}   

             {successMessage.open ? (
                  <Alert onClose={handleFailClose} severity="success">
                  {successMessage.message}
                  </Alert>
              )
            : (
            <></>
            )}      
              
           

                </Paper>
              </Grid>
            </Grid>
            
            
            
          </div>
          

          
     
    </div>
  );
}
