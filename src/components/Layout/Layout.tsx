import cn from 'classnames'
import { ReactComponent as LogoIcon } from '../../assets/logo.svg'
import { CurrencyConverter } from '../CurrencyConverter'
import { ExchangeRates } from '../ExchangeRates'

import styles from './Layout.module.scss'

export function Layout() {
  return (
    <div className={cn(styles.layout, 'appContainer')}>
      <header>
        <div className={styles.logoContainer}>
          <LogoIcon className={styles.logo} />
          <h1 className={styles.appName}>Currency converter</h1>
        </div>
        <nav>
          <ul className={styles.navBar}>
            <li>
              <button>Converter</button>
            </li>
            <li>
              <button>Exchange Rates</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <CurrencyConverter />
        {/* <ExchangeRates /> */}
      </main>
    </div>
  )
}
