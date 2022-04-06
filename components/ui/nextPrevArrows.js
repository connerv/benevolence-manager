import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Button, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';




const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
  },
  dots: {
    // color: theme.palette.primary.light,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    // padding: '0px 25% 0px 25%',
  },
  dot: {
    backgroundColor: theme.palette.primary.light,
  },
  dotActive: {
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

export default function CFCNextPrevButtons( props ) {

    const classes = useStyles();
    const theme = useTheme();

  return (
    <div style={{marginTop: '20px'}}>
        <Grid container display='flex' justify='space-between'>
          { props.activeStep > 0 ?
            <Grid item>
              <Button color='primary' startIcon={<ArrowBackIcon/>} onClick={props.handlePrev}>Previous</Button>
            </Grid> :
            <Grid item>
            </Grid>
          }
          {!props.showEnd && 
            <Grid item>
              <Button color='primary' endIcon={<ArrowForwardIcon/>} onClick={props.handleNext}>Next</Button>
            </Grid>
          }
        </Grid>
    </div>
  );
}