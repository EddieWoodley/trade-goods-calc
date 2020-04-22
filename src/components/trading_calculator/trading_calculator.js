import React, { useState } from 'react'
import { TradeGoods, DemandLevels } from '../../data'
import { Paper, Tabs, Tab, Typography, makeStyles } from '@material-ui/core'
import { LocalEconomyTable } from '../local_economy_table'

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
        onChange={(e, localEconomy) => setLocalEconomy(localEconomy)}
      />
      break;
    case 1:
      content = <Typography>Buy</Typography>
      break;
    case 2:
      content = <Typography>Sell</Typography>
      break;
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