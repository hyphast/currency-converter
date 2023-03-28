import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { CurrencyConverter, ExchangeRatesContainer, Layout } from './components'
import './App.scss'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="converter" element={<CurrencyConverter />} />
              <Route path="rate" element={<ExchangeRatesContainer />} />
              <Route path="*" element={<CurrencyConverter />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
