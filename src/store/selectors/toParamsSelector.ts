import { selector } from 'recoil'
import { toMoneyState } from '../atoms/toMoneyState'
import { fromMoneyState } from '../atoms/fromMoneyState'

export const toParamsSelector = selector({
  key: 'toParamsSelector',
  get: ({ get }) => {
    const from = get(fromMoneyState)
    const to = get(toMoneyState)

    return {
      from: from.currency,
      to: to.currency,
      amount: from.amount,
      keys: [from.currency, to.currency, from.amount],
    }
  },
})
