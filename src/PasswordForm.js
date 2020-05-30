import React, {useState} from 'react'
import {Formik, Form} from "formik";
import { Button, Checkbox, IconButton, TextField, Typography } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons"
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
  const {includeUppercase, includeLowercase, includeNumbers, includeSpecialChars, passwordLength} = initialValues

  const generatePassword = ({includeUppercase, includeLowercase, includeNumbers, includeSpecialChars, passwordLength}) => {
    console.log('password length: ', passwordLength)
    setPassword('dummy password')

  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      console.log('clipboard worked')
    })
  }


  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
      >
        {({ handleChange, handleReset, onSubmit, values}) => (
          <Form onSubmit={() => generatePassword(values)}>
            <TextField placeholder='Click below' value={password}/>
            <IconButton onClick={copyPassword}><FileCopy /></IconButton>
            <SpacedDiv header="Password Length">
              <TextField style={{width: '50px'}} name='passwordLength' defaultValue={passwordLength} type="number"/>
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
            <Button type="submit">Generate Password</Button>
          </Form>
          )}
      </Formik>
    </FormContainer>

  )
}