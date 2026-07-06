const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const sequelize = require('./config/database');
const seedAdmin = require('./utils/seedData');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure database exists before connecting Sequelize
async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });
        
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'verz_certificate'}\`;`);
        await connection.end();
        console.log('Database checked/created successfully.');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        throw error;
    }
}

// Routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const verifyRoutes = require('./routes/verifyRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/verify', verifyRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Verz API is running' });
});

// Start Server
const PORT = process.env.PORT || 5000;

initializeDatabase()
    .then(() => {
        // Import models to ensure they are registered
        require('./models');
        
        // Sync database and start server
        sequelize.sync({ alter: true })
            .then(async () => {
                console.log('Database connected and synced');
                await seedAdmin(); // Seed default admin
                app.listen(PORT, () => {
                    console.log(`Server running on port ${PORT}`);
                });
            })
            .catch(err => {
                console.error('Failed to sync database:', err);
            });
    })
    .catch(err => {
        console.error('Startup failed due to database initialization error.');
        process.exit(1);
    });
