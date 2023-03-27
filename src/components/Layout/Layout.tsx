import cn from 'classnames'
import { Outlet, NavLink } from 'react-router-dom'
import { ReactComponent as LogoIcon } from '../../assets/logo.svg'

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
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? cn(styles.active, styles.menuItem)
                    : styles.menuItem
                }
                to="/converter"
              >
                Converter
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? cn(styles.active, styles.menuItem)
                    : styles.menuItem
                }
                to="/rate"
              >
                Exchange Rates
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
