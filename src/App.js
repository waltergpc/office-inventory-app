import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Layout'
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import EditForm from './Pages/EditForm'
import ExistingStock from './Pages/ExistingStock'
import Home from './Pages/Home'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import BuyStock from './Pages/To_Buy_Stock'

function App() {
  return (
    <Navbar>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />

        <Route path='dashboard' element={<Dashboard />} />

        <Route path='stock' element={<ExistingStock />}>
          <Route path='edit/:id' element={<EditForm />} />
        </Route>

        <Route path='buy' element={<BuyStock />}>
          <Route path='edit/:id' element={<EditForm />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Navbar>
  )
}

export default App
