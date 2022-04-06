import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import clsx from 'clsx';
import { FormControlLabel, Typography } from '@material-ui/core';
import CFCQuestionText from './questiontext';




const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
  space: {
    marginRight: theme.spacing(4)
  },
}));

export default function CFCRadioButton( props ) {

    const classes = useStyles();

    return (
      <FormControlLabel className={classes.space} value={props.value} control={<Radio className={classes.button}/>} label={<CFCQuestionText text={props.label}></CFCQuestionText>} />

      // If I want to customize this later

      // <Radio
      //   className={classes.root}
      //   disableRipple
      //   color="default"
      //   checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      //   icon={<span className={classes.icon} />}
      //   {...props}
      // />
    )
}