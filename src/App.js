import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Layout"
import EditForm from "./Routes/EditForm"
import ExistingStock from "./Routes/Existing_Stock"
import Home from "./Routes/Login"
import BuyStock from "./Routes/To_Buy_Stock"

function App() {
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="stock" element={<ExistingStock />}>
          <Route path="edit/:id" element={<EditForm />} />
        </Route>
        <Route path="buy" element={<BuyStock />} />
      </Routes>
    </Navbar>
  )
}

export default App
