import React from 'react'
import '../../styles/WrapperUsers.css'
import DELETEUser from './DELETEUser'

import GETUser from './GETUser'
import POSTUser from './POSTUser'
import UPDATEUser from './UPDATEUser'

import Sidebar from '../../components/Sidebar'

const WrapperUsers = () => {
  return (
    <Sidebar>
      <GETUser/>
      <POSTUser/>
      <UPDATEUser/>
      <DELETEUser/>
    </Sidebar>
  )
}

export default WrapperUsers