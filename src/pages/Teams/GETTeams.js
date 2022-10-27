import React, {useMemo, useState} from 'react'
import { useTable } from 'react-table'

import { TeamColumns } from '../../components/table-headers/team-columns'

const GETTeams = () => {

  const [name, setName] = useState('')
  const [data, setData] = useState([])


  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api-team/?team_name__icontains=${name}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
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

  console.log(data)

  const columns = useMemo(() => TeamColumns, [])

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
      <div className='team_finder'>
        <h3>Consult accounts by name</h3>
        <p>(Leave field empty to search for all users)</p>
        <input 
          onChange={e => setName(e.target.value)}
          placeholder='Enter name'
        />
        <button onClick={handleClick} className ='account_button'>Search account</button>
      </div>
      

      <table {...getTableProps()} id = 'teams-table'>
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

export default GETTeams