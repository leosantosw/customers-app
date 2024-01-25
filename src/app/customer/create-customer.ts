'use server'

import { api } from '@/src/lib'
import { revalidatePath } from 'next/cache'

interface ICustomer {
  name: string
  email: string
  telephone: string
  coordinateX: number | string
  coordinateY: number | string
}

export async function handleCreateCustomer({
  name,
  email,
  telephone,
  coordinateX,
  coordinateY,
}: ICustomer) {
  try {
    const customer = await api.post('/customers', {
      name,
      email,
      telephone,
      coordinate_x: coordinateX,
      coordinate_y: coordinateY,
    })

    if (customer.status !== 200) {
      return false
    }

    revalidatePath('/')
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
