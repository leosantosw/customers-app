'use client'

import { toast } from 'react-toastify'
import { FormEvent, useCallback, useState } from 'react'
import { handleCreateCustomer } from './create-customer'
import { GoBackButton } from '@/src/components/goback-button'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'

const notifications = {
  fillAllFields: () =>
    toast.error('Preencha todos os campos!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
  successOnCreateCustomer: () =>
    toast.success('Cliente cadastrado com sucesso!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
  errorOnCreateCustomer: () =>
    toast.error('Ocorreu um erro ao criar cliente!', {
      position: toast.POSITION.TOP_RIGHT,
    }),
}

export default function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const name = String(formData.get('name'))
    const email = String(formData.get('email'))
    const telephone = String(formData.get('telefone'))
    const coordinateX = String(formData.get('coordinate_x'))
    const coordinateY = String(formData.get('coordinate_y'))

    if (!name || !email || !telephone || !coordinateX || !coordinateY) {
      return notifications.fillAllFields()
    }

    setIsLoading(true)

    const result = await handleCreateCustomer({
      name,
      email,
      telephone,
      coordinateX,
      coordinateY,
    })

    setIsLoading(false)

    if (!result) {
      return notifications.errorOnCreateCustomer()
    }

    notifications.successOnCreateCustomer()
    router.push('/')
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-primary mt-8 sm:mt-4">
      <GoBackButton />
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
        Cadastrar novo cliente
      </h2>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-4 gap-x-4 max-w-4xl sm:grid-cols-1 px-4 w-full lg:w-1/2"
      >
        <label className="block text-sm font-bold text-gray-900">
          Nome
          <input
            id="name"
            name="name"
            type="text"
            className="appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
        </label>

        <label className="block text-sm font-bold text-gray-700">
          E-mail
          <input
            id="email"
            name="email"
            className="sm:h-[46px] appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
        </label>

        <label className="block text-sm font-bold text-gray-700">
          Telefone
          <input
            id="telefone"
            name="telefone"
            className="sm:h-[46px] appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
        </label>

        <label className="block text-sm font-bold text-gray-700">
          Coordenada X
          <input
            id="coordinate_x"
            name="coordinate_x"
            className="sm:h-[46px] appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
        </label>

        <label className="block text-sm font-bold text-gray-700">
          Coordenada Y
          <input
            id="coordinate_y"
            name="coordinate_y"
            className="sm:h-[46px] appearance-none rounded-md relative block w-full px-3 py-3 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          />
        </label>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-gray-900 cursor-not-allowed' : 'cursor-pointer'
            } w-1/2
          group relative flex justify-center py-3 px-4 border border-transparent font-bold text-lg rounded-md text-blue-50 bg-gray-900 hover:bg-gray-800`}
          >
            <ClipLoader
              color="#fff"
              loading={isLoading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="mr-2 mt-[2px]"
            />
            {!isLoading && 'CADASTRAR'}
          </button>
        </div>
      </form>
    </div>
  )
}
