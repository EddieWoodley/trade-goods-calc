import React from 'react'
import { Table, TableHead, TableCell, TableBody, TableRow, TableContainer, Button, makeStyles } from '@material-ui/core'
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
  const { localEconomy, demandLevels, onChange } = props
  const classes = useStyles()

  const copyEconomy = (format) => {
    const result = formatEconomy(localEconomy, format)
    navigator.clipboard.writeText(result)
  }

  return (
    <div>
      <TableContainer>
        <Table>
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
            {localEconomy.map((item => (
              <TableRow>
                <TableCell>{item.tradeGood.title}</TableCell>
                <TableCell>{formatPrice(item.tradeGood.price)}</TableCell>
                <TableCell>{item.demandLevel.title}</TableCell>
                <TableCell>{formatModifier(item.demandLevel.modifier)}</TableCell>
                <TableCell>{item.isSpeciality ? "Yes" : "No"}</TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.buttons}>
        <Button className={classes.primaryButton} color="primary">Roll Economy</Button>
        <Button className={classes.button} onClick={() => copyEconomy("markdown")}>Copy Markdown</Button>
        <Button className={classes.button} onClick={() => copyEconomy("bbcode")}>Copy BBCode</Button>
      </div>
    </div>
  )

}

export default LocalEconomyTable