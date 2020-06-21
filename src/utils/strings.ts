export const capitaliseFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const removeUnderscores = (str: string, join: string): string => {
  return str.split('_').reduce((a, b) => a + join + b)
}
