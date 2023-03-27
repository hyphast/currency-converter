import cn from 'classnames'
import { useRef } from 'react'
import { NumericFormat } from 'react-number-format'
import { SetterOrUpdater } from 'recoil'
import { FetchParams } from '../../API/API'
import { ReactComponent as ExpandIcon } from '../../assets/expand.svg'
import { useCurrency, useDropdown } from '../../hooks'
import { Currency, CurrencyItem, currencyList } from '../../store/types'
import { Dropdown } from '../Dropdown'
import { InputLoader } from '../Loaders'
import { useCurrencyInput } from './useCurrencyInput'
import { isAllowed } from './CurrencyInput.service'

import styles from './CurrencyInput.module.scss'

export interface APIParams extends FetchParams {
  keys: (number | Currency | null)[]
}
export type CurrencyInputProps = {
  title: string
  last?: boolean
  APIParams: APIParams
  moneyState: [CurrencyItem, SetterOrUpdater<CurrencyItem>]
}

export function CurrencyInput({
  title,
  APIParams,
  moneyState,
  last = false,
}: CurrencyInputProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownVisible, { closeDropdown, toggleDropdown }] =
    useDropdown(dropdownRef)
  const currencyItem = useCurrency(moneyState[0].currency)
  const input = useCurrencyInput({ APIParams, moneyState })

  const [money, setMoney] = moneyState
  const { isLoading, isFetching, isError, data } = input.data

  const onToggleClick = () => {
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
    <div className={styles.currencyInput}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.currencyContainer} data-last={last ? 'last' : ''}>
        <div className={styles.currencySelection}>
          <img src={currencyItem.icon} className={styles.flag} />
          <div ref={dropdownRef}>
            <button className={styles.changeCurrency} onClick={onToggleClick}>
              {currencyItem.name}
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
            onValueChange={input.handleInput}
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
CurrencyInput.defaultProps = {
  last: false,
}
