import { CurrencyInput } from '../CurrencyInput'
import { ReactComponent as ExchangeIcon } from '../../assets/exchange.svg'

import styles from './CurrencyConverter.module.scss'

type CurrencyConverterProps = {}

export function CurrencyConverter({}: CurrencyConverterProps) {
  return (
    <div className={styles.currencyConverter}>
      <CurrencyInput title="Amount" />
      <div className={styles.exchange}>
        <hr className={styles.delimiter} />
        <button className={styles.exchangeBtn}>
          <ExchangeIcon className={styles.exchangeIcon} />
        </button>
      </div>
      <CurrencyInput title="Converted Amount" last />
    </div>
  )
}
