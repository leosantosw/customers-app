import Link from 'next/link'
import NavSection from './nav-seaction'
import { CustomerTable } from '@/src/components/customer-table'
import { CalculateRouterModal } from '@/src/components/calculare-router-modal'
import { CustomerFilters } from '../components/customer-filters'
import { searchCustomers } from './search-customers'

export default async function Dashboad() {
  const { customers } = await searchCustomers({})

  return (
    <div>
      <header className="relative flex justify-between bg-gray-1000 items-center py-4 px-8 md:px-16">
        <h1 className="text-blue-100 font-bold text-xl font-primary">
          Controle Residencial de Limpeza
        </h1>
        <div className="ml-auto">
          <Link href="/customer">
            <button className=" text-white font-bold py-2 px-4 rounded-md h-10 bg-gray-900">
              Novo cliente
            </button>
          </Link>
        </div>
        <NavSection fullName={'John Doe'} />
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
      </header>

      <main className="p-5 md:px-16 h-screen">
        <div className="flex justify-between mb-5">
          <h2 className="mt-auto text-base align-text-bottom font-bold text-gray-800 pb-3 font-primary">
            {customers.length > 0
              ? 'Listagem de clientes'
              : 'Nenhum cliente cadastrado ainda.'}
          </h2>
          <CustomerFilters />
        </div>

        {customers.length > 0 && (
          <div>
            <div className="grid gap-4">
              <CustomerTable customersData={customers} />
            </div>
          </div>
        )}

        {customers.length > 0 && (
          <div className="flex justify-end mt-2">
            <CalculateRouterModal />
          </div>
        )}
      </main>
    </div>
  )
}
