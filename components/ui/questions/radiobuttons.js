import React, { Fragment } from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CFCRadioButton from '../radiobutton';
import CFCQuestionText from '../questiontext';
import { Paper } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
  text: {
    marginBottom: theme.spacing(3),
  },
}));

export default function CFCRadioButtons( props ) { //props = {question, [options]}

    let {input, index, updateInput} = props
    const classes = useStyles()
    let [val, setVal] = React.useState('')


    React.useEffect(() => {
      setVal(input[index].input || "")
    }, [])

  const updateInputHelper = (event) => {
    input[index].input = event.target.value
    setVal(event.target.value)
    updateInput([...input]); // Sends the new text on to the real handler, this step is necessary for question types with more complex inputs like date and time
  };

    return (
      <Fragment>
        <div className={classes.text}>
          <CFCQuestionText text={props.question}></CFCQuestionText>
        </div>
        <FormControl component="fieldset">
        <RadioGroup row value={val} defaultValue="none" name="customized-radios" onChange={updateInputHelper}>
         
          {
            props.options.map((a, i) => (
              <CFCRadioButton label={a} value={a} key={i}></CFCRadioButton>
            ))
          }

        </RadioGroup>
      </FormControl>
      </Fragment>
    )
}