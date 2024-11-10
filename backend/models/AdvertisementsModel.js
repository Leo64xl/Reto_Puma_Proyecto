import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UsersModel.js";

const {DataTypes} = Sequelize;

const Advertisements = db.define('advertisement',{
   
  uuid: {
     type: DataTypes.STRING,
     defaultValue: DataTypes.UUIDV4,
     allowNull: false,
     validate: {
         notEmpty: true,
       }
   },
   
   name: {
     type: DataTypes.STRING,     
     allowNull: false,
     validate: {
         notEmpty: true,
         len: [3, 100]
       }
   },   

   image: DataTypes.STRING,     
   
   url: DataTypes.STRING,

   description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,        
        }
    },
      
   userId: {
     type: DataTypes.INTEGER,     
     allowNull: false,
     validate: {
         notEmpty: true,        
       }
   },   
},
  {
    freezeTableName: true
  },
);

Users.hasMany(Advertisements);
Advertisements.belongsTo(Users, {foreignKey: 'userId'});

export default Advertisements;