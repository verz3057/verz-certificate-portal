const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
    roll_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    father_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    college_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    certificate_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Verified'
    }
}, {
    tableName: 'students',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Student;
