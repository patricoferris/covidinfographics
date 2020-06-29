type localisation = (
  local: Record<string, unknown>,
  english: Record<string, unknown>,
  item: string
) => unknown

const localised: localisation = (local, english, item) => {
  if (local) return local[item]
  return english[item]
}

export default localised
