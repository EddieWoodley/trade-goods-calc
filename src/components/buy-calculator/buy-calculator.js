import React, { useState } from 'react'
import { FormControl, Grid, MenuItem, Select, makeStyles, InputLabel, TextField } from '@material-ui/core'
import { formatModifier, formatPrice, formatWeight } from '../../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}))

const BuyCalculator = (props) => {
  const localEconomy = props.localEconomy || []
  const [selectedItem, setSelectedItem] = useState(localEconomy[0])
  const [quantity, setQuantity] = useState(1)
  const [tradeModifier, setTradeModifier] = useState(0)
  const classes = useStyles()

  const basePrice = selectedItem.tradeGood.price * quantity
  const localPrice = basePrice * (1 + selectedItem.demandLevel.modifier)
  const tradePrice = basePrice * (1 + selectedItem.demandLevel.modifier + tradeModifier)

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="trade-good-label">
              Trade Good
            </InputLabel>
            <Select
              labelId="trade-good-label"
              label="Trade Good"
              value={selectedItem}
              onChange={e => setSelectedItem(e.target.value)}
            >
              {localEconomy.map(item => (
                <MenuItem key={item.tradeGood.title} value={item}>
                  {item.tradeGood.title} ({item.demandLevel.title})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            variant="outlined"
            value={quantity}
            inputProps={{
              min: 1
            }}
            onChange={e => setQuantity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Total Weight"
            variant="outlined"
            inputProps={{ readOnly: true }}
            value={formatWeight(selectedItem.tradeGood.weight * quantity)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Demand Modifier"
            variant="outlined"
            inputProps={{ readOnly: true }}
            value={formatModifier(selectedItem.demandLevel.modifier)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="trade-check-label">
              Trade Check Modifier
            </InputLabel>
            <Select
              labelId="trade-check-label"
              label="Trade Check Modifier"
              value={tradeModifier}
              onChange={e => setTradeModifier(e.target.value)}
            >
              {[-0.15, -0.1, 0, 0.1, 0.15].map(value => (
                <MenuItem key={value} value={value}>
                  {formatModifier(value)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Local Price"
            variant="outlined"
            inputProps={{ readOnly: true }}
            value={formatPrice(localPrice)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Trade Price"
            variant="outlined"
            inputProps={{ readOnly: true }}
            value={formatPrice(tradePrice)}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default BuyCalculator