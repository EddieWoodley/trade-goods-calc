import React from 'react'
import { TradeGoodsTable } from '../trade_goods_table'
import { TradeGoods, DemandLevels } from '../../data'
import { makeStyles, Container, CssBaseline } from '@material-ui/core'
import { TradingCalculator } from '../trading_calculator';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

const App = () => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.toolbar} />
      <Container>
        <TradingCalculator />
      </Container>
    </div>
  )
}

export default App
