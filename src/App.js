import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Layout"
import Dashboard from "./Pages/Dashboard"
import EditForm from "./Pages/EditForm"
import ExistingStock from "./Pages/ExistingStock"
import Login from "./Pages/Login"
import BuyStock from "./Pages/To_Buy_Stock"

function App() {
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="stock" element={<ExistingStock />}>
          <Route path="edit/:id" element={<EditForm />} />
        </Route>

        <Route path="buy" element={<BuyStock />}>
          <Route path="edit/:id" element={<EditForm />} />
        </Route>
      </Routes>
    </Navbar>
  )
}

export default App
