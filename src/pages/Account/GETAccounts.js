import React, {useMemo, useState,useContext} from 'react'
import AuthContext from '../../context/AuthContext';

import { useTable } from 'react-table'
import { AccountColums } from '../../components/table-headers/account-colums'

const GETAccounts = () => {

  const [name, setName] = useState('')
  const [data, setData] = useState([])
  let {authTokens} = useContext(AuthContext)



  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api-account/accounts/?account_name__icontains=${name}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization' : `Bearer ${authTokens.access}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.log(err.message);
    }
  };


  const columns = useMemo(() => AccountColums, [])

  const tableInstance = useTable({
    columns,
    data
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow

  } = tableInstance


  return (
    <div className='user_http_method'>
      <div className='account_finder'>
        <h3>Consult accounts by name</h3>
        <p>(Leave field empty to search for all users)</p>
        <input 
          onChange={e => setName(e.target.value)}
          placeholder='Enter name'
        />
        <button onClick={handleClick} className ='account_button'>Search account</button>
      </div>
      

      <table {...getTableProps()} id = 'accounts-table'>
        <thead>
          {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((colum) => (
                   <th {...colum.getHeaderProps()}>{colum.render('Header')}</th>
                ))}
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return(
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {data.length === 0 && <p>Nothing was found</p>}
    </div>
  )
}

export default GETAccounts