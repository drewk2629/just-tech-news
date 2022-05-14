const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class User extends Model {}

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
        // table column definitions
    {
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
    }
);

module.exports = User;