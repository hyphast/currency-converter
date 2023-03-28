import { useRecoilState, useRecoilValue } from 'recoil'
import { fromMoneyState, toMoneyState } from '../../store/atoms'
import { fromParamsSelector, toParamsSelector } from '../../store/selectors'
import { ReactComponent as ExchangeIcon } from '../../assets/exchange.svg'
import { CurrencyInputContainer } from '../CurrencyInput/CurrencyInputContainer'

import styles from './CurrencyConverter.module.scss'

export function CurrencyConverter() {
  const toMoney = useRecoilState(toMoneyState)
  const fromMoney = useRecoilState(fromMoneyState)
  const toAPIParams = useRecoilValue(toParamsSelector)
  const fromAPIParams = useRecoilValue(fromParamsSelector)

  return (
    <div className={styles.currencyConverter}>
      <CurrencyInputContainer
        title="Amount"
        moneyState={fromMoney}
        APIParams={fromAPIParams}
      />
      <div className={styles.exchange}>
        <hr className={styles.delimiter} />
        <button className={styles.exchangeBtn}>
          <ExchangeIcon className={styles.exchangeIcon} />
        </button>
      </div>
      <CurrencyInputContainer
        title="Converted Amount"
        moneyState={toMoney}
        APIParams={toAPIParams}
        last
      />
    </div>
  )
}
