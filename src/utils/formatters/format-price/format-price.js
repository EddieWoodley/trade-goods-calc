const FormatPrice = (price) => {
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

export default FormatPrice