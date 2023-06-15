import { useState, useEffect } from 'react'

export default function DataTable({ filters }) {

    const [databases, setDatabases] = useState([])

    let filtersString = JSON.stringify(filters)
    console.log(filtersString)

    useEffect(() => {
        fetch(`/api/data-table/?filtersString=${filtersString}`)
            .then((res) => res.json())
            .then((data) => {
                setDatabases(data)
            })
    }, [])
  
    return (
      <div>
        <h1>Databases</h1>
        <table>
          <thead>
            <tr>
              <th>Data Source</th>
              <th>Person of Contact</th>
              <th>Sensitivity</th>
            </tr>
          </thead>
          <tbody>
            {databases.map(({ data_source, poc, sensitivity }) => 
              <tr>
                <td>{data_source}</td>
                <td>{poc}</td>
                <td>{sensitivity}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    );
} 