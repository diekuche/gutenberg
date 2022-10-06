import { coins } from '@cosmjs/stargate'

export const getExecuteFee = () => {
  return {
    amount: coins(500000, 'boot'),
    gas: '1000000',
  }
}
