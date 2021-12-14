import React from 'react'
import { Navigate } from 'react-router-dom'
import { useInventory } from '../Context/InventoryContext'
import styled from 'styled-components'
import PersonalChart from '../Components/charts/Chart1'
import CommonChart from '../Components/charts/Chart2'
import moment from 'moment'

const Dashboard = () => {
  const { user, showAlert, toggleAlert, stockItems, missingItems } =
    useInventory()
  const { ownItems, commonItems } = stockItems
  const { ownMissing, commonMissing } = missingItems

  let allItems = [...ownItems, ...commonItems, ...ownMissing, ...commonMissing]
  let updatedDates = new Set(allItems.map((item) => moment(item.updatedAt)))
  let lastUpdate = moment.max([...updatedDates])
  lastUpdate = lastUpdate.format('L')

  if (!user) {
    return <Navigate to='/' />
  }

  return (
    <Wrapper>
      <div className='upper'>
        <h3>Welcome {user}</h3>
        <h4>Last Update: {lastUpdate && lastUpdate} </h4>
        <div>
          Use the existing stock to see and save your in-stock items. Use the
          top right button to toggle between general use items as cleaning and
          hardware, and personal items. Use the to buy section to save and see
          items you need to re-stock.
        </div>
      </div>

      {showAlert ? (
        <div>
          <p className='alert-message'>
            Something went wrong with the operation, please try again or
            logut/login again
          </p>
          <button onClick={() => toggleAlert()}>Okay</button>
        </div>
      ) : (
        <p></p>
      )}
      <div className='first-chart'>
        <PersonalChart />
      </div>
      <div className='second-chart'>
        <CommonChart />
      </div>
    </Wrapper>
  )
}

export default Dashboard

const Wrapper = styled.section`
  padding: 2em;
  margin: 2em;
  gap: 0.5em;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .upper {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 0.3em;
    background-color: rgba(208, 208, 208, 0.3);
  }

  .alert-message {
    color: red;
    background-color: rgb(233, 229, 229);
    padding: 0.3em;
    border-radius: 5%;
  }

  .first-chart {
    grid-column: 1 / 2;
    width: 100%;
  }

  .second-chart {
    grid-column: 2 / 3;
    width: 100%;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 1em;
    margin: 0.5em;

    .upper {
      grid-column: 1 / 2;
    }

    .first-chart {
      grid-column: 1 / 2;
    }

    .second-chart {
      grid-column: 1 / 2;
    }
  }
`
