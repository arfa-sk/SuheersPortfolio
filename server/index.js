require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: [
        process.env.CLIENT_URL,
        process.env.ADMIN_URL,
        'https://suheer.com',
        'https://www.suheer.com',
        'https://admin.suheer.com',
        'https://admin-two-gold-88.vercel.app',
    ].filter(Boolean),
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', require('./routes/public'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
