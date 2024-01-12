const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    async checkPassword(userPassword) {
        // TODO: Complete the instance method
        try {
            return await bcrypt.compare(userPassword, this.password)

        } catch (err) {
            console.log(err);
            throw new Error('Password comparison failed');
        };
    };
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
        },
        jsearchKey: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;





