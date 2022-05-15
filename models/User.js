const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create User model
class User extends Model {
    // set up method to run on instance data (per user) to check the password
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

// define table, columns, config
User.init(
    {
        // define an id column
        id: {
            // use sequelize datatypes object to provide data
            type: DataTypes.INTEGER,
            // this is = `NOT NULL` in SQL
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // enable auto increment
            autoIncrement: true
        },
        // define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // no duplicates allowed
            unique: true,
            // if allownull is set to false we can run the data thru validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // password must be at least 4 characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" funcionality
            // hash password
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
            // set up beforeUpdate lifecycle ***
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },  
            
    
        // table column definitions
    
        // table config options

        // pass sequelize connection
        sequelize,

        // don't populate create createdAt/updatedAt timestamps
        timestamps: false,

        // don't pluralize name of database table
        freezeTableName: true,

        // use underscores instead of camelCase
        underscored: true,

        // make model name stay lowercase in db
        modelName: 'user'     
    },
);

module.exports = User;