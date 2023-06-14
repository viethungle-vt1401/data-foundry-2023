import { useState } from 'react'

export default function Filters() {
    const [sensitivity, setSensitivity] = useState("All")

    const handleSensitivity = (e) => {
        setSensitivity(e.target.value)
    }

    return (
        <div>
            <h1>Filters</h1>
            <label for="sensitivity">Sensitivity: </label>
            <select name="sensitivity" id="sensitivity" onChange={handleSensitivity}>
                <option value="All">All</option>
                <option value="1">Public</option>
                <option value="2">Restricted</option>
                <option value="3">Sensitive</option>
            </select>
        </div>
    )
}