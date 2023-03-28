import cn from 'classnames'
import React from 'react'
import { NumericFormat } from 'react-number-format'
import { ReactComponent as ExpandIcon } from '../../assets/expand.svg'
import { useCurrencyReturn } from '../../hooks'
import { Currency, CurrencyItem, currencyList } from '../../store/types'
import { Dropdown } from '../Dropdown'
import { InputLoader } from '../Loaders'
import { isAllowed } from './CurrencyInput.service'
import { UseCurrencyInputReturn } from './useCurrencyInput'

import styles from './CurrencyInput.module.scss'

export type CurrencyInputProps = {
  title: string
  currencyItem: useCurrencyReturn
  onToggleCurrency: () => void
  onChooseCurrency: (currency: Currency) => void
  isDropdownVisible: boolean
  queryData: UseCurrencyInputReturn['queryData']
  handleInput: UseCurrencyInputReturn['handleInput']
  money: CurrencyItem
  last?: boolean
}

export const CurrencyInput = React.forwardRef<
  HTMLDivElement,
  CurrencyInputProps
>(
  (
    {
      title,
      currencyItem,
      onToggleCurrency,
      onChooseCurrency,
      isDropdownVisible,
      queryData,
      handleInput,
      money,
      last = false,
    },
    ref
  ) => {
    const { name, icon } = currencyItem

    const { isLoading, isFetching, isError, data } = queryData

    return (
      <div className={styles.currencyInput}>
        <h3 className={styles.title}>{title}</h3>
        <div
          className={styles.currencyContainer}
          data-last={last ? 'last' : ''}
        >
          <div className={styles.currencySelection}>
            <img src={icon} className={styles.flag} />
            <div ref={ref}>
              <button
                className={styles.changeCurrency}
                onClick={onToggleCurrency}
              >
                {name}
                <ExpandIcon className={styles.expandIcon} />
              </button>
              {isDropdownVisible && (
                <Dropdown
                  list={currencyList}
                  cb={onChooseCurrency}
                  selected={money.currency}
                  className={cn({ [styles.lastDropdown]: last })}
                />
              )}
            </div>
          </div>
          {!isLoading && !isFetching && !isError ? (
            <NumericFormat
              className={styles.input}
              value={data.result}
              onValueChange={handleInput}
              allowNegative={false}
              decimalScale={2}
              decimalSeparator=","
              thousandSeparator=" "
              isAllowed={isAllowed}
            />
          ) : (
            <InputLoader className={styles.loader} />
          )}
        </div>
      </div>
    )
  }
)
CurrencyInput.defaultProps = {
  last: false,
}
