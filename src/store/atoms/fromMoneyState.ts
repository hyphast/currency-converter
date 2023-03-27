import { atom } from 'recoil'
import { CurrencyItem } from '../types'

export const fromMoneyState = atom<CurrencyItem>({
  key: 'fromMoneyState',
  default: {
    currency: 'RUB',
    amount: 100,
  },
})
