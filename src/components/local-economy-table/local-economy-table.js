import React from 'react'
import { Table, TableHead, TableCell, TableBody, TableRow, TableContainer, Button, makeStyles, Select, MenuItem } from '@material-ui/core'
import { formatPrice, formatModifier } from '../../utils'
import { formatEconomy } from '../../utils/formatters/format-economy'

const useStyles = makeStyles((theme) => ({
  buttons: {
    padding: theme.spacing(1),
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  primaryButton: {
    marginRight: "auto"
  },
  button: {
    paddingLeft: theme.spacing(1),
  }
}))

const LocalEconomyTable = (props) => {
  const localEconomy = props.localEconomy || []
  const demandLevels = props.demandLevels || []
  const onChange = props.onChange || (() => { })
  const classes = useStyles()

  const copyEconomy = (format) => {
    const result = formatEconomy(localEconomy, format)
    navigator.clipboard.writeText(result)
  }

  const updateDemandLevel = (itemIndex, demandLevel) => {
    const updatedLocalEconomy = [...localEconomy]
    updatedLocalEconomy[itemIndex].demandLevel = demandLevel
    onChange(updatedLocalEconomy)
  }

  const rollDice = (sides) => {
    const random = Math.random()
    return 1 + Math.floor(random * sides)
  }

  const rollEconomy = () => {
    const randomEconomy = [...localEconomy]
    randomEconomy.forEach((item) => {
      const demandRoll = rollDice(20)
      item.demandLevel = demandLevels.find((demandLevel) => demandRoll <= demandLevel.maxRoll)
    })
    const hasSpeciality = rollDice(2) > 1
    if (hasSpeciality) {
      randomEconomy[rollDice(randomEconomy.length)].isSpeciality = true
    }
    onChange(randomEconomy)
  }

  return (
    <div>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Trade Good</TableCell>
              <TableCell>Base Price</TableCell>
              <TableCell>Demand</TableCell>
              <TableCell>Demand Modifier</TableCell>
              <TableCell>Speciality</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localEconomy.map(((item, itemIndex) => (
              <TableRow hover key={itemIndex}>
                <TableCell>{item.tradeGood.title}</TableCell>
                <TableCell>{formatPrice(item.tradeGood.price)}</TableCell>
                <TableCell>
                  <Select
                    fullWidth
                    disableUnderline
                    value={item.demandLevel}
                    onChange={e => updateDemandLevel(itemIndex, e.target.value)}
                  >
                    {demandLevels.map(demandLevel => (
                      <MenuItem key={demandLevel.title} value={demandLevel}>{demandLevel.title}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>{formatModifier(item.demandLevel.modifier)}</TableCell>
                <TableCell>{item.isSpeciality ? "Yes" : "No"}</TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Button className={classes.primaryButton} color="primary" onClick={() => rollEconomy()}>Roll Economy</Button>
        <Button className={classes.button} onClick={() => copyEconomy("markdown")}>Copy Markdown</Button>
        <Button className={classes.button} onClick={() => copyEconomy("bbcode")}>Copy BBCode</Button>
      </div>
    </div>
  )

}

export default LocalEconomyTable