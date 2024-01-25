'use client'

import { FormEvent, useState } from 'react'
import { searchCustomers } from '../app/search-customers'
import { useCustomers } from '../contexts/customer-context'

export function CustomerFilters() {
  const [searchByName, setSearchByName] = useState('')
  const [searchByPhone, setSearchByPhone] = useState('')
  const [searchByEmail, setSearchByEmail] = useState('')

  const { handleSetCustomers } = useCustomers()

  async function handleSearchCustomers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { customers } = await searchCustomers({
      name: searchByName,
      telephone: searchByPhone,
      email: searchByEmail,
    })

    handleSetCustomers(customers)
  }

  return (
    <form className="flex space-x-4" onSubmit={handleSearchCustomers}>
      <input
        type="text"
        onChange={(e) => setSearchByName(e.target.value)}
        placeholder="Pesquisar por nome"
        className="h-10 px-2 rounded-md border border-gray-300 focus:outline-none"
      />

      <input
        type="text"
        onChange={(e) => setSearchByPhone(e.target.value)}
        placeholder="Pesquisar por telefone"
        className="h-10 px-2 rounded-md border border-gray-300 focus:outline-none"
      />
      <input
        type="text"
        onChange={(e) => setSearchByEmail(e.target.value)}
        placeholder="Pesquisar por e-mail"
        className="h-10 px-2 rounded-md border border-gray-300 focus:outline-none"
      />
      <button className="bg-gray-900 text-blue-100 font-bold py-2 px-4 rounded-md h-10">
        Pesquisar
      </button>
    </form>
  )
}
