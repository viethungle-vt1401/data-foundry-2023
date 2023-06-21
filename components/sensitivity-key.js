
export default function SensitivityKey() {

    let lock = "/images/lock.png"
    let open_lock = "/images/open_lock.png"
    let book = "/images/book.png"
    let transparent = "/images/transparent.png"


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

    return(
      <div>

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

      </div>
      )

}