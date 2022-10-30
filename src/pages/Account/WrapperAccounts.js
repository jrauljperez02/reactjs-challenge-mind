import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'

import Sidebar from '../../components/Sidebar'
import Account from './Account'

const WrapperAccounts = () => {

  let {user} = useContext(AuthContext)

  return (
    <Sidebar>
      {user && (user.is_staff || user.is_superuser) ? 
        <React.Fragment>  
          <Account/>

        </React.Fragment>:  <h3>You are not allowed to interact with Accounts section</h3>
      }
    </Sidebar>
  )
}

export default WrapperAccounts