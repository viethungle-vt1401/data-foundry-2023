export default function Filters({ setFilters }) {

    const handleSensitivity = (e) => {
        setFilters(prevState => ({
            filters: {
                ...prevState.filters,
                "sensitivity": e.target.value
            }
        }))
    }

    return (
        <div id="filter">
            <h1>Filters</h1>
            <label for="sensitivity">Sensitivity: </label>
            <select name="sensitivity" id="sensitivity" onChange={handleSensitivity}>
                <option value="">All</option>
                <option value="1">Public</option>
                <option value="2">Restricted</option>
                <option value="3">Sensitive</option>
            </select>
        </div>
    )
}
