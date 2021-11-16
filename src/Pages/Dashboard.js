import React from "react"
import { Navigate } from "react-router-dom"
import { useInventory } from "../Context/InventoryContext"
import styled from "styled-components"

const Wrapper = styled.section`
  padding: 2em;
  border: 2px solid rgb(85, 127, 169);
  border-radius: 5%;
  background-color: rgba(83, 83, 110, 0.7);
  color: white;
  box-shadow: 0.3em 0.3em 1em black, -0.3em -0.3em 1em black;
  width: 30%;
  margin: 2em;
  height: 50vh;

  .alert-message {
    color: red;
    background-color: rgb(233, 229, 229);
    padding: 0.3em;
    border-radius: 5%;
  }
`

const Dashboard = () => {
  const { user, showAlert, toggleAlert } = useInventory()

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <Wrapper>
      <h3>Welcome {user}</h3>
      <div>
        Use the existing stock to see and save your in-stock items. Use the top
        right button to toggle between general use items as cleaning and
        hardware, and personal items. Use the to buy section to save and see
        items you need to re-stock.
      </div>
      {showAlert ? (
        <div>
          <p className="alert-message">
            Something went wrong with the operation, please try again or
            logut/login again
          </p>
          <button onClick={() => toggleAlert()}>Okay</button>
        </div>
      ) : (
        <p></p>
      )}
    </Wrapper>
  )
}

export default Dashboard
