import { formatPrice } from "../"

const formatEconomyMarkdown = (economy) => {
  let result = ""
    result += "| Trade Good | Base Price | Demand | Is Speciality |\n"
    result += "|:---|:---:|:---:|:---:|\n"
    economy.forEach(item => {
      result += "| "
      result += `${item.tradeGood.title} | `
      result += `${formatPrice(item.tradeGood.price)} | `
      result += `${(item.demandLevel.title)} | `
      result += `${(item.isSpeciality ? "Yes" : "No")}|\n`
    });
    return result
}

const formatEconomyBBCode = (economy) => {
  let result = "[table]\n"
    result += "[tr]"
    result += "[th]Trade Good[/th]"
    result += "[th]Base Price[/th]"
    result += "[th]Demand[/th]"
    result += "[th]Is Speciality[/th]"
    result += "[/tr]\n"
    economy.forEach(item => {
      result += "[tr]"
      result += `[td]${item.tradeGood.title}[/td]`
      result += `[td]${formatPrice(item.tradeGood.price)}[/td]`
      result += `[td]${(item.demandLevel.title)}[/td]`
      result += `[td]${(item.isSpeciality ? "Yes" : "No")}[/td]`
      result += "[/tr]\n"
    });
    result += "[/table]"
    return result
}

const formatEconomy = (economy, format) => {
  switch (format) {
    case "markdown":
      return formatEconomyMarkdown(economy)
    case "bbcode":
      return formatEconomyBBCode(economy)
    default:
      break;
  }
}

export default formatEconomy