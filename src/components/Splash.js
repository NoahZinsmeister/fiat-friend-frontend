import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { providers } from '../common'

const useStyles = makeStyles(theme => ({
  colored: {
    color: theme.palette.primary.main
  }
}))

export default function Splash () {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Welcome!
      </Typography>

      <Typography variant="h4" gutterBottom>
        Accept crypto from your <span className={classes.colored}>FiatFriends</span>.
      </Typography>

      <Button component={Link} to='/venmo' variant="contained" size="large">
        US (Venmo)
      </Button>

      <Button component={Link} to='/revolut' variant="contained" size="large">
        EU (Revolut)
      </Button>

      <Button component={Link} to={`/dashboard/${providers[0]}`} variant="contained">
        Dashboard
      </Button>
    </>
  )
}