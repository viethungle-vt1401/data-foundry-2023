export default function Filters({ setFilters }) {

    const handleSensitivity = (e) => {
        setFilters(prevState => ({
            filters: {
                ...prevState.filters,
                "sensitivity": e.target.value
            }
        }))
    }

    const handleReqProccess = (e) => {
        setFilters(prevState => ({
            filters: {
                ...prevState.filters,
                "request_process": e.target.value
            }
        }))
    }

    return (
        <div id="filter">
            <div>
                <h1 class = "pl-4 text-xl text-base/loose">Filters</h1>

                {/* label for sensitivity dropdown */}
                <label class = "pl-4 text-base/loose" for="sensitivity">Sensitivity: </label>
                <select class = "border-solid border-2 border-slate-500 rounded-md shadow-lg border-solid" name="sensitivity" id="sensitivity" onChange={handleSensitivity}>
                    <option value="Public" >Public </option>
                    <option value="Restricted">Restricted</option>
                    <option value="Sensitive">Sensitive</option>
                </select>
            </div>


                {/* label for req process dropdown */}
            <div>
                <label class = "pl-4 text-base/loose" for="request_process"> Request Process: </label>
                <select class = "border-solid border-2 border-slate-500 rounded-md shadow-lg border-solid" name="request_process" id="req_proc" onChange={handleReqProccess}>
                    <option value="True">True</option>
                    <option value="False">False</option>
                </select>
            </div>
        </div>
    )
}



