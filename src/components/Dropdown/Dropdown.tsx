import cn from 'classnames'
import { Currency } from '../../store/types'

import styles from './Dropdown.module.scss'

type DropdownProps<T> = {
  list: Array<{
    name: T
    icon: string
  }>
  cb: (arg: T) => void
  selected: T
  className?: string
}

export function Dropdown<T extends Currency = Currency>({
  className,
  selected,
  list,
  cb,
}: DropdownProps<T>) {
  const onItemClick = (value: T) => {
    cb(value)
  }

  return (
    <div className={cn(className, styles.dropdown)}>
      <ul className={styles.dropdownList}>
        {list.map((item) => (
          <li
            key={item.name}
            className={cn(
              { [styles.active]: item.name === selected },
              styles.item
            )}
            onClick={() => onItemClick(item.name)}
            onKeyDown={() => onItemClick(item.name)}
          >
            <button className={styles.itemBtn}>
              <>
                <img className={styles.itemIcon} src={item.icon} />
                {item.name}
              </>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
Dropdown.defaultProps = {
  className: '',
}
