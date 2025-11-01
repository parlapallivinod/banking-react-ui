import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router'
import BankingLayout from './components/BankingLayout'
import PublicLayout from './components/public/PublicLayout'
import PublicHome from './components/public/PublicHome'
import Login from './components/public/Login'
import Register from './components/public/Register'
import CustomerLayout from './components/customer/CustomerLayout'
import AccountDetails from './components/customer/AccountDetails'
import NewTransaction from './components/customer/NewTransaction'
import TransactionHistory from './components/customer/TransactionHistory'
import UpdatePassword from './components/customer/UpdatePassword'
import DeleteAccount from './components/customer/DeleteAccount'
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
              <Route index element={<AccountDetails />} />
              <Route path="updatePassword" element={<UpdatePassword />} />
              <Route path="deleteAccount" element={<DeleteAccount />} />
              <Route path="newTransaction" element={<NewTransaction />} />
              <Route path="transactionHistory" element={<TransactionHistory />} />
            </Route>

             <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
