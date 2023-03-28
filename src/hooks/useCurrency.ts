import { currencyList } from '../store/types'
import { Currency } from './../store/types'

export type useCurrencyReturn = {
  name: Currency
  icon: string
}
export const useCurrency = (cur: Currency): useCurrencyReturn | undefined => {
  const currency = currencyList.find((item) => item.name === cur)

  if (!currency) return undefined

  return { name: currency.name, icon: currency.icon }
}
