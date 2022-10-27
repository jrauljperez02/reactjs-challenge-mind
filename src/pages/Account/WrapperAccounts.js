import React from 'react'
import DELETEAccount from './DELETEAccount'
import GETAccounts from './GETAccounts'
import POSTAccount from './POSTAccount'
import UPDATEAccount from './UPDATEAccount'

import '../../styles/WrapperAccounts.css'

const WrapperAccounts = () => {
  return (
    <div className='account_wrapper'>
      
      <GETAccounts/>
      <POSTAccount/>
      <UPDATEAccount/>
      <DELETEAccount/>
    </div>
  )
}

export default WrapperAccounts