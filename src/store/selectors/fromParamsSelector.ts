import { selector } from 'recoil'
import { toMoneyState } from '../atoms/toMoneyState'
import { fromMoneyState } from '../atoms/fromMoneyState'

export const fromParamsSelector = selector({
  key: 'fromParamsSelector',
  get: ({ get }) => {
    const from = get(fromMoneyState)
    const to = get(toMoneyState)

    return {
      from: to.currency,
      to: from.currency,
      amount: to.amount,
      keys: [to.amount],
    }
  },
})
