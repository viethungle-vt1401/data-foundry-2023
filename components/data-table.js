import { useState, useEffect } from 'react'

export default function DataTable({ filters }) {

    const [databases, setDatabases] = useState([])

    useEffect(() => {
        console.log(filters.filters)
        fetch('/api/data-table', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters.filters)
        })
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
              <th>Request Process</th>
            </tr>
          </thead>
          <tbody>
            {databases.map(({ data_source, poc, sensitivity, req_proc }) => 
              <tr>
                <td>{data_source}</td>
                <td>{poc}</td>
                <td>{sensitivity}</td>
                <td>{req_proc}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    );
} 