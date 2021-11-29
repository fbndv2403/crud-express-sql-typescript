import { DataTypes } from "sequelize";
import db from "../db/connection";

const Usuario = db.define("Usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
  },
});

export default Usuario;
