import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import SimilarTable from "../Components/EmployeeTable/SimilarTable";


const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};



const Similar = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);


  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);        
        setEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <SimilarTable employees={employees} />;
};

export default Similar;