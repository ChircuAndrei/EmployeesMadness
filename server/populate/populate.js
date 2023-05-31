/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const colors = require('./colors.json')
const names = require("./names.json");
const levels = require("./levels.json");
const amounts = require('./equipmentAmount.json');
const Eqpnames = require('./equipmentName.json');
const types = require('./equipmentType.json');
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");
const ColorsModel = require("../db/colors.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateColors = async () => {
  await ColorsModel.deleteMany({});
  const color = colors.map(() => ({
    name: pick(colors)
  }
  ));
  await ColorsModel.create(...color);
  console.log("Colors created");
};

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});
  const equipment = Eqpnames.map((name) => ({
    name,
    type: pick(types),
    amount: pick(amounts),
  }
  ));
  await EquipmentModel.create(...equipment);
  console.log("Equipment created");
};

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const equipments = await EquipmentModel.find();
  const colors = await ColorsModel.find();

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    present: false,
    favouriteColor: pick(colors),
    equipment: pick(equipments)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  await populateEquipment();
  await populateColors();
  await populateEmployees();
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
