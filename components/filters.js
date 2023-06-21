import Select from "react-select"

export default function Filters({ setFilters }) {

    const handleFilter = (e) => {
        setFilters(prevState => ({
            filters: {
                ...prevState.filters,
                [e.target.name]: e.target.value
            }
        }))
    }

    const handleOffice = (e) => {
        setFilters(prevState => ({
            filters: {
                ...prevState.filters,
                "office": e.length? e.map((office) => office.value) : ["All"]
            }
        }))
    }

    const offices = [
        {value: "All", label: "All"},
        {value: "OIT", label: "OIT"},
        {value: "StuAff", label: "Student Affairs"},
        {value: "ASM", label: "ASM"},
        {value: "HR", label: "Human Resources"},
        {value: "OUR", label: "OUR"},
        {value: "SISS", label: "SISS"},
        {value: "FMD", label: "FMD"},
        {value: "PTS", label: "PTS"},
        {value: "OTC", label: "OTC"}
    ]

    return (
        <div id="filter">
            <h1 class = "pl-4 text-xl text-base/loose">Filters</h1>
            <div className = "flex flex-wrap items-center">
                {/* label for office dropdown */}
                <label class = "pl-4 text-base/loose mr-1" for="office">Office: </label>
                <Select name="office" options={offices} onChange={handleOffice} isMulti />
            </div>
            <div>
                {/* label for sensitivity dropdown */}
                <label class = "pl-4 text-base/loose" for="sensitivity">Sensitivity: </label>
                <select class = "border-solid border-2 border-slate-500 rounded-md shadow-lg border-solid" name="sensitivity" id="sensitivity" onChange={handleFilter}>
                    <option value="All">All</option>
                    <option value="Public" >Public </option>
                    <option value="Restricted">Restricted</option>
                    <option value="Sensitive">Sensitive</option>
                </select>
            </div>
            <div>
                {/* label for request_process dropdown */}
                <label class = "pl-4 text-base/loose" for="request_process">Request Process: </label>
                <select class = "border-solid border-2 border-slate-500 rounded-md shadow-lg border-solid" name="request_process" id="req_proc" onChange={handleFilter}>
                    <option value="All">All</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                </select>
            </div>
            <div>
                {/* label for request_form dropdown */}
                <label class = "pl-4 text-base/loose" for="request_form">Request Form: </label>
                <select class = "border-solid border-2 border-slate-500 rounded-md shadow-lg border-solid" name="request_form" id="req_form" onChange={handleFilter}>
                    <option value="All">All</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                </select>
            </div>
            <div>
                {/* label for request_form dropdown */}
                <label class = "pl-4 text-base/loose" for="frequency">Frequency: </label>
                <select class = "border-solid border-2 border-slate-500 rounded-md shadow-lg border-solid" name="frequency" id="frequency" onChange={handleFilter}>
                    <option value="All">All</option>
                    <option value="one-time">One-time</option>
                    <option value="ongoing">Ongoing</option>
                </select>
            </div>
        </div>
    )
}



