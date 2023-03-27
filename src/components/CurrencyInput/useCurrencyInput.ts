import { NumberFormatValues } from 'react-number-format'
import { useQuery } from 'react-query'
import { fetchConvertedCurrency } from '../../API/API'
import { debounce } from '../../utils'
import { CurrencyInputProps } from './CurrencyInput'

type UseCurrencyInputReturn = {
  handleInput: (values: NumberFormatValues) => void
  data: any
}
type UseCurrencyInputArgs = Pick<CurrencyInputProps, 'APIParams' | 'moneyState'>
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
  })

  const debounceInput = debounce(
    (val: number) => setMoney((prev) => ({ ...prev, amount: val })),
    250
  )

  const onInputValueChange = (values: NumberFormatValues) => {
    const { floatValue } = values

    if (!floatValue) return

    debounceInput(floatValue)
  }

  return { data: queryData, handleInput: onInputValueChange }
}
