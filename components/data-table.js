import { Indie_Flower } from 'next/font/google'
import { useState, useEffect } from 'react'
import SensitivityKey from './sensitivity-key'

export default function DataTable({ filters }) {

    let lock = "/images/lock.png"
    let open_lock = "/images/open_lock.png"
    let book = "/images/book.png"
    let transparent = "/images/transparent.png"

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

    function printArray(arrayString) {
      if (arrayString == "" | arrayString == " " | arrayString == "{}" | arrayString == null) {
        return "\n"
      }
      let toArray = arrayString.split(",")
      let string = ""
      for (let i = 0; i < toArray.length; i++) {
        string += toArray[i] + "\n"
      }
      return <td>{string}</td>
    }

    function checkLock(arrayString){
      if (arrayString == "" | arrayString == " " | arrayString == "{}" | arrayString == null) {
        return "\n"
      }
      let toArray = arrayString.split(",")
      if (toArray.includes("Sensitive")){
        return lock;
      }
      else {
        return transparent;
      }
    }

    function checkUnlock(arrayString){
      if (arrayString == "" | arrayString == " " | arrayString == "{}" | arrayString == null) {
        return "\n"
      }
      let toArray = arrayString.split(",")
      if (toArray.includes("Restricted")){
        return open_lock;
      }
      else {
        return transparent;
      }
    }

    function checkPublic(arrayString){
      if (arrayString == "" | arrayString == " " | arrayString == "{}" | arrayString == null) {
        return "\n"
      }
      let toArray = arrayString.split(",")
      if (toArray.includes("Public")){
        return book;
      }
      else {
        return transparent;
      }
    }

    return (
      <div className="relative overflow-x-auto sm:rounded-lg m-10">

        <table className = "border-hidden border-spacing-px w-screen p-4">
          <thead className = "text-left text-gray-100/0 border-hidden grid-template-columns: 100px fr">
            <tr>
              <th>i</th>
              <th>metadata</th>
            </tr>
          </thead>

          <tbody>   
            {databases.map(({data_source, platform, office, poc, app_auth, sensitivity, 
                                req_proc, req_form, app_req, provided, freeq, notes, description, icon}) => 
              <tr className = "hover:bg-gray-200 rounded-l-lg">                
                
                <td className = "rounded-l-lg">
                  <img src = {icon} alt = "snoopy" height = "110" width = "110" className = "ml-10 rounded-lg"></img>
                </td>
                
                <td className = "rounded-r-lg text-left pl-10 pt-3 pb-3">
                  <div className = " pl-4 text-left">
                    <span className = "uppercase text-2xl">{data_source}</span>
                    <span className = "font-thin text-s ml-2 text-gray-600">{office.split(",").join(", ")}</span> 
                  </div>

                  <div>
                    <span className = "pl-4">Person of Contact: </span>
                    <span className = "font-thin">{poc.split(",").join(", ")}</span>
                  </div>

                  <div className = "pl-4 ">
                    <span className = "font-thin text-s">{description}</span>
                  </div>
          
                  <div className = "flex items-left mt-4 mb-2">
                    <img src = {checkLock(sensitivity)} alt = "Sensitive" width = "30" height = "30" className = "pl-3 mr-5"></img>
                    <img src = {checkUnlock(sensitivity)} alt = "Restricted" width = "30" height = "30" className = "pl-3 ml-5 mr-5"></img>
                    <img src = {checkPublic(sensitivity)} alt = "Public" width = "30" height = "30" className = "pl-3 ml-3 mr-7"></img>
                  </div> 
              
                </td>
              </tr>)} 

            </tbody>

        </table>  

        <table className="table-auto w-full text-gray-500 dark:text-black border-seperate border-spacing-2">
          <thead className="text-xs text-duke-naby-blue uppercase bg-gray-200">
            <tr className = "text-duke-navy-blue">
              <th>Data Source</th>
              <th>Platform</th>
              <th>Office</th>
              <th>Person of Contact</th>
              <th>Approving Authority</th>
              <th>Sensitivity</th>
              <th>Access Request Form?</th>
              <th>Access Request Process?</th>
              <th>Approvals Required?</th>
              <th>How is Data Provided?</th>
              <th>How Often Provided?</th>
              <th>Notes</th> 
            </tr>
          </thead>
          <tbody className = "text-center">
            {databases.map(({ data_source, platform, office, poc, app_auth, sensitivity, 
                            req_proc, req_form, app_req, provided, freeq, notes }) => 
              <tr className="bg-white border-b hover:bg-gray-200 font-thin text-s">
                <td className = "font-normal">{data_source}</td>
                <td className = "text-center">{printArray(platform)}</td>
                {printArray(office)}
                {printArray(poc)}
                {printArray(app_auth)}
                <td className = "mx-auto">
                  <div className = "mx-auto">
                    <img className = "p-1" src = {checkLock(sensitivity)} alt = "Sensitive" width = "24" height = "24"></img>
                    <img className = "p-1" src = {checkUnlock(sensitivity)} alt = "Restricted" width = "24" height = "24"></img>
                    <img className = "p-1" src = {checkPublic(sensitivity)} alt = "Public" width = "24" height = "24"></img>
                  </div>
                </td>
                {req_form?<td>Yes</td>:<td>No</td>}
                {req_proc?<td>Yes</td>:<td>No</td>}
                {printArray(app_req)}
                {printArray(provided)}
                {printArray(freeq)}
                {printArray(notes)}
              </tr>)}
          </tbody>
        </table>
      </div>
    );
} 