import React from 'react';
import './App.css';
import PasswordForm from "./PasswordForm";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  mainHeader: {
    border: 'solid 1px red',
    padding: '0 10px',
    borderRadius: 10,
    display: 'inline',
  }
}

function App(props) {
  const { classes } = props
  return (
    <div className="App">
      <header className={classes.mainHeader}>PASSWORD GENERATOR</header>
      <PasswordForm />
    </div>
  );
}

export default withStyles(styles)(App);
