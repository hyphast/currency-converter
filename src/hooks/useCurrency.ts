import { currencyList } from '../store/types'
import { Currency } from './../store/types'

type useCurrencyReturn =
  | {
      name: Currency
      icon: string
    }
  | undefined
export const useCurrency = (cur: Currency): useCurrencyReturn => {
  const currency = currencyList.find((item) => item.name === cur)

  if (!currency) return undefined

  return { name: currency.name, icon: currency.icon }
}
