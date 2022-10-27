import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

import '../../styles/WrapperUsers.css'
import DELETEUser from './DELETEUser'

import GETUser from './GETUser'
import POSTUser from './POSTUser'
import UPDATEUser from './UPDATEUser'

import Sidebar from '../../components/Sidebar'

const WrapperUsers = () => {

  let {user} = useContext(AuthContext)
  
  return (
    <Sidebar>
      {user && (user.is_staff || user.is_superuser) ?  
        <React.Fragment>
          <GETUser/>
          <POSTUser/>
          <UPDATEUser/>
          <DELETEUser/>
        </React.Fragment>: <h3>You are not allowed to interact with Users section</h3>
      }
      
    </Sidebar>
  )
}

export default WrapperUsers