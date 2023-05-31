import { useEffect, useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {

  const [colors, setColors] = useState([]);
  const [equipments, setEquipments] = useState([]);
  async function getColors() {
    const response = await fetch('/api/colors/');
    const data = await response.json();
    setColors(data);
  }
  async function getEquipment() {
    const response = await fetch('/api/equipment/');
    const data = await response.json();
    setEquipments(data);
  }
  useEffect(() => {
    getEquipment();
    getColors();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>
      <div className="control">
        <label htmlFor="favouriteColor">Favourite Color</label>
      <select defaultValue={employee ? employee.favouriteColor : null}
          name="favouriteColor"
          id="favouriteColor">
            {colors.map(color => <option key={color._id} value={color._id}>{color.name}</option>)}
          </select>
      </div>
      <div className="control">
        <label htmlFor="equipment">Equipment</label>
      <select defaultValue={employee ? employee.equipment : null}
          name="equipment"
          id="equipment">
            {equipments.map(equipment => <option key={equipment._id} value={equipment._id}>{equipment.name}</option>)}
          </select>
      </div>
      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
