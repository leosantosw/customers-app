'use client'
import { useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { CustomerTable } from './customer-table'
import { handleCalculateNearbyRouter } from '../app/calculate-nearby-router'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useCustomers } from '../contexts/customer-context'

export function CalculateRouterModal() {
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { handleSetCustomers, customers } = useCustomers()

  const handleOpenModal = () => {
    setOpenModal(true)
    calculateNearbyRouter()
  }

  const calculateNearbyRouter = async () => {
    setIsLoading(true)

    const { customers, status } = await handleCalculateNearbyRouter()

    setIsLoading(false)

    if (status !== 200) {
      toast.warning('Ops, ocorreu um erro ao calcular a rota.', {
        position: toast.POSITION.TOP_RIGHT,
      })
    }

    handleSetCustomers(customers || [])
  }

  return (
    <>
      <Button
        className="bg-gray-900 text-blue-100 font-bold py-2 px-4 rounded-md h-10"
        onClick={handleOpenModal}
      >
        Calcular menor rota
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        {!isLoading && (
          <Modal.Header
            spellCheck={false}
            className="bg-gray-900 px-10 text-white text-lg"
          >
            Rota calculada
          </Modal.Header>
        )}
        <Modal.Body className="bg-gray-900 px-8 py-5">
          {isLoading ? (
            <div className="flex justify-center items-center flex-col space-y-5">
              <p className="text-white text-lg">Calculando menor rota...</p>
              <ClipLoader
                color="#fff"
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="mr-2 mt-[2px]"
              />
            </div>
          ) : (
            <CustomerTable customersData={customers} />
          )}
        </Modal.Body>
        {!isLoading && (
          <Modal.Footer className="bg-gray-900 px-10 justify-end">
            <Button
              className="text-white bg-gray-1000 hover:bg-gray-800 border-0 py-1 px-6 focus:outline-none rounded-md"
              onClick={() => setOpenModal(false)}
            >
              Fechar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}
