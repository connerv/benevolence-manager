import React, { Fragment } from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import CFCShortAnswer from './shortanswer';
import CFCLongAnswer from './longanswer';
import CFCRadioButtons from './radiobuttons';
import CFCPickDateTime from './pickdatetime';
import CFCPickDate from './pickdate';
import CFCPickTime from './picktime';
import CFCPhoneNumber from './phonenumber';
 


export default function CFCParseQuestion( props ) {

      switch (props.type) {
        case 'SA':
          return buildShortAnswer(props);
        case 'LA':
          return buildLongAnswer(props);
        case 'OP':
          return buildRadioButtons(props);
        case 'DT':
          return buildPickDateTime(props);
        case 'DA':
          return buildPickDate(props);
        case 'TI':
          return buildPickTime(props);
        case 'PH':
          return buildPhoneNumber(props);
        default:
          return (<Typography>Error: No question type specified</Typography>)
      }

}

function buildShortAnswer(props) {
  return (
   <CFCShortAnswer {...props} ></CFCShortAnswer> 
  )
}

function buildLongAnswer(props) {
  return (
    <CFCLongAnswer {...props} ></CFCLongAnswer>
  )
}

function buildRadioButtons(props) {
  return (
    <CFCRadioButtons {...props}></CFCRadioButtons>
  )
}

function buildPickDateTime(props) {
  return (
    <CFCPickDateTime {...props}></CFCPickDateTime>
  )
}

function buildPickDate(props) {
  return (
    <CFCPickDate {...props}></CFCPickDate>
  )
}

function buildPickTime(props) {
  return (
    <CFCPickTime {...props}></CFCPickTime>
  )
}

function buildPhoneNumber(props) {
  return (
    <CFCPhoneNumber {...props}></CFCPhoneNumber>
  )
}