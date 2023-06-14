import { useState, useEffect } from 'react'

export default function PersonContact() {

    const [databases, setDatabases] = useState([])

    useEffect(() => {
        fetch('/api/source-poc')
            .then((res) => res.json())
            .then((data) => {
                setDatabases(data)
            })
    }, [])
    //   const personContactData = fetch('/api/source-poc/').then((res) => res.json())
    //   let personContactList = [];
    //   personContactData.then((databases) => {
    //     for (let i in databases) {
    //         console.log(databases[i].data_source)
    //         personContactList.push(
    //             <tr>
    //                 <td>{databases[i].data_source}</td>
    //                 <td>{databases[i].poc}</td>
    //             </tr>
    //         )
    //     }
    //   })
    //   return personContactList;
  
    return (
      <div>
        <h1>Who to Contact</h1>
        <table>
          <thead>
            <tr>
              <th>Data Source</th>
              <th>Person of Contact</th>
            </tr>
          </thead>
          <tbody>
            {databases.map(({ data_source, poc }) => 
              <tr>
                <td>{data_source}</td>
                <td>{poc}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    );
} 