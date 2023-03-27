import { NumberFormatValues } from 'react-number-format'

export function isAllowed(values: NumberFormatValues) {
  const MAX_LIMIT = 999_999_999_999

  const { floatValue } = values

  if (!floatValue) return true

  return floatValue < MAX_LIMIT
}
