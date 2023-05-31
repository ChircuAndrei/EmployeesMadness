import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";


const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const {sortBy, sortOrder} = useParams();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        if (sortBy && sortOrder) {
          employees = employees.sort((a, b) => {
            const toSortA = a[sortBy].toUpperCase();
            const toSortB = b[sortBy].toUpperCase();
            if (toSortA < toSortB) {
              return sortOrder === "asc" ? -1 : 1;
            }
            if (toSortA > toSortB) {
              return sortOrder === "asc" ? 1 : -1;
            }
            return 0;
          });
        }
        
        setEmployees(employees);
      })
  }, [sortBy, sortOrder]);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={employees} onDelete={handleDelete} />;
};

export default EmployeeList;
