import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import CustomerProvider from '../contexts/customer-context'

export const metadata: Metadata = {
  title: 'Customers',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToastContainer />
        <CustomerProvider>{children}</CustomerProvider>
      </body>
    </html>
  )
}
