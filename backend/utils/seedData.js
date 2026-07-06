const { Admin } = require('../models');

const seedAdmin = async () => {
    try {
        const defaultAdmin = {
            name: 'Administrator',
            email: 'admin@verz.in',
            password: 'Admin@123'
        };

        const existingAdmin = await Admin.findOne({ where: { email: defaultAdmin.email } });
        if (!existingAdmin) {
            await Admin.create(defaultAdmin);
            console.log('Default Admin created successfully.');
        } else {
            console.log('Default Admin already exists.');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

module.exports = seedAdmin;
