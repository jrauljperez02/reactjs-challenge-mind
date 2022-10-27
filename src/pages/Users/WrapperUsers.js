import React from 'react'
import '../../styles/WrapperUsers.css'
import DELETEUser from './DELETEUser'

import GETUser from './GETUser'
import POSTUser from './POSTUser'
import UPDATEUser from './UPDATEUser'

const WrapperUsers = () => {
  return (
    <div>
      <GETUser/>
      <POSTUser/>
      <UPDATEUser/>
      <DELETEUser/>
    </div>
  )
}

export default WrapperUsers