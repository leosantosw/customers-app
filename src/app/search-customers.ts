'use server'

import { api } from '@/src/lib'

interface SearchCustomersParams {
  name?: string
  telephone?: string
  email?: string
}

export async function searchCustomers({
  name,
  telephone,
  email,
}: SearchCustomersParams) {
  try {
    const searchParams = buildUrlParams({ name, telephone, email })

    const { data: customers = null, status } = await api.get(
      `/customers?${searchParams}`
    )

    return { customers, status }
  } catch (error) {
    console.log(error)
    return { customers: null, status: 500 }
  }
}

function buildUrlParams(params: SearchCustomersParams) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value.toString())
    }
  })

  return searchParams.toString()
}
