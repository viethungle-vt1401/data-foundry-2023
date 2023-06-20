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
                <h1>Filters</h1>
                <label for="sensitivity">Sensitivity: </label>
                <select name="sensitivity" id="sensitivity" onChange={handleSensitivity}>
                    <option value="Public">Public</option>
                    <option value="Restricted">Restricted</option>
                    <option value="Sensitive">Sensitive</option>
                </select>
            </div>
            <div>
                <label for="request_process">Request Process: </label>
                <select name="request_process" id="req_proc" onChange={handleReqProccess}>
                    <option value="True">True</option>
                    <option value="False">False</option>
                </select>
            </div>
        </div>
    )
}



