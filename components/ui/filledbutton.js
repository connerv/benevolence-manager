import React from 'react';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    filled: {
        width: '100%',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: theme.typography.button,
        padding: '16px 32px',
      //   border: '1px solid',
        // lineHeight: 1.5,
        borderRadius: '50px',
        color: '#FFFFFF',
        backgroundColor: theme.palette.primary.main,
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
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
        '&:active': {
          backgroundColor: theme.palette.primary.dark,
        //   borderColor: theme.palette.primary.light,
        },
        '&:focus': {
        //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      },
    }));

export default function CFCFilledButton(props) {

    const classes = useStyles();

    return (
        <Button className={classes.filled} onClick={props.onClick}>{props.text}</Button>
    )
}