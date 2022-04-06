import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple, red } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import { FormControlLabel, MobileStepper, Paper, StepConnector, StepContent, StepIcon, StepLabel, Typography, useMediaQuery } from '@material-ui/core';
import CFCQuestionText from './questiontext';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Check from '@material-ui/icons/Check';
import { Autocomplete } from '@material-ui/lab';
import { Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemIcon } from '@material-ui/core';


const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  stepper:{
    height: '80%'
  },
  label:{
    paddingLeft: '20px',
    cursor: 'pointer',
  },
  stepContainer:{
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '20px',

  },
  completedLabel:{
    color: 'rgba(0, 0, 0, 0.50)',
  },
  activeLabel:{

  },
  regularLabel:{

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    top: "auto",
    height: '90%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    top: "auto",
    width: 0,
    height: '90%',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  // ^^^ For the drawer

  dots: {
    // backgroundColor: 'red',
    // display: 'flex',
    // justifyContent: 'space-evenly',
    // alignItems: 'center',
    // height: '100vh',
  },
  dot: {
   
  },
  completedDot: {
    color: "#00c853",
  },
  dotActive: {
    // width: '20px',
    // height: '20px',
    // backgroundColor: "#00c853",
  },
  vertical: {
    //color: 'red',
    // backgroundColor: 'red',
  },
}));

export default function CFCProgressDots( props ) {

    const classes = useStyles();
    const theme = useTheme();
    const isTabletOrMobile = useMediaQuery('(max-width:1600px)');
    const handleStep = (step) => () => {
      props.sendAnswer();
      props.setActiveStep(step);
      props.handleDrawerClose()
    };
   
    // console.log("hi",props.input[props.activeStep])
    
    // const dotClass = clsx({
    //   [classes.dot]: true ,
    //   [classes.completedDot]: props.input[props.activeStep] ? props.input[props.activeStep].input : false,

    // });

    // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  return (
    <>
    {isTabletOrMobile ? (
    <Drawer 
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.drawerOpen,
        [classes.drawerClose]: !props.drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.drawerOpen,
          [classes.drawerClose]: !props.drawerOpen,
        }),
      }}
    >
      <Stepper orientation='vertical' nonLinear activeStep={props.activeStep} connector={() => {return(<></>)}}>
              {props.input.map((i, index) => (
                <Step
                key={index} 
                // className={classes.dots}
                className={classes.stepContainer} 
                completed={props.input[index] ? props.input[index].input != null : false}
                classes={
                  {
                    vertical: classes.vertical,
                  }
                }>
                  {/* {props.activeStep == index && <StepLabel icon={() => {}}>{index + 1}</StepLabel>} */}
                    <StepButton 
                    className={classes.dot}  
                    onClick={handleStep(index)}
                    classes={{
                      completed: classes.completedDot,
                    }
                    }
                    >
                    </StepButton>
                    <StepLabel 
                    onClick={handleStep(index)}
                    className={classes.label} 
                    StepIconComponent={() => {return(<></>)}}
                    classes={
                      {
                        completed: classes.completedLabel,
                        active: classes.activeLabel,
                        label: classes.regularLabel,
                      }
                    }
                    >
                      {props.input[index].name}
                    </StepLabel>
                  
                </Step>
              ))}
            </Stepper>
        
      </Drawer>
      ) : (
        <Drawer 
      variant="permanent"
      className={clsx(classes.drawer, classes.drawerOpen)}
      classes={{
        paper: clsx(
          classes.drawerOpen
        ),
      }}
    >
      <Stepper orientation='vertical' nonLinear activeStep={props.activeStep} connector={() => {return(<></>)}}>
              {props.input.map((i, index) => (
                <Step
                key={index} 
                // className={classes.dots}
                className={classes.stepContainer} 
                completed={props.input[index] ? props.input[index].input != null : false}
                classes={
                  {
                    vertical: classes.vertical,
                  }
                }>
                  {/* {props.activeStep == index && <StepLabel icon={() => {}}>{index + 1}</StepLabel>} */}
                    <StepButton 
                    className={classes.dot}  
                    onClick={handleStep(index)}
                    classes={{
                      completed: classes.completedDot,
                    }
                    }
                    >
                    </StepButton>
                    <StepLabel 
                    onClick={handleStep(index)}
                    className={classes.label} 
                    StepIconComponent={() => {return(<></>)}}
                    classes={
                      {
                        completed: classes.completedLabel,
                        active: classes.activeLabel,
                        label: classes.regularLabel,
                      }
                    }
                    >
                      {props.input[index].name}
                    </StepLabel>
                  
                </Step>
              ))}
            </Stepper>
        
      </Drawer>
    ) }
    
      {/* <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
        </div> */}
        
          
      </>
  );
}