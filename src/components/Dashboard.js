import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FirebaseDatabaseNode } from "@react-firebase/database";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import MUIDataTable from "mui-datatables"
import moment from 'moment'

import { providers } from '../common'

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  overrides: {
    MuiPaper: {
      root: {
        display: 'grid',
        overflowX: 'auto'
      }
    },
    MuiTableCell: {
      root: {
        overflowX: 'auto'
      }
    }
  }
})

const useStyles = makeStyles(theme => ({
  width: {
    width: '75%'
  }
}))

const columns = [
  {
    name: 'Date',
    options: {
      customBodyRender: value => {
        return moment().diff(moment.unix(value), 'hours', true) < 1
          ? moment.unix(value).fromNow()
          : moment.unix(value).calendar()
      }
    }
  },
  "From",
  "To",
  "Amount",
  "Currency Sent",
  "Currency Received",
  {
    name: 'Transaction',
    options: {
      customBodyRender: value => {
        return value === '' ? '' : (
          <a
            href={`https://etherscan.io/tx/${value}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {value.substring(0, 6)}
            ...
            {value.substring(value.length - 4)}
          </a>
        )
      }
    }
  }
]

const options = {
  selectableRows: false,
}

export default function Dashboard ({ provider }) {
  const classes = useStyles()
  const [liquidityProvider, setLiquidityProvider] = useState(providers[0])

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.width}>
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
        </form>

        <FirebaseDatabaseNode
          path="venmo/"
          limitToLast={2}
          orderByChild={"timestamp"}
        >
          {d => {
            if (d.isLoading === false && d.value !== null) {
              const { dummy, ...rawData } = d.value

              const data = Object.values(rawData).map(transaction => {
                return [
                  transaction['timestamp'],
                  transaction['from'],
                  transaction['to'],
                  transaction['amount'],
                  transaction['currencyFrom'],
                  transaction['currencyTo'],
                  transaction['hash'] || ''
                ]
              })

              return <MUIDataTable
                title={"Transaction Log"}
                data={data}
                columns={columns}
                options={options}
              />
            }
            else {
              return null
            }
          }}
        </FirebaseDatabaseNode>

        <Button component={Link} to='/' variant="contained">
          Home
        </Button>
      </div>
    </MuiThemeProvider>
  )
}