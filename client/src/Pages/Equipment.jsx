import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EmployeeTable/EquipmentTable";

const fetchEquipments = () => {
  return fetch("/api/equipment/").then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState({});

  const handleDelete = (id) => {
    deleteEquipment(id);
    setEquipments((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipments()
      .then((equipments) => {
        setLoading(false);
        setEquipments(equipments);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EquipmentTable equipments={equipments} onDelete={handleDelete} />;
};

export default EquipmentList;
