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
                <option value="Public">Public</option>
                <option value="Restricted">Restricted</option>
                <option value="Sensitive">Sensitive</option>
            </select>
        </div>
    )
}
