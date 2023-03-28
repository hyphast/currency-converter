import { useRef } from 'react'
import { SetterOrUpdater } from 'recoil'
import { FetchParams } from '../../API/API'
import { useCurrency, useDropdown } from '../../hooks'
import { CurrencyItem } from '../../store/types'
import { Currency } from '../../store/types'
import { CurrencyInput } from './CurrencyInput'
import { useCurrencyInput } from './useCurrencyInput'

export interface APIParams extends FetchParams {
  keys: (number | Currency | null)[]
}
export type CurInputContainerProps = {
  title: string
  APIParams: APIParams
  moneyState: [CurrencyItem, SetterOrUpdater<CurrencyItem>]
  last?: boolean
}

export function CurrencyInputContainer({
  title,
  APIParams,
  moneyState,
  last = false,
}: CurInputContainerProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownVisible, { closeDropdown, toggleDropdown }] =
    useDropdown(dropdownRef)
  const currencyItem = useCurrency(moneyState[0].currency)
  const { queryData, handleInput } = useCurrencyInput({ APIParams, moneyState })

  const [money, setMoney] = moneyState

  const onToggleCurrency = () => {
    toggleDropdown()
  }

  const onChooseCurrency = (currency: Currency) => {
    setMoney((prev) => ({ ...prev, currency }))
    closeDropdown()
  }

  if (!currencyItem) {
    return <span>Error</span>
  }

  return (
    <CurrencyInput
      title={title}
      currencyItem={currencyItem}
      onToggleCurrency={onToggleCurrency}
      onChooseCurrency={onChooseCurrency}
      isDropdownVisible={isDropdownVisible}
      queryData={queryData}
      handleInput={handleInput}
      money={money}
      last={last}
    />
  )
}
CurrencyInputContainer.defaultProps = {
  last: false,
}
