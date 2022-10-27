import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'

import DELETEAccount from './DELETEAccount'
import GETAccounts from './GETAccounts'
import POSTAccount from './POSTAccount'
import UPDATEAccount from './UPDATEAccount'

import Sidebar from '../../components/Sidebar'

import '../../styles/WrapperAccounts.css'

const WrapperAccounts = () => {

  let {user} = useContext(AuthContext)

  return (
    <Sidebar>
      {user && (user.is_staff || user.is_superuser) ? 
        <React.Fragment>
          <GETAccounts/>
          <POSTAccount/>
          <UPDATEAccount/>
          <DELETEAccount/>
        </React.Fragment>:  <h3>You are not allowed to interact with Accounts section</h3>
      }
    </Sidebar>
  )
}

export default WrapperAccounts