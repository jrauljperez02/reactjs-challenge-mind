import React, {useContext} from 'react'

import GETTeams from './GETTeams'
import POSTTeam from './POSTTeam'
import UPDATETeam from './UPDATETeam'
import DELETETeam from './DELETETeam'

import Sidebar from '../../components/Sidebar'
import AuthContext from '../../context/AuthContext'

const WrapperTeams = () => {

  let {user} = useContext(AuthContext)

  return (
    <Sidebar>
      {user && (user.is_staff || user.is_superuser) ? 
      <React.Fragment>
        <GETTeams/>
        <POSTTeam/>
        <UPDATETeam/>
        <DELETETeam/>
      </React.Fragment>:  <h3>You are not allowed to interact with Teams section</h3>
    
      }
    </Sidebar>
  )
}

export default WrapperTeams