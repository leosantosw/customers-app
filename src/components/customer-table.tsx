'use client'

import { useCustomers } from '../contexts/customer-context'
import { TableItem } from './tableItem'

interface CustumerProps {
  id?: string
  name: string
  email: string
  telephone: string
  coordinate_x: number | string
  coordinate_y: number | string
  distance?: number | string
}

interface TableProps {
  customersData: CustumerProps[]
}

export const CustomerTable = ({ customersData }: TableProps) => {
  const { handleSetCustomers, customers } = useCustomers()

  if (customers?.length === 0) {
    handleSetCustomers(customersData)
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-white">
        <thead className="text-xs uppercas bg-gray-1000">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Telefone
            </th>
            <th scope="col" className="px-6 py-3">
              Coordenada X
            </th>
            <th scope="col" className="px-6 py-3">
              Coordenada Y
            </th>
            {((customers && customers[0]) || {})?.distance && (
              <th scope="col" className="px-6 py-3">
                Distância
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <TableItem
              key={customer.id}
              name={customer.name}
              email={customer.email}
              telephone={customer.telephone}
              coordinate_x={customer.coordinate_x}
              coordinate_y={customer.coordinate_y}
              distance={customer?.distance}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
