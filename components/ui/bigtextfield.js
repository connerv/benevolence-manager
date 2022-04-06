import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, purple, red } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

export default function CFCBigTextField(props) {

    const classes = useStyles();

    return (
        <TextField value={props.input} onChange={props.updateInputHelper} className={classes.root} id="outlined-basic" variant="outlined" multiline rows="10" autoFocus={props.autoFocus} inputRef={props.inputRef}/>
    )
}