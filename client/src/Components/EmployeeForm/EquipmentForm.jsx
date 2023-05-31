import { useEffect, useState } from "react";

const EquipmentForm = ({ onSave, disabled, equipment, onCancel }) => {
    const [equipments, setEquipments] = useState([]);
    async function getEquipments() {
      const response = await fetch('/api/equipment/');
      const data = await response.json();
      setEquipments(data);
    }
    useEffect(() => {
        getEquipments();
      }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const equipment = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    return onSave(equipment);
  };

  return (
    <form className="EquipmentForm" onSubmit={onSubmit}>
      {equipment && (
        <input type="hidden" name="_id" defaultValue={equipment._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <select defaultValue={equipment ? equipment.name : null}
          name="name"
          id="name">
            {equipments.map(equipment => <option key={equipment._id} value={equipment.name}>{equipment.name}</option>)}
          </select>
      </div>

      <div className="control">
        <label htmlFor="type">Type:</label>
        <select defaultValue={equipment ? equipment.type : null}
          name="type"
          id="type">
            {equipments.map(equipment => <option key={equipment._id} value={equipment.type}>{equipment.type}</option>)}
          </select>
      </div>

      <div className="control">
        <label htmlFor="amount">Amount:</label>
        <select defaultValue={equipment ? equipment.name : null}
          name="amount"
          id="amount">
            {equipments.map(equipment => <option key={equipment._id} value={equipment.amount}>{equipment.amount}</option>)}
          </select>
      </div>
      
      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {equipment ? "Update Equipment" : "Create Equipment"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
