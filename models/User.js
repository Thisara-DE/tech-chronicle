const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


//Create user model
class User extends Model {
    // setup an instance method to check the PW user entered and the PW in the DB
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//Define columns and restrictions of the table
//user (id, username, email, password)
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            // Setup "beforeCreate" lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // setup "beforeUpdate" lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData; 
            }
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;