import React, { useState } from 'react'
import { TradeGoods, DemandLevels } from '../../data'
import { Paper, Tabs, Tab, Typography, makeStyles } from '@material-ui/core'
import { LocalEconomyTable } from '../'
import { BuyCalculator } from '../buy-calculator'
import { SellCalculator } from '../sell-calculator'

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginBottom: theme.spacing(1)
  }
}))

const TradingCalculator = () => {

  const defaultDemandLevel = DemandLevels[Math.floor(DemandLevels.length / 2)]
  const [activeTab, setActiveTab] = useState(0)
  const [localEconomy, setLocalEconomy] = useState(TradeGoods.map(tradeGood => ({
    tradeGood: tradeGood,
    demandLevel: defaultDemandLevel,
    isSpeciality: false
  })))

  const classes = useStyles()

  let content = null
  switch (activeTab) {
    case 0:
      content = <LocalEconomyTable
        localEconomy={localEconomy}
        demandLevels={DemandLevels}
        onChange={(localEconomy) => setLocalEconomy(localEconomy)}
      />
      break;
    case 1:
      content = <BuyCalculator localEconomy={localEconomy} />
      break;
    case 2:
      content = <SellCalculator localEconomy={localEconomy} />
      break;
    default:
      content = <Typography>Select a Tab</Typography>
  }

  return (
    <Paper>
      <Tabs
        className={classes.tabs}
        indicatorColor="primary"
        value={activeTab}
        onChange={(e, value) => setActiveTab(value)}
      >
        <Tab label="Local Economy" value={0} />
        <Tab label="Buy Calculator" value={1} />
        <Tab label="Sell Calculator" value={2} />
      </Tabs>
      {content}
    </Paper>
  )
}

export default TradingCalculator