const FormatModifier = (modifier) => {
  const percentage = Math.floor(modifier * 100)
  if (percentage >= 0) {
    return `+${percentage}%`
  } else {
    return `${percentage}%`
  }
}

export default FormatModifier