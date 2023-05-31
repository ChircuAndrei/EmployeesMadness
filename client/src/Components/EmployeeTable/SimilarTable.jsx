import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./EquipmentTable.css";



const SimilarTable = ({ employees }) => {
    const [filterBy, setFilterBy] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [filtered, setFilteredEmployees] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const filteredButton = employees.filter(employee => {
            const position = employee.position
            const level = employee.level
            return position.includes(selectedEmployee.position) && level.includes(selectedEmployee.level)
        });
        setFilteredEmployees(filteredButton)
        console.log(selectedEmployee);
        console.log(clicked);

    }, [selectedEmployee, clicked]);
            
    const handleclick = (employee) => {
        setSelectedEmployee(employee);
        setClicked(true)

    } 

    const filteredEmployees = employees.filter(employee => {
        const position = employee.position.toLowerCase();
        const level = employee.level.toLowerCase();
        const name = employee.name.toLowerCase();
        return position.includes(filterBy) || level.includes(filterBy) || name.includes(filterBy.toLowerCase());
    });



    return (
        <div className="EquipmentTable">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Position</th>
                        <th>Favourite Color</th>
                        <th>Equipment</th>
                        <th><input
                            placeholder="Filter By Level/Position"
                            onChange={(e) => {
                                e.preventDefault();
                                setFilterBy(e.target.value)
                            }}
                        />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {clicked ? (filtered.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.level}</td>
                            <td>{employee.position}</td>
                            <td>{employee.favouriteColor.name}</td>
                            <td>{employee.equipment.name}</td>
                            <td>
                                <Link to={`/equipment/${employee._id}`}>
                                    <button type="button">Update</button>
                                </Link>
                            </td>
                            <td>
                                <button type="button" onClick={() => handleclick(employee)}  >Similar Employees</button>
                            </td>
                        </tr>
                    ))) : (filteredEmployees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.level}</td>
                            <td>{employee.position}</td>
                            <td>{employee.favouriteColor.name}</td>
                            <td>{employee.equipment.name}</td>
                            <td>
                                <Link to={`/equipment/${employee._id}`}>
                                    <button type="button">Update</button>
                                </Link>
                            </td>
                            <td>
                                <button type="button" onClick={() => handleclick(employee)}                     
                                >Similar Employees</button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    );

}


export default SimilarTable;