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

    function printArray(arrayString) {
      if ( arrayString == "" | arrayString == " " | arrayString == "{}" | arrayString == null){
        return "\n"
      }
      let toArray = arrayString.split(",")
      let string = ""
      for(let i = 0; i < toArray.length; i++){
        string += toArray[i] + "\n"
      }
      return <td>{string}</td>
    }
 
    return (
      <div>
        <h1>Who to Contact</h1>
        <table>
          <thead>
            <tr>
            <th>Data Source</th>
              <th>Platform</th>
              <th>Office</th>
             <th>Person of Contact</th>
              <th>Approving Authority</th>
              <th>Sensitivity</th>
             <th>Access Request Form?</th>
              <th>Access Request Process?</th>
              <th>Approvals Requred?</th>
              <th>How is Data Provided?</th>
              <th>How Often Provided?</th>
              <th>Notes</th> 
            </tr>
          </thead>
          <tbody>
            {databases.map(({data_source, platform,office,poc,app_auth, sensitivity,req_proc,req_form, app_req, provided, freeq, notes}) => 
            //  poc, app_auth, sensitivity,req_proc,req_form, app_req, provided, freeq, notes
             
              <tr>
                <td>{data_source}</td>
                {printArray(platform)}
                {printArray(office)}
                {printArray(poc)}
                {printArray(app_auth)}
                {printArray(sensitivity)}
                {req_form?<td>Yes</td>:<td>No</td>}
                {req_proc?<td>Yes</td>:<td>No</td>}
                {printArray(app_req)}
                {printArray(provided)}
                {printArray(freeq)}
                {printArray(notes)}

              </tr>)
            }
          </tbody>
        </table>
      </div>
    );
}
