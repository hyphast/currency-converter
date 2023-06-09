import { Currency } from '../types'
import { atom } from 'recoil'

export const baseCurrencyState = atom<Currency>({
  key: 'baseCurrencyState',
  default: 'USD',
})
