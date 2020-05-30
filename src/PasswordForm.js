import React, {useState} from 'react'
import {Formik, Form} from "formik";
import { Button, Checkbox, IconButton, Snackbar, TextField, Typography } from "@material-ui/core";
import { Done, FileCopy } from "@material-ui/icons"
import FormContainer from "./StyledComponents/FormContainer";

const initialValues = {
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSpecialChars: true,
  passwordLength: 8,
}

function SpacedDiv({children, header}) {
  return (
    <div style={{'display': 'flex', 'justify-content': 'space-between'}}>
      {header && <Typography>{header}</Typography>}
      {children}
    </div>
  )
}


export default function PasswordForm() {
  const [password, setPassword] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const {includeUppercase, includeLowercase, includeNumbers, includeSpecialChars, passwordLength} = initialValues

  const generatePassword = ({includeUppercase, includeLowercase, includeNumbers, includeSpecialChars, passwordLength}) => {
    const chars = []
    if (includeUppercase) chars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    if (includeLowercase) chars.push('abcdefghijklmnopqrstuvwxyz')
    if (includeNumbers) chars.push('0123456789')
    if (includeSpecialChars) chars.push('!"#$%&()*+-,./:<>=?[]@^_{}`~')
    let passwordString = ''
    for (let i=0; i<passwordLength;i++) {
      let currentSet = chars[Math.floor(Math.random() * chars.length)]
      let selectedChar = currentSet[Math.floor(Math.random() * currentSet.length)]
      passwordString = passwordString.concat(selectedChar)
    }
    setPassword(passwordString)
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      setSnackbarOpen(true)
    })
  }


  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
      >
        {({ handleChange, handleReset, onSubmit, values}) => (
          <Form onSubmit={() => generatePassword(values)}>
            <TextField disabled placeholder='Click below' value={password} variant='outlined'/>
            <IconButton onClick={copyPassword}><FileCopy /></IconButton>
            <SpacedDiv header="Password Length">
              <TextField style={{width: '50px'}} name='passwordLength' defaultValue={passwordLength} onChange={handleChange} type="number"/>
            </SpacedDiv>
            <SpacedDiv header="Include uppercase characters">
              <Checkbox name='includeUppercase' defaultChecked={includeUppercase} onChange={handleChange}/>
            </SpacedDiv>
            <SpacedDiv header="Only lowercase characters">
              <Checkbox name='includeLowercase' defaultChecked={includeLowercase} onChange={handleChange}/>
            </SpacedDiv>
            <SpacedDiv header="Include numbers">
              <Checkbox name='includeNumbers' defaultChecked={includeNumbers} onChange={handleChange}/>
            </SpacedDiv>
            <SpacedDiv header="Include Special Characters">
              <Checkbox name='includeSpecialChars' defaultChecked={includeSpecialChars} onChange={handleChange}/>
            </SpacedDiv>
            <Button onClick={(e) => {
              e.preventDefault()
              console.log('valeues: ', values)
              generatePassword(values)
            }} type="submit">Generate Password</Button>
          </Form>
          )}
      </Formik>
      <Snackbar
        action={<IconButton onClick={() => setSnackbarOpen(false)}><Done /></IconButton>}
        onEntered={() => setTimeout(() => setSnackbarOpen(false), 3000)}
        open={snackbarOpen}
        message="Copied to clipboard"
      />
    </FormContainer>

  )
}