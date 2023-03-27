import axios from 'axios'
import { Currency } from './../store/types'

export interface FetchParams {
  from: Currency
  to: Currency
  amount: string | number | null
}
export async function fetchConvertedCurrency(fetchParams: FetchParams) {
  if (fetchParams.amount === null) return new Error('some error')

  const params: FetchParams = {
    from: fetchParams.from,
    to: fetchParams.to,
    amount: fetchParams.amount.toString(),
  }

  const queryParams = new URLSearchParams(Object.entries(params))

  const url =
    'https://api.apilayer.com/currency_data/convert?' + queryParams.toString()
  const config = {
    headers: {
      apikey: import.meta.env.VITE_API_KEY,
    },
  }

  return (await axios.get(url, config)).data
}
