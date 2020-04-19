import { default as React, useState } from 'react'
import { 
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  makeStyles,
  TextField,
  Grid
} from '@material-ui/core'

const displayPrice = (price) => {
  const gp = Math.floor(price / 100)
  const gpRemainder = price % 100
  const sp = Math.floor(gpRemainder / 10)
  const cp = Math.floor(gpRemainder % 10)
  let result = ""
  if (gp !== 0) {
    result += `${gp}\u00A0gp `
  }
  if (sp !== 0) {
    result += `${sp}\u00A0sp `
  }
  if (cp !== 0) {
    result += `${cp}\u00A0cp`
  }
  return result.trim()
}

const displayModifier = (modifier) => {
  const percentage = Math.floor(modifier * 100)
  if (percentage >= 0) {
    return `+${percentage}%`
  } else {
    return `${percentage}%`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  grid: {
    marginBottom: theme.spacing(2)
  },
  button: {
    marginRight: theme.spacing(1)
  }
}))

const TradeGoodsTable = (props) => {

  const classes = useStyles()
  const tradeGoods = props.tradeGoods || []
  const demandLevels = props.demandLevels || []
  const defaultDemandLevelIndex = Math.floor(demandLevels.length / 2)

  const [items, setItems] = useState(tradeGoods.map((tradeGood) => {
    return {
      tradeGood: tradeGood,
      demand: defaultDemandLevelIndex,
      isSpeciality: false,
      units: 1
    }
  }))

  const [tradeCheckModifier, setTradeCheckModifier] = useState(0)
  const [specialityModifier, setSpecialityModifier] = useState(0)

  const rollDice = (max) => {
    return Math.floor(Math.random() * max) + 1
  }

  const rollEconomy = () => {
    let updatedItems = tradeGoods.map((tradeGood, index) => {
      let demandRoll = rollDice(20)
      console.log(`Rolled ${demandRoll} for demand of ${tradeGood.title}`)
      let demandIndex = demandLevels.findIndex((demandLevel) => {
        return demandRoll <= demandLevel.maxRoll
      })
      return {
        tradeGood: tradeGood,
        demand: demandIndex,
        isSpeciality: false,
        units: items[index].units
      }
    })
    const specialityItemRoll = rollDice(2)
    console.log(`Rolled ${specialityItemRoll} for speciality item`)
    if (specialityItemRoll > 1) {
      updatedItems[rollDice(updatedItems.length) - 1].isSpeciality = true
    }
    setItems(updatedItems)
  }

  const updateUnits = (event, index) => {
    const updatedItems = [...items]
    updatedItems[index].units = event.target.value
    setItems(updatedItems)
  }

  const updateDemand = (event, index) => {
    const updatedItems = [...items]
    updatedItems[index].demand = event.target.value
    setItems(updatedItems)
  }

  const totalModifier = (item) => {
    const demand = demandLevels[item.demand]
    return demand.modifier + tradeCheckModifier + specialityModifier
  }

  const totalPrice = (item) => {
    const modifier = 1 + totalModifier(item)
    return Math.max(1, item.tradeGood.price * modifier * item.units)
  }

  const copyBBCode = (event) => {
    let result = "[table]\n"
    result += "[tr]"
    result += "[th]Trade Good[/th]"
    result += "[th]Base Price[/th]"
    result += "[th]Demand[/th]"
    result += "[th]Is Speciality[/th]"
    result += "[/tr]\n"
    items.forEach(item => {
      const demand = demandLevels[item.demand]
      result += "[tr]"
      result += `[td]${item.tradeGood.title}[/td]`
      result += `[td]${displayPrice(item.tradeGood.price)}[/td]`
      result += `[td]${(demand.title)}[/td]`
      result += `[td]${(item.isSpeciality ? "Yes" : "No")}[/td]`
      result += "[/tr]\n"
    });
    result += "[/table]"
    navigator.clipboard.writeText(result);
  }

  const copyMarkdown = (event) => {
    let result = ""
    result += "| Trade Good | Base Price | Demand | Is Speciality |\n"
    result += "|:---|:---:|:---:|:---:|\n"
    items.forEach(item => {
      const demand = demandLevels[item.demand]
      result += "| "
      result += `${item.tradeGood.title} | `
      result += `${displayPrice(item.tradeGood.price)} | `
      result += `${(demand.title)} | `
      result += `${(item.isSpeciality ? "Yes" : "No")}|\n`
    });
    navigator.clipboard.writeText(result);
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={12} sm={8}>
          <Button className={classes.button} variant="contained" color="primary" onClick={rollEconomy}>Roll Local Economy</Button>
          <Button className={classes.button} variant="contained" color="primary" onClick={copyBBCode}>Copy BBCode</Button>
          <Button className={classes.button} variant="contained" color="primary" onClick={copyMarkdown}>Copy Markdown</Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField label="Trade Check Modifier" fullWidth type="number" value={tradeCheckModifier} min="-0.2" max="0.2" step="0.5" onChange={e => setTradeCheckModifier(parseFloat(e.target.value))} />
        </Grid>
        <Grid item xs={6} md={2}>
          <TextField label="Speciality Modifier" fullWidth type="number" value={specialityModifier} min="0" max="0.2" step="0.5" onChange={e => setSpecialityModifier(parseFloat(e.target.value))} />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Trade Good</TableCell>
              <TableCell>Base Price</TableCell>
              <TableCell>Demand</TableCell>
              <TableCell>Demand Modifier</TableCell>
              <TableCell>Speciality</TableCell>
              <TableCell>Total Price Modifier</TableCell>
              <TableCell size="small">Units</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => {
              const demand = demandLevels[item.demand] || demandLevels[defaultDemandLevelIndex]
              return (
              <TableRow key={item.tradeGood.title}>
                  <TableCell component="th" scope="row">
                    {item.tradeGood.title}
                  </TableCell>
                  <TableCell>{displayPrice(item.tradeGood.price)}</TableCell>
                  <TableCell>
                    <Select value={item.demand} onChange={e => updateDemand(e, index)}>
                      {demandLevels.map((demandLevel, index) => (
                        <MenuItem key={index} value={index}>{demandLevel.title}</MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{displayModifier(demand.modifier)}</TableCell>
                  <TableCell>{item.isSpeciality ? "Yes" : "No"}</TableCell>
                  <TableCell>{displayModifier(totalModifier(item))}</TableCell>
                  <TableCell><Input size="small" type="number" placeholder="Units" value={item.units} onChange={e => updateUnits(e, index)} /></TableCell>
                  <TableCell>{displayPrice(totalPrice(item))}</TableCell>
                </TableRow>
              )}
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TradeGoodsTable