
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import QRCode from 'qrcode.react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

import { providers, currencies } from '../common'

export default function VenmoGenerator () {
  const [liquidityProvider, setLiquidityProvider] = useState(providers[0])
  const [recipient, setRecipient] = useState("")
  const [recipientCurrency, setRecipientCurrency] = useState(currencies[0])
  const [amount, setAmount] = useState("")

  function wrapSetAmount(event) {
    if (Number(event.target.value) > 10) {
      setAmount("10")
    } else {
      setAmount(event.target.value)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          required
          select
          disabled
          label="Liquidity Provider"
          helperText="The Venmo username of a liquidity provider"
          margin="normal"
          fullWidth
          value={liquidityProvider}
          onChange={event => setLiquidityProvider(event.target.value)}
        >
          {providers.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem >
          ))}
        </TextField>
        <TextField
          required
          select
          label="Recipient Currency"
          helperText="The token that the recipient will be paid in"
          margin="normal"
          fullWidth
          value={recipientCurrency}
          onChange={event => setRecipientCurrency(event.target.value)}
        >
          {currencies.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem >
          ))}
        </TextField>
        <TextField
          required
          label="Recipient"
          helperText="The ENS name or address of the recipient"
          margin="normal"
          fullWidth
          value={recipient}
          onChange={event => setRecipient(event.target.value)}
        />
        <TextField
          required
          type="number"
          label="Amount"
          helperText="The request amount (up to $10)"
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          fullWidth
          value={amount}
          onChange={wrapSetAmount}
        />
      </form>
      {!!amount && <QRCode
        value={
          `venmo://paycharge?txn=pay&recipients=${liquidityProvider}&amount=${amount}&note=` +
          `${'FiatFriends: ' + JSON.stringify({recipient, recipientCurrency})}`
        }
      />}

      <Button component={Link} to='/' variant="contained">
        Home
      </Button>
    </>
  )
}