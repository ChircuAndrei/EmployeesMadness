import { Link } from "react-router-dom";
import { useState } from "react";
import "./EmployeeTable.css";
import { useNavigate, useParams } from "react-router-dom";


const EmployeeTable = ({ employees, onDelete }) => {
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(true)

  const startIndex = (currentPage - 1) * 10;
  const endIndex = currentPage * 10;


  const updateEmployee = (employee) => {
    return fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json());
  };
  const filteredEmployees = employees.filter(employee => {
    const position = employee.position.toLowerCase();
    const level = employee.level.toLowerCase();
    return position.includes(filterBy) || level.includes(filterBy);
  });

  const employeesToDisplay = filteredEmployees.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th><button onClick={() =>
              {
                if (sort) {
                  navigate("/name/asc")
                  setSort(false);
                } else {
                  navigate("/name/desc")
                  setSort(true)
                }
                }} type="button">Name</button></th>
            <th>Level</th>
            <th>Position</th>
            <th>Favourite Color</th>
            <th>Equipment</th>
            <th>Attendance</th>
            <th><input
              placeholder="Filter By Level/Position"
              onChange={(e) => {
                e.preventDefault();
                setFilterBy(e.target.value)
              }}
            />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employeesToDisplay.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{employee.favouriteColor.name}</td>
              <td>{employee.equipment.name}</td>
              <td> <input
                type="checkbox"
                onClick={() => {
                  employee.present = !employee.present
                  updateEmployee(employee);
                }}
              /></td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= employees.length}
        >
          Next
        </button>
      </div>
    </div>
  );

}

export default EmployeeTable;
