import EUR from '../assets/eur.png'
import RUB from '../assets/rub.png'
import USD from '../assets/usd.png'

export type Currency = 'USD' | 'EUR' | 'RUB'

type CurrencyListItem = {
  name: Currency
  icon: string
}

export const currencyList: CurrencyListItem[] = [
  { name: 'RUB', icon: RUB },
  { name: 'USD', icon: USD },
  { name: 'EUR', icon: EUR },
]

export type CurrencyItem = {
  currency: Currency
  amount: number | null
}
