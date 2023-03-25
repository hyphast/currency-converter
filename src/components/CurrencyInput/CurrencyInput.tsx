import { MouseEvent, useState } from 'react'
import { NumberFormatValues, NumericFormat } from 'react-number-format'
import { ReactComponent as ExpandIcon } from '../../assets/expand.svg'
import RUB from '../../assets/rub.png'
import USD from '../../assets/usd.png'
import EUR from '../../assets/eur.png'
import { Dropdown } from '../Dropdown'

import styles from './CurrencyInput.module.scss'

function isAllowed(values: NumberFormatValues) {
  const MAX_LIMIT = 999_999_999

  const { floatValue } = values

  if (!floatValue) return true

  return floatValue < MAX_LIMIT
}

type CurrencyInputProps = {
  title: string
  last?: boolean
}

export function CurrencyInput({ title, last = false }: CurrencyInputProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const onCurrencyClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsDropdownVisible((prev) => !prev)
  }

  return (
    <div className={styles.currencyInput}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.currencyContainer} data-last={last ? 'last' : ''}>
        <div className={styles.currencySelection}>
          <img src={USD} className={styles.flag} />
          <button className={styles.changeCurrency} onClick={onCurrencyClick}>
            USD
            <ExpandIcon className={styles.expandIcon} />
          </button>
          {isDropdownVisible && (
            <Dropdown setIsDropdownVisible={setIsDropdownVisible} last={last} />
          )}
        </div>
        <NumericFormat
          className={styles.input}
          // value={inputValue}
          // onValueChange={onInputValueChange}
          // onBlur={onBlurInput}
          // onKeyDown={onPressEnter}
          allowNegative={false}
          decimalScale={2}
          decimalSeparator=","
          thousandSeparator=" "
          isAllowed={isAllowed}
        />
      </div>
    </div>
  )
}
CurrencyInput.defaultProps = {
  last: false,
}
