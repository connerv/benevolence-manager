import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import { FormControlLabel, Typography } from '@material-ui/core';
import CFCQuestionText from './questiontext';
import { Fragment } from 'react';
import CFCFilledButton from './filledbutton';



const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
  space: {
    marginRight: theme.spacing(4)
  },
  text: {
    marginBottom: theme.spacing(3),
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
  }
}));

export default function CFCSubmitAnswers( props ) {

    const classes = useStyles();
    const [message, setMessage] = React.useState("")
    React.useEffect(() => {
      setMessage(props.submitMessage)
    }, )
    return (
      <Fragment>
          <div className={classes.text}>
                <CFCQuestionText text={message}></CFCQuestionText>
          </div>
          { props.numQuestions == props.numAnswers() &&
            <CFCFilledButton text="Done" onClick={props.onClick}></CFCFilledButton>
          }
      </Fragment>
    )
}