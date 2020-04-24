const formatWeight = (weight) => {
  const lb = Math.floor(weight / 16)
  const oz = weight % 16
  let result = ""
  if (lb > 0) {
    result += `${lb}lb`
  }
  if (oz > 0) {
    result += ` ${oz}oz`
    result += ` (~${(weight/16).toFixed(2)}lb)`
  }
  return result.trim()
}

export default formatWeight