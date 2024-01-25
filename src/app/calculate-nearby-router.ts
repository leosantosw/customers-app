'use server'

import { api } from '@/src/lib'

export async function handleCalculateNearbyRouter() {
  try {
    const { data: customers = null, status } =
      await api.get('/customers/nearby')
    return { customers, status: status }
  } catch (error) {
    console.log(error)
    return { customers: null, status: 500 }
  }
}
