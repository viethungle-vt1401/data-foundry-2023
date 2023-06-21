import { useState, useEffect } from 'react'

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

  <div class="relative overflow-x-auto sm:rounded-lg p-4">

  

    <h3 class = "flex justify-end font-normal underline underline-offset-4 ml-3 mr-10">Sensitivity Legend</h3>


    <div class = "flex items-center justify-end mt-4 mb-2">
      <img src = {lock} alt = "Sensitive" width = "30" height = "30" class = "pl-3 mr-5"></img>
      <img src = {open_lock} alt = "Restricted" width = "30" height = "30" class = "pl-3 ml-5 mr-5"></img>
      <img src = {book} alt = "Public" width = "30" height = "30" class = "pl-3 ml-3 mr-7"></img>

    </div>

    <div class = "flex items-center justify-end mb-2">
      <text class = "font-thin text-xs pr-4">Sensitive </text>
      <text class = "font-thin text-xs pr-4">Restricted</text>
      <text class = "font-thin text-xs mr-5">Public</text>

    </div>

{/* 
     <table class = "border-none">

    {databases.map(({data_source, platform, office, poc, app_auth, sensitivity, 
                             req_proc, req_form, app_req, provided, freeq, notes}) => 

            <tr class = "flex rounded-lg">

              <div>
                  <img src = "/images/snoopy.jpeg" alt = "snoopy" height = "100" width = "100" class = "m-2 rounded-lg"></img>
              </div>


              <div>
                  <text class = "uppercase text-2xl"> {data_source}</text>
                  <text class = "font-thin text-s justified-l">{office}</text>
                  
              </div>


              <div class = "flex items-center justify-end mt-4 mb-2">
                  <img src = {lock} alt = "Sensitive" width = "30" height = "30" class = "pl-3 mr-5"></img>
                 <img src = {open_lock} alt = "Restricted" width = "30" height = "30" class = "pl-3 ml-5 mr-5"></img>
                  <img src = {book} alt = "Public" width = "30" height = "30" class = "pl-3 ml-3 mr-7"></img>

               </div>
          
            </tr>

            



            )}
      

      
    </table>  */}


        <table class="table-auto w-full text-gray-500 dark:text-black border-seperate border-spacing-2">

        <thead class="text-xs text-duke-naby-blue uppercase bg-gray-200">
            <tr class = "text-duke-navy-blue">
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
          <tbody class = "text-center">
            {databases.map(({data_source, platform, office, poc, app_auth, sensitivity, 
                             req_proc, req_form, app_req, provided, freeq, notes}) => 
            <tr class="bg-white border-b hover:bg-gray-200 font-thin text-s">
            <td class = "font-normal">{data_source}</td>
          
            <td class = "text-center">{printArray(platform)}</td>
                {printArray(office)}
                {printArray(poc)}
                {printArray(app_auth)}
            <block class = "mx-auto">
            <td class = "mx-auto">
              <img class = "p-1" src = {checkLock(sensitivity)} alt = "Sensitive" width = "24" height = "24"></img>
              <img class = "p-1" src = {checkUnlock(sensitivity)} alt = "Restricted" width = "24" height = "24"></img>
             <img class = "p-1" src = {checkPublic(sensitivity)} alt = "Public" width = "24" height = "24"></img>

            </td>
            </block>
                
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