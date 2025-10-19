import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router'
import BankingLayout from './components/BankingLayout'
import PublicLayout from './components/public/PublicLayout'
import PublicHome from './components/public/PublicHome'
import Login from './components/public/Login'
import Register from './components/public/Register'
import CustomerLayout from './components/customer/CustomerLayout'
import CustomerHome from './components/customer/CustomerHome'
import CustomerTransfer from './components/customer/CustomerTransfer'
import CustomerHistory from './components/customer/CustomerHistory'
import NotFound from './components/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<BankingLayout />}>

            <Route element={<PublicLayout />}>
              <Route index element={<PublicHome />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="customer" element={<CustomerLayout />}>
              <Route index element={<CustomerHome />} />
              <Route path="transfer" element={<CustomerTransfer />} />
              <Route path="history" element={<CustomerHistory />} />
            </Route>

             <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
