import React, { useRef, useState } from 'react'
import cn from 'classnames'
import { useClickOutside } from '../../hooks/useClickOutside'
import RUB from '../../assets/rub.png'
import USD from '../../assets/usd.png'
import EUR from '../../assets/eur.png'

import styles from './Dropdown.module.scss'

type Currency = 'USD' | 'EUR' | 'RUB'
type CurrencyListItem = {
  name: Currency
  icon: string
}
const currencyList: CurrencyListItem[] = [
  { name: 'RUB', icon: RUB },
  { name: 'USD', icon: USD },
  { name: 'EUR', icon: EUR },
]

type DropdownProps = {
  setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>
  last?: boolean
}

export function Dropdown({ last, setIsDropdownVisible }: DropdownProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('RUB')
  const dropdownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropdownRef, () => setIsDropdownVisible(false))

  const onCurrencyClick = (currency: Currency) => {
    setSelectedCurrency(currency)
  }

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      data-last={last ? 'last' : ''}
    >
      <ul className={styles.dropdownList}>
        {currencyList.map((cur) => (
          <li
            key={cur.name}
            className={cn(
              { [styles.active]: cur.name === selectedCurrency },
              styles.item
            )}
            onClick={() => onCurrencyClick(cur.name)}
            onKeyDown={() => onCurrencyClick(cur.name)}
          >
            <button className={styles.itemBtn}>
              <>
                <img className={styles.itemIcon} src={cur.icon} />
                {cur.name}
              </>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
Dropdown.defaultProps = {
  last: false,
}
