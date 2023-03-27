import { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { ReactComponent as ExpandIcon } from '../../assets/expand.svg'
import { baseCurrencyState } from '../../store/atoms/baseСurrencyState'
import { Currency, currencyList } from '../../store/types'
import { useCurrency, useDropdown } from '../../hooks'
import { useExchangeRates } from './useExchangeRates'
import { RateLoader } from '../Loaders'
import { Dropdown } from '../Dropdown'

import styles from './ExchangeRates.module.scss'

export function ExchangeRates() {
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
    <div className={styles.exchangeRates}>
      <div className={styles.dropdownContainer} ref={dropdownRef}>
        <button className={styles.changeCurrency} onClick={onBaseCurrencyClick}>
          Основная валюта
          <ExpandIcon className={styles.expand} />
          <div className={styles.chosenCurrency}>
            <img
              className={styles.flag}
              src={currencyItem.icon}
              alt="currency"
            />
            <span>{currencyItem.name}</span>
          </div>
        </button>
        {isDropdownVisible && (
          <Dropdown
            list={currencyList}
            cb={onChooseCurrency}
            selected={baseCurrency}
            className={styles.dropdown}
          />
        )}
      </div>
      <div className={styles.rates}>
        {rates.map((item) => {
          const { result } = item

          return (
            <div key={item.from} className={styles.rate}>
              <span className={styles.currency}>1 {item.from}</span>
              <span className={styles.equal}>=</span>
              {result &&
              !result.isLoading &&
              !result.isFetching &&
              !result.isError ? (
                <span className={styles.value}>
                  {`${result.result} ${baseCurrency}`}
                </span>
              ) : (
                <RateLoader className={styles.loader} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
