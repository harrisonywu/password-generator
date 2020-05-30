import React from 'react';
import {styled, withStyles} from '@material-ui/core/styles';
import {compose, palette, spacing} from '@material-ui/system';
import styles from './FormContainer.styles'

const Box = styled('div')(compose(spacing, palette));

export function FormContainer({ children, classes }) {
  return (
    <Box className={classes.formContainer} color="white" bgcolor="palevioletred" p={1}>
      {children}
    </Box>
  );
}

export default withStyles(styles)(FormContainer)