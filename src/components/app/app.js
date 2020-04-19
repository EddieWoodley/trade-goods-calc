import React from 'react'
import { TradeGoodsTable } from '../trade_goods_table'
import { TradeGoods, DemandLevels } from '../../model'
import { makeStyles, Container, CssBaseline } from '@material-ui/core'

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
        <TradeGoodsTable tradeGoods={TradeGoods} demandLevels={DemandLevels} />
      </Container>
    </div>
  )
}

export default App
