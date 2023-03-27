import { useQuery } from 'react-query'
import { fetchConvertedCurrency } from '../../API/API'
import { Currency, currencyList } from '../../store/types'

type UseExchangeRatesReturn = Array<{
  from: Currency
  result: any
}>
export const useExchangeRates = (
  currency: Currency
): UseExchangeRatesReturn => {
  const otherSymbols = currencyList
    .filter((item) => item.name !== currency)
    .map((cur) => cur.name)

  const firstData = useQuery(
    [otherSymbols[0], currency, 1],
    () =>
      fetchConvertedCurrency({
        from: otherSymbols[0],
        to: currency,
        amount: 1,
      }),
    {
      refetchOnWindowFocus: false,
    }
  )
  const secondData = useQuery(
    [otherSymbols[1], currency, 1],
    () =>
      fetchConvertedCurrency({
        from: otherSymbols[1],
        to: currency,
        amount: 1,
      }),
    {
      refetchOnWindowFocus: false,
    }
  )

  const rates = [
    {
      from: otherSymbols[0],
      result: firstData.data,
    },
    {
      from: otherSymbols[1],
      result: secondData.data,
    },
  ]

  return rates
}
