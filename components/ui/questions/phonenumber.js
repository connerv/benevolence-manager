import React, { Fragment } from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, purple, red } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';
import CFCSmallTextField from '../smalltextfield';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CFCQuestionText from '../questiontext';
import { isPropertySignature } from 'typescript';
import CFCPhoneNumberField from '../phonenumberfield';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
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

export default function CFCPhoneNumber(props) { //props = {question}
  let {question, input, index, updateInput} = props
  const classes = useStyles()
  let [val, setVal] = React.useState('')


  React.useEffect(() => {
    setVal(input[index].input || "")
  })

  const updateInputHelper = (event) => {
    input[index].input = event.target.value
    setVal(event.target.value)
    updateInput([...input]); // Sends the new text on to the real handler, this step is necessary for question types with more complex inputs like date and time
  };

    return (
      <Fragment>
          <div className={classes.text}>
                <CFCQuestionText text={question}></CFCQuestionText>
          </div>
          <CFCPhoneNumberField input={val} autoFocus={true} updateInputHelper={updateInputHelper} inputRef={props.inputRef}></CFCPhoneNumberField>
      </Fragment>
    )
}