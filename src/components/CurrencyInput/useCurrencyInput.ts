import { NumberFormatValues } from 'react-number-format'
import { useQuery, UseQueryResult } from 'react-query'
import { fetchConvertedCurrency } from '../../API/API'
import { debounce } from '../../utils'
import { CurInputContainerProps } from './CurrencyInputContainer'

export type UseCurrencyInputReturn = {
  handleInput: (values: NumberFormatValues) => void
  queryData: UseQueryResult<any, unknown>
}
type UseCurrencyInputArgs = Pick<
  CurInputContainerProps,
  'APIParams' | 'moneyState'
>
export const useCurrencyInput = ({
  APIParams,
  moneyState,
}: UseCurrencyInputArgs): UseCurrencyInputReturn => {
  const [money, setMoney] = moneyState
  const { keys, ...restParams } = APIParams

  const queryData = useQuery(keys, () => fetchConvertedCurrency(restParams), {
    refetchOnWindowFocus: false,
    enabled: !!APIParams.amount,
    initialData: { result: money.amount },
    // staleTime: 60000,
    cacheTime: 600000,
    // initialDataUpdatedAt: Date.now() - 60000,
  })

  const debounceInput = debounce(
    (val: number) => setMoney((prev) => ({ ...prev, amount: val })),
    250
  )

  const handleInput = (values: NumberFormatValues) => {
    const { floatValue } = values

    if (!floatValue) return

    debounceInput(floatValue)
  }

  return { queryData, handleInput }
}
