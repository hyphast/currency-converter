import React from 'react'
import { ReactComponent as ExpandIcon } from '../../assets/expand.svg'
import { useCurrencyReturn } from '../../hooks'
import { Currency, currencyList } from '../../store/types'
import { Dropdown } from '../Dropdown'
import { RateLoader } from '../Loaders'
import { UseExchangeRatesReturn } from './useExchangeRates'

import styles from './ExchangeRates.module.scss'

type ExchangeRatesProps = {
  onBaseCurrencyClick: () => void
  currencyItem: useCurrencyReturn
  isDropdownVisible: boolean
  onChooseCurrency: (cur: Currency) => void
  baseCurrency: Currency
  rates: UseExchangeRatesReturn
}
export const ExchangeRates = React.forwardRef<
  HTMLDivElement,
  ExchangeRatesProps
>(
  (
    {
      onBaseCurrencyClick,
      currencyItem,
      isDropdownVisible,
      onChooseCurrency,
      baseCurrency,
      rates,
    },
    ref
  ) => {
    return (
      <div className={styles.exchangeRates}>
        <div className={styles.dropdownContainer} ref={ref}>
          <button
            className={styles.changeCurrency}
            onClick={onBaseCurrencyClick}
          >
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
            const { queryData, fromCurrency } = item
            const isFetched =
              queryData && !queryData.isLoading && !queryData.isError

            return (
              <div key={fromCurrency} className={styles.rate}>
                <span className={styles.currency}>1 {fromCurrency}</span>
                <span className={styles.equal}>=</span>
                {isFetched ? (
                  <span className={styles.value}>
                    {`${queryData.data.result} ${baseCurrency}`}
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
)
