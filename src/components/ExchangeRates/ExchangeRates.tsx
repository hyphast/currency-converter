import React, { MouseEvent, useState } from 'react'
import { ReactComponent as ExpandIcon } from '../../assets/expand.svg'
import { Dropdown } from '../Dropdown'

import styles from './ExchangeRates.module.scss'

type ExchangeRatesProps = {}

export function ExchangeRates({}: ExchangeRatesProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const onMainCurrencyClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsDropdownVisible((prev) => !prev)
  }

  return (
    <div className={styles.exchangeRates}>
      <button onClick={onMainCurrencyClick}>
        Основная валюта
        <ExpandIcon />
      </button>
      {isDropdownVisible && (
        <Dropdown setIsDropdownVisible={setIsDropdownVisible} />
      )}
      <div>1 USD = 77.28 RUB</div>
      <div>1 EUR = 83.30 RUN</div>
    </div>
  )
}
