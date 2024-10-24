import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UsersModel.js";

const {DataTypes} = Sequelize;

const Forms = db.define('form',{

    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },

    nameForm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3,100]
        }
    },
    
    nameUser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3,100]
        }
    },

    nameUser2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3,100]
        }
    },
    
    lastnameone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },

    lastnametwo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },  

    birthday: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,           
        }
    },

    category1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,        
        }
    },

    typekit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,        
        }
    },

    talla: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,        
        }
    },

    team: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,        
        }
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,        
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,        
        }
    },

    origin: {
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

Users.hasMany(Forms);
Forms.belongsTo(Users, {foreignKey: 'userId'});

export default Forms;