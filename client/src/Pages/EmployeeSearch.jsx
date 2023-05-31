import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const searchEmployees = (name) => {
    return fetch(`/employees/${name}`).then((res) => res.json());
};

export const EmployeeSearch = () => {
    const { search } = useParams();
    const [searchedEmp, setSearchedEmp] = useState(null)
    const [employeeLoading, setEmployeeLoading] = useState(true);
    // console.log(search)
    useEffect(() => {
        setEmployeeLoading(true);
        searchEmployees(search)
            .then((employees) => {
                console.log(employees)
                setSearchedEmp(employees);
                setEmployeeLoading(false);
            });
        
    }, [search]);
    console.log(searchedEmp)


    
    if (employeeLoading) {
        return <Loading />;
    }
    return <EmployeeTable employees={searchedEmp}/>;
}