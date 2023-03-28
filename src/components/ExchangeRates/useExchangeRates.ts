import { useQuery, UseQueryResult } from 'react-query'
import { fetchConvertedCurrency } from '../../API/API'
import { Currency, currencyList } from '../../store/types'

export type UseExchangeRatesReturn = Array<{
  fromCurrency: Currency
  queryData: UseQueryResult<any, unknown>
}>
export const useExchangeRates = (
  currency: Currency
): UseExchangeRatesReturn => {
  const otherSymbols = currencyList
    .filter((item) => item.name !== currency)
    .map((cur) => cur.name)

  const firstQuery = useQuery(
    [otherSymbols[0], currency, 1],
    () =>
      fetchConvertedCurrency({
        from: otherSymbols[0],
        to: currency,
        amount: 1,
      }),
    {
      refetchOnWindowFocus: false,
      cacheTime: 600000,
      staleTime: 60000,
    }
  )
  const secondQuery = useQuery(
    [otherSymbols[1], currency, 1],
    () =>
      fetchConvertedCurrency({
        from: otherSymbols[1],
        to: currency,
        amount: 1,
      }),
    {
      refetchOnWindowFocus: false,
      cacheTime: 600000,
      staleTime: 60000,
    }
  )

  const rates = [
    {
      fromCurrency: otherSymbols[0],
      queryData: firstQuery,
    },
    {
      fromCurrency: otherSymbols[1],
      queryData: secondQuery,
    },
  ]

  return rates
}
