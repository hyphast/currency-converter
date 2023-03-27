import { atom } from 'recoil'
import { CurrencyItem } from '../types'

export const toMoneyState = atom<CurrencyItem>({
  key: 'toMoneyState',
  default: {
    currency: 'USD',
    amount: null,
  },
})
