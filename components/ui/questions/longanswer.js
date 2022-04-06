import React, { Fragment } from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CFCSmallTextField from '../smalltextfield';
import Paper from '@material-ui/core/Paper'
import CFCQuestionText from '../questiontext';
import CFCBigTextField from '../bigtextfield';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    // padding: theme.spacing(4),
    backgroundColor: 'transparent',
  },
  text: {
    marginBottom: theme.spacing(3),
  },
}));

export default function CFCLongAnswer(props) { //props = {question}

    let {input, index, updateInput} = props
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
        // <Paper className={classes.paper}>
        <div className={classes.paper}>
          <div className={classes.text}>
                <CFCQuestionText text={props.question}></CFCQuestionText>
          </div>
          <CFCBigTextField input={val} updateInputHelper={updateInputHelper} autoFocus={true} inputRef={props.inputRef}></CFCBigTextField>
        </div>
        // </Paper>
    )
}