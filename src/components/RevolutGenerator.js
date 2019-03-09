import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function RevolutGenerator () {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Revolut Not Yet Supported.
      </Typography>

      <Button component={Link} to='/' variant="contained">
        Home
      </Button>
    </>
  )
}