import React from 'react';
import './App.css';
import PasswordForm from "./PasswordForm";
import { createMuiTheme, ThemeProvider, withStyles } from "@material-ui/core/styles";

const styles = {
  app: {
    textAlign: 'center',
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFC6D9'
    },
    secondary: {
      main: '#FFC6D9'
    },
  },
  typography: {
    fontFamily: [
      'Manrope',
    ].join(','),
    button: {
      fontWeight: '700'
    }
  },
})


function App(props) {
  const { classes } = props
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <PasswordForm />
      </div>
    </ThemeProvider>
);
}

export default withStyles(styles)(App);
