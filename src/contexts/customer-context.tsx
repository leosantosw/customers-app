'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface CustumerProps {
  id?: string
  name: string
  email: string
  telephone: string
  coordinate_x: number | string
  coordinate_y: number | string
  distance?: number | string
}

interface CustomerContextType {
  customers: CustumerProps[]
  handleSetCustomers: (customers: CustumerProps[]) => void
}

const CustomerContext = createContext({} as CustomerContextType)

export default function CustomerProvider({
  children,
}: {
  children: ReactNode
}) {
  const [customers, setCustomers] = useState<CustumerProps[]>([])

  function handleSetCustomers(customers: CustumerProps[]) {
    setCustomers(customers)
  }

  return (
    <CustomerContext.Provider value={{ handleSetCustomers, customers }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomers = () => useContext(CustomerContext)
