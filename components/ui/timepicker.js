import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CFCSmallTextField from './smalltextfield';
import Icon from '@material-ui/core/Icon';
import ScheduleIcon from '@material-ui/icons/Schedule';




const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
  text: {
    marginBottom: theme.spacing(3),
  },
  root: {
    width: '100%',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    borderWidth: 2,
    // color: '#FFFFFF',
    // borderColor: theme.palette.primary.light,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '& label.Mui-focused': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
      '& .MuiInput-underline:after': {
        borderColor: theme.palette.primary.main,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.primary.light,
          borderWidth: 2,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
        },
      },
  },
}));

export default function CFCTimePicker( props ) {

    const classes = useStyles();

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker className={classes.root} value={props.input} onChange={props.updateInput} inputVariant='outlined' />
        {/* <KeyboardTimePicker className={classes.root} value={props.input} onChange={props.updateInput} disablePast='true' inputVariant='outlined' keyboardIcon={<ScheduleIcon color='primary'/>}/> */}
      </MuiPickersUtilsProvider>
    )
}