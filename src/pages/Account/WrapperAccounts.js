import React from 'react'
import DELETEAccount from './DELETEAccount'
import GETAccounts from './GETAccounts'
import POSTAccount from './POSTAccount'
import UPDATEAccount from './UPDATEAccount'

import Sidebar from '../../components/Sidebar'

import '../../styles/WrapperAccounts.css'

const WrapperAccounts = () => {
  return (
    <Sidebar>
      
      <GETAccounts/>
      <POSTAccount/>
      <UPDATEAccount/>
      <DELETEAccount/>
    </Sidebar>
  )
}

export default WrapperAccounts