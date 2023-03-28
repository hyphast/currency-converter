import { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { useCurrency, useDropdown } from '../../hooks'
import { baseCurrencyState } from '../../store/atoms/baseСurrencyState'
import { Currency } from '../../store/types'
import { ExchangeRates } from './ExchangeRates'
import { useExchangeRates } from './useExchangeRates'

export function ExchangeRatesContainer() {
  const [baseCurrency, setBaseCurrency] = useRecoilState(baseCurrencyState)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownVisible, { closeDropdown, toggleDropdown }] =
    useDropdown(dropdownRef)
  const rates = useExchangeRates(baseCurrency)
  const currencyItem = useCurrency(baseCurrency)

  const onBaseCurrencyClick = () => {
    toggleDropdown()
  }

  const onChooseCurrency = (cur: Currency) => {
    setBaseCurrency(cur)
    closeDropdown()
  }

  if (!currencyItem) {
    return <span>Some error</span>
  }

  return (
    <ExchangeRates
      onBaseCurrencyClick={onBaseCurrencyClick}
      currencyItem={currencyItem}
      isDropdownVisible={isDropdownVisible}
      onChooseCurrency={onChooseCurrency}
      baseCurrency={baseCurrency}
      rates={rates}
    />
  )
}
