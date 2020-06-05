import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Done, FileCopy } from "@material-ui/icons";
import FormContainer from "./StyledComponents/FormContainer";

const initialValues = {
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSpecialChars: true,
  passwordLength: 8,
};

const styles = {
  mainHeader: {
    display: "block",
    fontSize: "30px",
    margin: "20px 0",
  },
  center: {
    textAlign: "center",
  },
  passwordField: {
    textAlign: "center",
    marginBottom: 20,
  },
};

function SpacedDiv({ children, header }) {
  return (
    <div style={{ display: "flex", "justify-content": "space-between" }}>
      {header && <Typography>{header}</Typography>}
      {children}
    </div>
  );
}

function PasswordForm(props) {
  const { classes } = props;
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialChars,
    passwordLength,
  } = initialValues;

  const generatePassword = ({
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialChars,
    passwordLength,
  }) => {
    const chars = [];
    if (includeUppercase) chars.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if (includeLowercase) chars.push("abcdefghijklmnopqrstuvwxyz");
    if (includeNumbers) chars.push("0123456789");
    if (includeSpecialChars) chars.push('!"#$%&()*+-,./:<>=?[]@^_{}`~');
    let passwordString = "";
    for (let i = 0; i < passwordLength; i++) {
      let currentSet = chars[Math.floor(Math.random() * chars.length)];
      let selectedChar =
        currentSet[Math.floor(Math.random() * currentSet.length)];
      passwordString = passwordString.concat(selectedChar);
    }
    setPassword(passwordString);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      setSnackbarOpen(true);
    });
  };

  return (
    <FormContainer>
      <header className={classes.mainHeader}>Password Generator</header>
      <Formik initialValues={initialValues}>
        {({ handleChange, handleReset, onSubmit, values }) => (
          <Form onSubmit={() => generatePassword(values)}>
            <TextField
              InputProps={{ "text-align": "center" }}
              className={classes.passwordField}
              color="primary"
              endIcon={
                <IconButton onClick={copyPassword}>
                  <FileCopy />
                </IconButton>
              }
              fullWidth
              value={password}
              variant="filled"
            />
            <SpacedDiv header="Password Length">
              <TextField
                style={{ width: 30, textAlign: "center" }}
                name="passwordLength"
                defaultValue={passwordLength}
                onChange={handleChange}
                type="number"
              />
            </SpacedDiv>
            <SpacedDiv header="Include uppercase characters">
              <Checkbox
                color="secondary"
                name="includeUppercase"
                defaultChecked={includeUppercase}
                onChange={handleChange}
              />
            </SpacedDiv>
            <SpacedDiv header="Only lowercase characters">
              <Checkbox
                color="secondary"
                name="includeLowercase"
                defaultChecked={includeLowercase}
                onChange={handleChange}
              />
            </SpacedDiv>
            <SpacedDiv header="Include numbers">
              <Checkbox
                color="secondary"
                name="includeNumbers"
                defaultChecked={includeNumbers}
                onChange={handleChange}
              />
            </SpacedDiv>
            <SpacedDiv header="Include Special Characters">
              <Checkbox
                color="secondary"
                name="includeSpecialChars"
                defaultChecked={includeSpecialChars}
                onChange={handleChange}
              />
            </SpacedDiv>
            <Button
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                generatePassword(values);
              }}
              variant="contained"
              type="submit"
            >
              Generate Password
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar
        action={
          <IconButton onClick={() => setSnackbarOpen(false)}>
            <Done />
          </IconButton>
        }
        onEntered={() => setTimeout(() => setSnackbarOpen(false), 3000)}
        open={snackbarOpen}
        message="Copied to clipboard"
      />
    </FormContainer>
  );
}

export default withStyles(styles)(PasswordForm);
