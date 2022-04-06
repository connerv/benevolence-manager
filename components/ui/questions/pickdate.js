import React, { Fragment } from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CFCQuestionText from '../questiontext';
import { Box, Grid, Paper } from '@material-ui/core';
import CFCDatePicker from '../datepicker';
import CFCTimePicker from '../timepicker';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
  },
  text: {
    marginBottom: theme.spacing(3),
  },
}));

export default function CFCPickDate( props ) { //props = {question}

    let {input, index, updateInput} = props
    const classes = useStyles()
    let [val, setVal] = React.useState(new Date())


    React.useEffect(() => {
      if(input[index].input){
        if(input[index].input instanceof Date){
          setVal(input[index].input)
        }else{
          setVal(input[index].input.toDate())
        }
      }else{
        setVal(new Date())
        input[index].input = new Date()
        updateInput([...input]);
      }
    }, [input])

    const updateInputHelper = (event) => {
      input[index].input = new Date(event)
      setVal(new Date(event))
      updateInput([...input]); // Sends the new text on to the real handler, this step is necessary for question types with more complex inputs like date and time
    };

    return (
      <Fragment>
        <div className={classes.text}>
          <CFCQuestionText text={props.question}></CFCQuestionText>
        </div>
        <Grid container justify="space-evenly" alignItems='stretch' spacing={3}>
          <Grid item>
            <CFCDatePicker input={val} updateInput={updateInputHelper} ></CFCDatePicker>
          </Grid>
        </Grid>
      </Fragment>
    )
}